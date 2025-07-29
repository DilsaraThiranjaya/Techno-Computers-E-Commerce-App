# Techno Computers Frontend

A modern React TypeScript frontend for the Techno Computers e-commerce platform.

## 🚀 Overview

This frontend application provides a comprehensive e-commerce experience with customer shopping features and admin management capabilities. Built with React 18, TypeScript, and modern development practices.

## ✨ Features

### 🛍️ Customer Features
- **Product Catalog**: Browse products with advanced filtering and search
- **Product Details**: Detailed product pages with image galleries and specifications
- **Shopping Cart**: Real-time cart management with quantity updates
- **Checkout Process**: Secure checkout with shipping address and payment options
- **Order Management**: View order history and track order status
- **User Profile**: Account management and profile updates
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 👨‍💼 Admin Features
- **Dashboard**: Analytics overview with key metrics and charts
- **User Management**: Manage customer accounts and admin users
- **Product Management**: Full CRUD operations for product inventory
- **Category Management**: Organize products into categories
- **Order Management**: Process orders and update delivery status
- **Real-time Updates**: Live data synchronization across the platform

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development with enhanced IDE support
- **Redux Toolkit** - Efficient state management with RTK Query
- **React Router v6** - Client-side routing with nested routes
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **React Hook Form** - Performant forms with easy validation
- **Yup** - Schema validation for forms
- **Axios** - HTTP client for API communication
- **React Hot Toast** - Beautiful toast notifications
- **Lucide React** - Modern icon library
- **Vite** - Fast build tool and development server

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Shared components (Header, Footer, etc.)
│   └── ui/              # Basic UI components
├── pages/               # Page components
│   ├── admin/           # Admin dashboard pages
│   ├── auth/            # Authentication pages
│   └── customer/        # Customer-facing pages
├── store/               # Redux store configuration
│   └── slices/          # Redux slices for different features
├── services/            # API service layer
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
├── utils/               # Utility functions and helpers
└── assets/              # Static assets (images, fonts, etc.)
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Backend API running (see backend README)

### Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
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
   VITE_API_URL=http://localhost:3000/api
   VITE_APP_NAME=Techno Computers
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📜 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production-ready application
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks
- `npm run type-check` - Run TypeScript compiler checks

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api

# App Configuration
VITE_APP_NAME=Techno Computers
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_CHAT_SUPPORT=false
```

### Tailwind CSS Configuration

The project uses a custom Tailwind configuration with:
- Custom color palette for brand consistency
- Extended spacing and typography scales
- Custom component classes for common patterns
- Responsive breakpoints optimized for e-commerce

## 🏗️ Architecture

### State Management
The application uses Redux Toolkit for state management with the following slices:
- `authSlice` - User authentication and profile
- `productSlice` - Product catalog and details
- `cartSlice` - Shopping cart management
- `orderSlice` - Order history and tracking
- `categorySlice` - Product categories
- `userSlice` - User management (admin)

### API Integration
- Centralized API service using Axios
- Automatic token refresh and error handling
- Request/response interceptors for common operations
- Type-safe API calls with TypeScript interfaces

### Routing Structure
```
/                    # Home page
/products           # Product catalog
/products/:id       # Product details
/search             # Product search
/cart               # Shopping cart
/checkout           # Checkout process
/orders             # Order history
/orders/:id         # Order details
/profile            # User profile
/contact            # Contact page
/login              # User login
/register           # User registration
/admin              # Admin dashboard
/admin/users        # User management
/admin/products     # Product management
/admin/categories   # Category management
/admin/orders       # Order management
```

## 🎨 UI/UX Design

### Design System
- **Colors**: Custom brand palette with semantic color tokens
- **Typography**: Hierarchical text styles with consistent spacing
- **Components**: Reusable components following atomic design principles
- **Icons**: Lucide React icons for consistency and performance
- **Animations**: Subtle transitions and micro-interactions

### Responsive Design
- Mobile-first approach with progressive enhancement
- Breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`
- Flexible grid system using CSS Grid and Flexbox
- Touch-friendly interface elements for mobile devices

## 🔐 Authentication & Security

### Authentication Flow
1. User login with email/password
2. JWT token storage in localStorage
3. Automatic token refresh before expiration
4. Role-based route protection
5. Secure logout with token cleanup

### Protected Routes
- Customer routes require authentication
- Admin routes require admin role
- Automatic redirect to login for unauthorized access
- Persistent login state across browser sessions

## 📱 Features Deep Dive

### Product Catalog
- **Filtering**: By category, brand, price range, and features
- **Sorting**: By price, name, date, and popularity
- **Search**: Full-text search with autocomplete
- **Pagination**: Efficient loading of large product sets
- **Grid/List Views**: Toggle between display modes

### Shopping Cart
- **Real-time Updates**: Instant quantity and price updates
- **Persistence**: Cart state maintained across sessions
- **Stock Validation**: Prevent over-ordering with stock checks
- **Price Calculation**: Automatic tax and shipping calculation
- **Guest Checkout**: Allow purchases without account creation

### Admin Dashboard
- **Analytics**: Sales metrics, user statistics, and trends
- **Data Tables**: Sortable, filterable data with pagination
- **Bulk Operations**: Multi-select actions for efficiency
- **Real-time Updates**: Live data synchronization
- **Export Features**: Download reports and data exports

## 🧪 Testing

### Testing Strategy
- Unit tests for utility functions and hooks
- Component tests for UI components
- Integration tests for user workflows
- E2E tests for critical user journeys

### Running Tests
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Platforms

#### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables
5. Deploy automatically on push

#### Vercel
1. Import project from GitHub
2. Configure build settings
3. Set environment variables
4. Deploy with automatic previews

#### Traditional Hosting
1. Build the project: `npm run build`
2. Upload `dist/` folder to your web server
3. Configure server for SPA routing
4. Set up HTTPS and security headers

## 🔧 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Use functional components with hooks
- Implement proper error boundaries
- Write meaningful commit messages

### Component Guidelines
- Keep components small and focused
- Use composition over inheritance
- Implement proper prop types
- Handle loading and error states
- Write accessible markup

### Performance Optimization
- Lazy load routes and components
- Optimize images and assets
- Implement proper caching strategies
- Use React.memo for expensive components
- Monitor bundle size and performance metrics

## 🐛 Troubleshooting

### Common Issues

**Development server won't start**
- Check Node.js version (v16+)
- Clear node_modules and reinstall
- Check for port conflicts

**API calls failing**
- Verify backend server is running
- Check CORS configuration
- Validate environment variables

**Build errors**
- Run TypeScript checks: `npm run type-check`
- Check for unused imports
- Verify all dependencies are installed

**Styling issues**
- Clear Tailwind cache
- Check for conflicting CSS
- Verify Tailwind configuration

## 📚 Additional Resources

- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Redux Toolkit Guide](https://redux-toolkit.js.org/introduction/getting-started)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide)

## 🤝 Contributing

1. Follow the established code style and patterns
2. Write tests for new features
3. Update documentation as needed
4. Submit pull requests with clear descriptions
5. Participate in code reviews

## 📞 Support

For frontend-specific issues:
- Check the browser console for errors
- Review network requests in DevTools
- Verify component props and state
- Test in different browsers and devices

---

**Happy coding! 🚀**