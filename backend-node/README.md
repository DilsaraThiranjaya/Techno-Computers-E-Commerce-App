# Techno Computers E-Commerce Backend API

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB installation
- Postman for API testing

### Installation
1. Navigate to the backend directory:
   ```bash
   cd Techno-Computers-E-Commerce-App/backend-node
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env` file

4. Start the development server:
   ```bash
   npm run dev
   ```

## 📋 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication
The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-access-token>
```

## 🔐 Authentication Endpoints

### POST /auth/register
Register a new user (customer by default, admin if role specified)

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "address": "123 Main Street, City, State 12345",
  "role": "customer" // optional, defaults to "customer"
}
```

### POST /auth/login
Login with email and password

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### POST /auth/refresh-token
Refresh access token using refresh token

**Request Body:**
```json
{
  "refreshToken": "your-refresh-token"
}
```

### GET /auth/profile
Get current user profile (requires authentication)

### PUT /auth/profile
Update user profile (requires authentication)

**Request Body:**
```json
{
  "firstName": "John Updated",
  "lastName": "Doe Updated",
  "phone": "+1234567899",
  "address": "456 Updated Street, New City, State 54321"
}
```

### POST /auth/change-password
Change user password (requires authentication)

**Request Body:**
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

## 📦 Product Endpoints

### GET /products
Get all products with optional filtering and pagination

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)
- `sort` - Sort field (default: createdAt)
- `order` - Sort order: asc/desc (default: desc)
- `search` - Search term
- `category` - Filter by category
- `brand` - Filter by brand
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `featured` - Filter featured products (true/false)

### GET /products/featured
Get featured products

**Query Parameters:**
- `limit` - Number of products to return (default: 8)

### GET /products/search
Search products by text

**Query Parameters:**
- `q` - Search query (required)
- `page` - Page number
- `limit` - Items per page

### GET /products/category/:categoryName
Get products by category

### GET /products/:id
Get single product by ID

### POST /products (Admin Only)
Create new product

**Request Body:**
```json
{
  "name": "Dell XPS 13 Laptop",
  "description": "High-performance ultrabook...",
  "price": 1299.99,
  "discountPrice": 1199.99,
  "category": "Laptops",
  "brand": "Dell",
  "stock": 25,
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "specifications": {
    "processor": "Intel Core i7-1165G7",
    "ram": "16GB LPDDR4x",
    "storage": "512GB NVMe SSD"
  },
  "featured": true
}
```

### PUT /products/:id (Admin Only)
Update product

### DELETE /products/:id (Admin Only)
Delete product (soft delete - sets status to inactive)

### GET /products/admin/stats (Admin Only)
Get product statistics

## 📞 Contact Endpoints

### POST /contact
Send contact message

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "subject": "Product Inquiry",
  "message": "Hi, I'm interested in learning more about your products..."
}
```

### GET /contact/info
Get contact information

## 🔧 Using the Postman Collection

1. Import the `Techno-Computers-API.postman_collection.json` file into Postman
2. The collection includes environment variables that are automatically set:
   - `baseUrl`: API base URL
   - `accessToken`: JWT access token (auto-set after login)
   - `refreshToken`: JWT refresh token (auto-set after login)
   - `userId`: Current user ID (auto-set after login)
   - `productId`: Product ID (auto-set after creating products)

3. **Testing Flow:**
   - Start with "Register Admin" or "Login" to get authentication tokens
   - Use "Create Sample" requests to populate the database with test data
   - Test product endpoints with various filters and parameters
   - Test contact functionality

## 📊 Response Format

All API responses follow this consistent format:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ },
  "statusCode": 200
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information",
  "statusCode": 400
}
```

## 🛡️ Security Features

- JWT-based authentication with access and refresh tokens
- Password hashing with bcrypt
- Role-based authorization (admin/customer)
- Input validation and sanitization
- CORS configuration
- File upload restrictions
- Rate limiting ready (can be implemented)

## 📁 File Upload

The API supports file uploads for product images and user profile pictures:
- Maximum file size: 5MB
- Allowed formats: Images only (jpg, png, gif, etc.)
- Upload directory: `public/uploads/`
- Files are accessible via: `http://localhost:3000/uploads/filename`

## 🗄️ Database Schema

### Users Collection
- Authentication and profile information
- Role-based access control
- Password hashing

### Products Collection
- Product details with specifications
- Category and brand organization
- Stock management
- Featured products support

### Categories Collection
- Product categorization
- Status management

### Orders Collection
- Order management with items
- Shipping address information
- Payment and order status tracking

### Cart Collection
- Shopping cart functionality
- Cart items with quantities and prices

## 🚨 Error Handling

The API includes comprehensive error handling for:
- Validation errors
- Authentication/authorization errors
- Database errors
- File upload errors
- General server errors

## 📧 Email Integration

Email functionality is configured for:
- Welcome emails on registration
- Order confirmation emails
- Contact form notifications
- Password reset emails (ready to implement)

Configure email settings in the `.env` file with your SMTP credentials.