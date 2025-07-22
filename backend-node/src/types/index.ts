import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  role: 'customer' | 'admin';
  profileImage?: string;
  status: 'active' | 'inactive';
  memberSince: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface ICategory extends Document {
  _id: string;
  name: string;
  icon: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct extends Document {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: ICategory['_id'];
  stock: number;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICartItem {
  product: IProduct['_id'];
  quantity: number;
  price: number;
}

export interface ICart extends Document {
  _id: string;
  user: IUser['_id'];
  items: ICartItem[];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderItem {
  product: IProduct['_id'];
  quantity: number;
  price: number;
  name: string;
}

export interface IOrder extends Document {
  _id: string;
  user: IUser['_id'];
  items: IOrderItem[];
  totalAmount: number;
  shippingAddress: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    postalCode?: string;
  };
  paymentMethod: 'cod' | 'card' | 'bank';
  paymentStatus: 'pending' | 'completed' | 'failed';
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  specialInstructions?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRequest extends Request {
  user?: IUser;
}

export interface JWTPayload {
  id: string;
  email: string;
  role: 'customer' | 'admin';
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
}

export interface AdminStats {
  totalCustomers: number;
  activeCustomers: number;
  inactiveCustomers: number;
  newThisMonth: number;
  totalProducts: number;
  inStockProducts: number;
  outOfStockProducts: number;
  totalCategories: number;
  totalOrders: number;
  pendingOrders: number;
  todaysRevenue: number;
  monthlyRevenue: number;
}