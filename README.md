# Techno Computers E-Commerce Platform

A full-stack e-commerce platform built with React, TypeScript, and Node.js, designed for computer and technology product sales.

## 🚀 Project Overview

This is a comprehensive e-commerce solution featuring separate frontend and backend applications with modern architecture, secure authentication, and full CRUD operations for products, orders, and user management.

### 🏗️ Architecture

```
techno-computers/
├── frontend/          # React TypeScript Frontend
├── backend/           # Node.js Express Backend
└── README.md         # This file
```

## ✨ Key Features

### 🛍️ Customer Features
- **Product Browsing**: Advanced filtering, search, and sorting
- **Shopping Cart**: Real-time cart management with quantity updates
- **Secure Checkout**: Complete order placement with shipping details
- **Order Tracking**: View order history and track status
- **User Profile**: Account management and profile updates

### 👨‍💼 Admin Features
- **Dashboard**: Comprehensive analytics and overview
- **User Management**: Customer and admin account administration
- **Product Management**: Full CRUD operations for inventory
- **Category Management**: Product categorization and organization
- **Order Management**: Order processing and status updates

### 🔐 Security & Authentication
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access**: Admin and customer role separation
- **Protected Routes**: Route-level security implementation
- **Token Refresh**: Automatic token renewal system

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **React Hook Form** with Yup validation
- **Axios** for API communication
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Multer** for file uploads
- **CORS** for cross-origin requests

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DilsaraThiranjaya/Techno-Computers-E-Commerce-App.git
   ```

2. **Setup Backend**
   ```bash
   cd backend-node
   npm install
   cp .env
   # Configure your environment variables
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd frontend-react-vite
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5174
   - Backend API: http://localhost:3000

## 📁 Project Structure

### Frontend Structure
```
src/
├── assets/           # Static assets (images, fonts, etc.)
├── components/       # Reusable UI components
├── hooks/            # Custom React hooks
├── pages/            # Page components
├── services/         # API service layer
├── store/            # Redux store and slices
└── types/            # TypeScript type definitions
```

### Backend Structure
```
src/
├── controllers/      # Request handlers  
├── db/              # Database connections and setup  
├── dto/             # Data Transfer Objects  
├── middleware/      # Custom middleware  
├── model/           # Database models  
├── routes/          # API routes  
├── services/        # Business logic layer  
├── types/           # TypeScript type definitions  
└── utils/           # Utility functions  
```

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/techno-computers
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret
EMAIL_USER=your@gmail.com
EMAIL_PASS=your-app-password
```

### 📚 API Documentation

### Authentication Endpoints
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile
- `PUT /auth/profile` - Update user profile
- `POST /auth/change-password` - Change password
- `POST /auth/refresh-token` - Refresh access token
- `POST /auth/logout` - Logout user

### Product Endpoints
- `GET /products` - Get all products (with pagination)
- `GET /products/featured` - Get featured products
- `GET /products/:id` - Get product by ID
- `GET /products/search` - Search products
- `GET /products/:categoryName` - Get products by category
- `POST /products` - Create product (Admin only)
- `PUT /products/:id` - Update product (Admin only)
- `DELETE /products/:id` - Delete product (Admin only)
- `GET /products/admin/stats` - Get product statistics (Admin only)

### Category Endpoints
- `GET /categories` - Get all categories
- `POST /categories` - Create category (Admin only)
- `PUT /categories/:id` - Update category (Admin only)
- `DELETE /categories/:id` - Delete category (Admin only)
- `GET /categories/stats` - Get category statistics (Admin only)

### Cart Endpoints
- `GET /cart` - Get user cart
- `POST /cart/add` - Add item to cart
- `PUT /cart/item/:productId` - Update cart item
- `DELETE /cart/item/:productId` - Remove item from cart
- `DELETE /cart/clear` - Clear cart

### Order Endpoints
- `POST /orders` - Create new order
- `GET /orders/my-orders` - Get user orders
- `GET /orders/:id` - Get order by ID
- `GET /orders` - Get all orders (Admin only)
- `PUT /orders/:id/status` - Update order status (Admin only)
- `GET /orders/admin/stats` - Get order statistics (Admin only)

### User Management (Admin)
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PUT /users/:id/status` - Update user status
- `GET /users/stats` - Get user statistics
- `GET /users?search=query` - Search users

### Contact Endpoints
- `POST /contact` - Send contact message
- `GET /contact/info` - Get contact information

## 🤝 Contributor
** Dilsara Thiranjaya **