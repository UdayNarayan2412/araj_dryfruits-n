import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Order, OrderStatus } from '../types';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Package, Truck, Clock, CheckCircle, AlertCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';

const OrderStatusIcon = ({ status }: { status: OrderStatus }) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case 'confirmed':
      return <CheckCircle className="h-5 w-5 text-blue-500" />;
    case 'processing':
      return <Package className="h-5 w-5 text-purple-500" />;
    case 'shipped':
      return <Truck className="h-5 w-5 text-green-500" />;
    case 'delivered':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'cancelled':
      return <XCircle className="h-5 w-5 text-red-500" />;
    default:
      return <AlertCircle className="h-5 w-5 text-gray-500" />;
  }
};

const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-purple-100 text-purple-800';
      case 'shipped':
        return 'bg-green-100 text-green-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}>
      <OrderStatusIcon status={status} />
      <span className="ml-1 capitalize">{status}</span>
    </span>
  );
};

const OrdersPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) return;

      try {
        const ordersRef = collection(db, 'orders');
        // Query without orderBy to avoid composite index requirements
        const q = query(
          ordersRef,
          where('userId', '==', currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          // Handle potential legacy data structure
          let createdAt = data.createdAt;
          
          // Handle Firestore Timestamp for createdAt
          if (createdAt && typeof createdAt.toDate === 'function') {
            createdAt = createdAt.toDate().toISOString();
          } else if (createdAt instanceof Date) {
            createdAt = createdAt.toISOString();
          }

          // If createdAt is missing but orderDate exists (legacy format)
          if (!createdAt && data.orderDate) {
            // Check if it's a Firestore Timestamp (has toDate method)
            if (data.orderDate.toDate) {
              createdAt = data.orderDate.toDate().toISOString();
            } else if (data.orderDate instanceof Date) {
              createdAt = data.orderDate.toISOString();
            } else {
              createdAt = new Date().toISOString(); // Fallback
            }
          }

          return {
            id: doc.id,
            ...data,
            createdAt: createdAt || new Date().toISOString()
          };
        }) as Order[];

        // Sort client-side
        ordersData.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setOrders(ordersData);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(order => order.status === filterStatus);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl text-gray-600">Please sign in to view your orders</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-maroon-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-8 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900">My Orders</h1>
            <p className="mt-1 text-sm text-gray-500">
              View and track your orders
            </p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="px-6 py-4 border-b border-gray-200">
            <label htmlFor="status-filter" className="text-sm font-medium text-gray-700">
              Filter by status:
            </label>
            <select
              id="status-filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as OrderStatus | 'all')}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-maroon-500 focus:border-maroon-500 sm:text-sm rounded-md"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredOrders.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No orders found
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div key={order.id} className="p-6">
                  <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleOrderExpansion(order.id)}>
                    <div className="flex items-center space-x-4">
                      <OrderStatusIcon status={order.status} />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Order #{order.id.slice(-8).toUpperCase()}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <OrderStatusBadge status={order.status} />
                      <p className="text-sm font-medium text-gray-900">
                        ₹{order.totalAmount.toFixed(2)}
                      </p>
                      {expandedOrder === order.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {expandedOrder === order.id && (
                    <div className="mt-4 space-y-4">
                      {/* Order Items */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Order Items</h4>
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                              <span className="text-gray-600">
                                {item.name} ({item.weight}) × {item.quantity}
                              </span>
                              <span className="text-gray-900 font-medium">
                                ₹{(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping Address */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Shipping Address</h4>
                        <div className="text-sm text-gray-600">
                          <p>{order.shippingAddress.fullName}</p>
                          <p>{order.shippingAddress.address}</p>
                          <p>
                            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pinCode}
                          </p>
                          <p>Phone: {order.shippingAddress.phone}</p>
                        </div>
                      </div>

                      {/* Order Timeline */}
                      {order.trackingInfo && order.trackingInfo.length > 0 && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-4">Order Timeline</h4>
                          <div className="space-y-4">
                            {order.trackingInfo.map((update, index) => (
                              <div key={index} className="flex items-start">
                                <div className="flex-shrink-0">
                                  <OrderStatusIcon status={update.status} />
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-900">
                                    {update.description}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {new Date(update.timestamp).toLocaleString()}
                                    {update.location && ` • ${update.location}`}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Payment Information */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Payment Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Payment Method</span>
                            <span className="text-gray-900 font-medium capitalize">{order.paymentMethod}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Payment Status</span>
                            <span className={`font-medium ${
                              order.paymentStatus === 'completed' ? 'text-green-600' :
                              order.paymentStatus === 'pending' ? 'text-yellow-600' :
                              order.paymentStatus === 'failed' ? 'text-red-600' :
                              'text-gray-600'
                            } capitalize`}>
                              {order.paymentStatus}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage; 