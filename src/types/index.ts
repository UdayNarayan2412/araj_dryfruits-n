export interface Product {
  /**
   * Unique product identifier in the format: PREFIX-TIMESTAMP-RANDOM
   * PREFIX: Category-based prefix (NUT, SPC, DRF)
   * TIMESTAMP: Unix timestamp when the product was created
   * RANDOM: Random alphanumeric string
   * Example: NUT-1709123456789-ABC123
   */
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  image: string;
  description: string;
  weight: string;
  nutritionalInfo: string;
  inStock: boolean;
  featured: boolean;
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  avatar?: string;
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  weight: string;
  searchTerm: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  phoneNumber?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    pinCode: string;
  };
  preferences?: UserPreferences;
}

export interface UserPreferences {
  emailNotifications: boolean;
  orderUpdates: boolean;
  promotionalEmails: boolean;
  theme: 'light' | 'dark';
  language: 'en' | 'hi';
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: 'cod' | 'online';
  paymentStatus: PaymentStatus;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
    phone: string;
  };
  createdAt: string;
  updatedAt: string;
  expectedDelivery?: string;
  trackingInfo?: TrackingUpdate[];
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  weight: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type PaymentStatus =
  | 'pending'
  | 'completed'
  | 'failed'
  | 'refunded';

export interface TrackingUpdate {
  status: OrderStatus;
  timestamp: string;
  location?: string;
  description: string;
}