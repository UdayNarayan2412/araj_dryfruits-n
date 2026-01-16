import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { auth } from '../config/firebase';
import { CartItem } from '../context/CartContext';

interface OrderData {
  userId: string;
  userEmail: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
    phone: string;
  };
  paymentMethod: string;
  orderDate: Date;
  status: 'pending';
}

export const placeOrder = async (orderData: Omit<OrderData, 'orderDate' | 'status'>) => {
  try {
    // Verify authentication
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('User must be authenticated to place an order');
    }

    // Verify the order belongs to the authenticated user
    if (currentUser.uid !== orderData.userId) {
      throw new Error('Order user ID does not match authenticated user');
    }

    // Log the order data being sent
    console.log('Attempting to place order with data:', orderData);

    // Verify database connection
    if (!db) {
      console.error('Firestore database instance is not initialized');
      throw new Error('Database connection error');
    }

    // Create the order object with metadata
    const orderWithMetadata = {
      ...orderData,
      orderDate: new Date(),
      status: 'pending' as const
    };

    // Log the final order object
    console.log('Final order object:', orderWithMetadata);

    // Get reference to orders collection
    const ordersCollection = collection(db, 'orders');
    console.log('Got reference to orders collection');

    // Attempt to add the document
    const docRef = await addDoc(ordersCollection, orderWithMetadata);
    console.log('Order successfully placed with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    // Log the detailed error
    console.error('Detailed error placing order:', {
      error,
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      errorStack: error instanceof Error ? error.stack : undefined,
      orderData,
      currentUser: auth.currentUser
    });

    if (error instanceof Error) {
      throw new Error(`Failed to place order: ${error.message}`);
    } else {
      throw new Error('Failed to place order: Unknown error occurred');
    }
  }
}; 