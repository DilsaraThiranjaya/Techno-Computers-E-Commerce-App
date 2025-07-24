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
router.get('/:id', ProductController.getProductById);

// Admin only routes
router.use(AuthMiddleware.authenticate);
router.use(AuthMiddleware.adminOnly);

router.post('/category', ValidationMiddleware.validateCategory, ProductController.createCategory);
router.post('/', uploadMultiple('images'), ValidationMiddleware.validateProduct, ProductController.createProduct);
router.put('/:id', uploadMultiple('images'), ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);
router.get('/admin/stats', ProductController.getProductStats);

export default router;