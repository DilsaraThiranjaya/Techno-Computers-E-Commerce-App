# Techno Computers Backend API

A robust Node.js Express backend API for the Techno Computers e-commerce platform with MongoDB integration.

## 🚀 Overview

This backend provides a comprehensive REST API for e-commerce operations including user authentication, product management, order processing, and admin functionality. Built with Node.js, Express, and MongoDB for scalability and performance.

## ✨ Features

### 🔐 Authentication & Authorization
- **JWT Authentication**: Secure token-based authentication system
- **Role-based Access Control**: Admin and customer role separation
- **Token Refresh**: Automatic token renewal mechanism
- **Password Security**: Bcrypt hashing with salt rounds
- **Session Management**: Secure session handling and logout

### 📦 Product Management
- **CRUD Operations**: Complete product lifecycle management
- **Category System**: Hierarchical product categorization
- **Image Upload**: Multiple image support with file validation
- **Inventory Tracking**: Real-time stock management
- **Search & Filtering**: Advanced product search capabilities
- **Featured Products**: Promotional product highlighting

### 🛒 Order Management
- **Order Processing**: Complete order lifecycle from cart to delivery
- **Status Tracking**: Real-time order status updates
- **Payment Integration**: Support for multiple payment methods
- **Shipping Management**: Address validation and shipping calculations
- **Order History**: Complete order tracking and history

### 👥 User Management
- **Customer Registration**: Secure user account creation
- **Profile Management**: User profile updates and preferences
- **Admin Controls**: User status management and administration
- **Address Management**: Multiple shipping address support

## 🛠️ Technology Stack

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling for Node.js
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing library
- **Multer** - Middleware for handling file uploads
- **Joi** - Data validation library
- **CORS** - Cross-Origin Resource Sharing middleware
- **Helmet** - Security middleware for Express
- **Morgan** - HTTP request logger middleware
- **Dotenv** - Environment variable management

## 📁 Project Structure

```
src/
├── controllers/         # Request handlers and business logic
│   ├── authController.js
│   ├── productController.js
│   ├── orderController.js
│   ├── userController.js
│   └── categoryController.js
├── models/             # Mongoose data models
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   ├── Category.js
│   └── Cart.js
├── routes/             # API route definitions
│   ├── auth.js
│   ├── products.js
│   ├── orders.js
│   ├── users.js
│   └── categories.js
├── middleware/         # Custom middleware functions
│   ├── auth.js
│   ├── validation.js
│   ├── upload.js
│   └── errorHandler.js
├── utils/              # Utility functions and helpers
│   ├── jwt.js
│   ├── email.js
│   └── response.js
├── db/             # Configuration files
│   └── DBConnection.js
├── services/            # API service layer
│   ├── authService.js
│   ├── productService.js
│   ├── orderService.js
│   ├── userService.js
│   └── categoryService.js
├── dto/                # Data Transfer Objects (DTOs)
│   ├── AuthDto.js
│   ├── ProductDto.js
│   ├── OrderDto.js
│   ├── UserDto.js
│   └── CategoryDto.js
└── app.js              # Express application setup
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or cloud instance)
- npm or yarn package manager

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "+1234567890",
  "address": "123 Main St, City, State"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Refresh Token
```http
POST /api/auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer your-jwt-token
```

### Product Endpoints

#### Get All Products
```http
GET /api/products?page=1&limit=10&category=laptops&brand=apple&minPrice=500&maxPrice=2000&search=macbook
```

#### Get Product by ID
```http
GET /api/products/:id
```

#### Create Product (Admin Only)
```http
POST /api/products
Authorization: Bearer admin-jwt-token
Content-Type: application/json

