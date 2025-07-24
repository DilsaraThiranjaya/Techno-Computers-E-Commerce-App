// Authentication DTOs
export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  role?: 'admin' | 'customer';
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// User DTOs
export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  profileImage?: string;
}

export interface UpdateUserStatusDto {
  status: 'active' | 'inactive';
}

// Product DTOs
export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  brand: string;
  stock: number;
  images: string[];
  specifications?: {
    processor?: string;
    ram?: string;
    storage?: string;
    graphics?: string;
    display?: string;
    [key: string]: any;
  };
  featured?: boolean;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  discountPrice?: number;
  category?: string;
  brand?: string;
  stock?: number;
  images?: string[];
  specifications?: {
    processor?: string;
    ram?: string;
    storage?: string;
    graphics?: string;
    display?: string;
    [key: string]: any;
  };
  status?: 'active' | 'inactive';
  featured?: boolean;
}

// Category DTOs
export interface CreateCategoryDto {
  name: string;
  description?: string;
  image?: string;
}

export interface UpdateCategoryDto {
  name?: string;
  description?: string;
  image?: string;
  status?: 'active' | 'inactive';
}

// Cart DTOs
export interface AddToCartDto {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemDto {
  quantity: number;
}

// Order DTOs
export interface CreateOrderDto {
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
  };
  paymentMethod: 'cash_on_delivery' | 'card' | 'bank_transfer';
  notes?: string;
}

export interface UpdateOrderStatusDto {
  orderStatus?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus?: 'pending' | 'paid' | 'failed';
}

// Contact DTOs
export interface ContactDto {
  name: string;
  email: string;
  subject: string;
  message: string;
}