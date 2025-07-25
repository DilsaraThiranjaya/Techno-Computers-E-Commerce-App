import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { ValidationMiddleware } from '../middleware/validation';
import { uploadMultiple } from '../middleware/upload';

const router = Router();

// Public routes
router.get('/', ProductController.getAllProducts);
router.get('/featured', ProductController.getFeaturedProducts);
router.get('/search', ProductController.searchProducts);
router.get('/category/:categoryName', ProductController.getProductsByCategory);
router.get('/categories', ProductController.getAllCategories);
router.get('/:id', ProductController.getProductById);

// Admin only routes
router.use(AuthMiddleware.authenticate);
router.use(AuthMiddleware.adminOnly);

// Category management routes
router.post('/category', ValidationMiddleware.validateCategory, ProductController.createCategory);
router.put('/category/:id', ValidationMiddleware.validateCategory, ProductController.updateCategory);
router.delete('/category/:id', ProductController.deleteCategory);
router.get('/categories/stats', ProductController.getCategoryStats);

// Product management routes
router.post('/', uploadMultiple('images'), ValidationMiddleware.validateProduct, ProductController.createProduct);
router.put('/:id', uploadMultiple('images'), ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);
router.get('/admin/stats', ProductController.getProductStats);

export default router;