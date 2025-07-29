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
- **Responsive Design**: Mobile-first approach for all devices

### 👨‍💼 Admin Features
- **Dashboard**: Comprehensive analytics and overview
- **User Management**: Customer and admin account administration
- **Product Management**: Full CRUD operations for inventory
- **Category Management**: Product categorization and organization
- **Order Management**: Order processing and status updates
- **Real-time Updates**: Live data synchronization

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
   git clone https://github.com/yourusername/techno-computers.git
   cd techno-computers
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Configure your environment variables
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 📁 Project Structure

### Frontend Structure
```
src/
├── components/        # Reusable UI components
├── pages/            # Page components
├── store/            # Redux store and slices
├── services/         # API service layer
├── hooks/            # Custom React hooks
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

### Backend Structure
```
src/
├── controllers/      # Request handlers
├── models/          # Database models
├── routes/          # API routes
├── middleware/      # Custom middleware
├── utils/           # Utility functions
└── config/          # Configuration files
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
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:3000/api
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Token refresh
- `GET /api/auth/profile` - Get user profile

### Product Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Order Endpoints
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/status` - Update order status (Admin)

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm run test
```

### Backend Testing
```bash
cd backend
npm run test
```

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
```bash
cd frontend
npm run build
# Deploy the dist/ folder
```

### Backend Deployment (Heroku/Railway)
```bash
cd backend
# Configure production environment variables
# Deploy using your preferred platform
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Developer**: React/TypeScript specialist
- **Backend Developer**: Node.js/MongoDB expert
- **UI/UX Designer**: Modern e-commerce design
- **DevOps Engineer**: Deployment and infrastructure

## 📞 Support

For support and questions:
- Email: support@technocomputers.com
- Documentation: [Project Wiki](https://github.com/yourusername/techno-computers/wiki)
- Issues: [GitHub Issues](https://github.com/yourusername/techno-computers/issues)

## 🔄 Version History

- **v1.0.0** - Initial release with core e-commerce features
- **v1.1.0** - Added admin dashboard and analytics
- **v1.2.0** - Enhanced search and filtering capabilities
- **v2.0.0** - Complete UI/UX redesign with mobile optimization

---

**Built with ❤️ for the tech community**