{
  "name": "MacBook Pro 16\"",
  "description": "Powerful laptop for professionals",
  "price": 2499.99,
  "discountPrice": 2299.99,
  "category": "Laptops",
  "brand": "Apple",
  "stock": 50,
  "images": ["image1.jpg", "image2.jpg"],
  "specifications": {
    "processor": "M2 Pro",
    "memory": "16GB",
    "storage": "512GB SSD"
  },
  "featured": true
}
```

#### Update Product (Admin Only)
```http
PUT /api/products/:id
Authorization: Bearer admin-jwt-token
Content-Type: application/json
```

#### Delete Product (Admin Only)
```http
DELETE /api/products/:id
Authorization: Bearer admin-jwt-token
```

### Order Endpoints

#### Create Order
```http
POST /api/orders
Authorization: Bearer user-jwt-token
Content-Type: application/json

{
  "items": [
    {
      "productId": "product-id",
      "quantity": 2,
      "price": 999.99
    }
  ],
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "address": "123 Main St",
    "city": "New York",
    "postalCode": "10001",
    "phone": "+1234567890"
  },
  "paymentMethod": "card",
  "totalAmount": 1999.98
}
```

#### Get User Orders
```http
GET /api/orders/my-orders?page=1&limit=10
Authorization: Bearer user-jwt-token
```

#### Get Order by ID
```http
GET /api/orders/:id
Authorization: Bearer user-jwt-token
```

#### Update Order Status (Admin Only)
```http
PUT /api/orders/:id/status
Authorization: Bearer admin-jwt-token
Content-Type: application/json

{
  "orderStatus": "shipped",
  "notes": "Package shipped via FedEx"
}
```

### Cart Endpoints

#### Get Cart
```http
GET /api/cart
Authorization: Bearer user-jwt-token
```

#### Add to Cart
```http
POST /api/cart/add
Authorization: Bearer user-jwt-token
Content-Type: application/json

{
  "productId": "product-id",
  "quantity": 1
}
```

#### Update Cart Item
```http
PUT /api/cart/item/:productId
Authorization: Bearer user-jwt-token
Content-Type: application/json

{
  "quantity": 3
}
```

#### Remove from Cart
```http
DELETE /api/cart/item/:productId
Authorization: Bearer user-jwt-token
```

#### Clear Cart
```http
DELETE /api/cart/clear
Authorization: Bearer user-jwt-token
```

### Category Endpoints

#### Get All Categories
```http
GET /api/categories?status=active
```

#### Create Category (Admin Only)
```http
POST /api/categories
Authorization: Bearer admin-jwt-token
Content-Type: application/json

{
  "name": "Gaming Laptops",
  "description": "High-performance laptops for gaming",
  "image": "category-image.jpg"
}
```

### User Management Endpoints (Admin Only)

#### Get All Users
```http
GET /api/users?page=1&limit=10&role=customer&status=active
Authorization: Bearer admin-jwt-token
```

#### Update User Status
```http
PUT /api/users/:id/status
Authorization: Bearer admin-jwt-token
Content-Type: application/json

{
  "status": "inactive"
}
```

## 🗄️ Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: String,
  role: String (enum: ['customer', 'admin']),
  status: String (enum: ['active', 'inactive']),
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  discountPrice: Number,
  category: String,
  brand: String,
  stock: Number,
  images: [String],
  specifications: Object,
  featured: Boolean,
  status: String (enum: ['active', 'inactive']),
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  orderNumber: String (unique),
  items: [{
    productId: String,
    name: String,
    price: Number,
    quantity: Number,
    total: Number,
    image: String
  }],
  totalAmount: Number,
  shippingAddress: {
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    postalCode: String,
    phone: String
  },
  paymentMethod: String,
  paymentStatus: String (enum: ['pending', 'paid', 'failed']),
  orderStatus: String (enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']),
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Security Features

### Authentication Security
- JWT tokens with configurable expiration
- Refresh token rotation for enhanced security
- Password hashing with bcrypt and salt rounds
- Rate limiting to prevent brute force attacks
- CORS configuration for cross-origin requests

### Data Validation
- Input validation using Joi schemas
- MongoDB injection prevention
- XSS protection with data sanitization
- File upload validation and size limits

### API Security
- Helmet.js for security headers
- Request rate limiting
- Error handling without sensitive data exposure
- Secure cookie configuration

**Happy coding! 🚀**