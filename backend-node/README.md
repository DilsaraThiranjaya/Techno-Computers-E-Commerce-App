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
│   ├── upload.js
│   └── validation.js
├── config/             # Configuration files
│   ├── database.js
│   ├── cloudinary.js
│   └── constants.js
└── app.js              # Express application setup
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or cloud instance)
- npm or yarn package manager

### Installation

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   NODE_ENV=development
   PORT=3000
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/techno-computers
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key
   JWT_REFRESH_SECRET=your-refresh-secret-key
   JWT_EXPIRE=15m
   JWT_REFRESH_EXPIRE=7d
   
   # Email Configuration (Optional)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   
   # File Upload (Optional)
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

4. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Verify installation**
   ```
   Server running at: http://localhost:3000
   API Documentation: http://localhost:3000/api-docs
   ```

## 📜 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run test` - Run test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint for code quality
- `npm run seed` - Seed database with sample data

## 🔧 Configuration

### Environment Variables

```env
# Server Configuration
NODE_ENV=development
PORT=3000
HOST=localhost

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/techno-computers
DB_NAME=techno-computers

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-key-min-32-chars
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d

# Security Configuration
BCRYPT_SALT_ROUNDS=12
CORS_ORIGIN=http://localhost:5173

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@technocomputers.com

# File Upload Configuration (Optional)
UPLOAD_PATH=uploads/
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp

# Cloudinary Configuration (Optional)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=info
LOG_FILE=logs/app.log
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

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

## 🧪 Testing

### Test Structure
```
tests/
├── unit/               # Unit tests for individual functions
├── integration/        # Integration tests for API endpoints
├── fixtures/          # Test data and fixtures
└── helpers/           # Test utility functions
```

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- --grep "auth"

# Run tests in watch mode
npm run test:watch
```

### Test Examples
```javascript
// Example: Testing user registration
describe('POST /api/auth/register', () => {
  it('should register a new user successfully', async () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'securePassword123'
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(userData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.user.email).toBe(userData.email);
  });
});
```

## 🚀 Deployment

### Production Setup

1. **Environment Configuration**
   ```bash
   NODE_ENV=production
   PORT=3000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/techno-computers
   ```

2. **Build and Start**
   ```bash
   npm install --production
   npm start
   ```

### Deployment Platforms

#### Heroku
```bash
# Install Heroku CLI
heroku create techno-computers-api
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your-mongodb-uri
git push heroku main
```

#### Railway
```bash
# Connect GitHub repository
# Configure environment variables
# Deploy automatically on push
```

#### DigitalOcean App Platform
```yaml
# app.yaml
name: techno-computers-api
services:
- name: api
  source_dir: /
  github:
    repo: your-username/techno-computers
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NODE_ENV
    value: production
```

### Docker Deployment
```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

USER node

CMD ["npm", "start"]
```

## 📊 Monitoring & Logging

### Logging Configuration
```javascript
// Winston logger setup
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});
```

### Health Check Endpoint
```http
GET /api/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600,
  "database": "connected",
  "memory": {
    "used": "45.2 MB",
    "total": "128 MB"
  }
}
```

## 🐛 Troubleshooting

### Common Issues

**Database Connection Failed**
```bash
# Check MongoDB service
sudo systemctl status mongod

# Check connection string
echo $MONGODB_URI

# Test connection
mongo $MONGODB_URI
```

**JWT Token Issues**
```bash
# Verify JWT secret is set
echo $JWT_SECRET

# Check token expiration
# Ensure client handles token refresh
```

**File Upload Problems**
```bash
# Check upload directory permissions
ls -la uploads/

# Verify file size limits
# Check MIME type restrictions
```

**Performance Issues**
```bash
# Monitor memory usage
node --inspect app.js

# Check database queries
# Add database indexes
# Implement caching
```

## 📈 Performance Optimization

### Database Optimization
- Create indexes for frequently queried fields
- Use aggregation pipelines for complex queries
- Implement database connection pooling
- Monitor slow queries and optimize

### Caching Strategy
- Implement Redis for session storage
- Cache frequently accessed data
- Use CDN for static assets
- Implement API response caching

### Code Optimization
- Use async/await for better performance
- Implement pagination for large datasets
- Optimize middleware order
- Use compression middleware

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Write tests for new functionality
4. Implement the feature
5. Run tests and ensure they pass
6. Submit a pull request

### Code Standards
- Follow ESLint configuration
- Write meaningful commit messages
- Add JSDoc comments for functions
- Maintain test coverage above 80%

## 📞 Support

For backend-specific issues:
- Check server logs for errors
- Verify database connectivity
- Test API endpoints with Postman
- Monitor server performance metrics

---

**Built with Node.js and Express for scalable e-commerce! 🚀**