import { Request, Response } from 'express';
import { Product } from '../model/Product';
import { Category } from '../model/Category';
import { ResponseUtil } from '../utils/response';
import { ErrorHandler } from '../middleware/errorHandler';
import { AuthenticatedRequest, ProductFilter } from '../types';
import { CreateCategoryDto, CreateProductDto, UpdateProductDto } from '../dto';

export class ProductController {
  static getAllProducts = ErrorHandler.asyncHandler(async (req: Request, res: Response) => {
    const {
      page = 1,
      limit = 12,
      sort = 'createdAt',
      order = 'desc',
      search,
      category,
      brand,
      minPrice,
      maxPrice,
      featured,
      status = 'active'
    }: ProductFilter = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const filter: any = { status };

    if (search) {
      filter.$text = { $search: search };
    }

    if (category) {
      const categoryDoc = await Category.findOne({ name: category, status: 'active' });
      if (categoryDoc) {
        filter.category = categoryDoc.name;
      } else {
        // Early return with empty list if category doesn't exist
        return ResponseUtil.success(res, 'No products found', {
          products: [],
          pagination: {
            currentPage: Number(page),
            totalPages: 0,
            totalItems: 0,
            itemsPerPage: Number(limit)
          }
        });
      }
    }

    if (brand) {
      filter.brand = brand;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (featured !== undefined) {
      filter.featured = String(featured).toLowerCase() === 'true';
    }

    const sortObj: any = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;

    const products = await Product.find(filter)
        .populate('category', 'name')
        .sort(sortObj)
        .skip(skip)
        .limit(Number(limit));

    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / Number(limit));

    return ResponseUtil.success(res, 'Products retrieved successfully', {
      products,
      pagination: {
        currentPage: Number(page),
        totalPages,
        totalItems: total,
        itemsPerPage: Number(limit)
      }
    });
  });


  static getProductById = ErrorHandler.asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await Product.findById(id).populate('category', 'name description');

    if (!product) {
      return ResponseUtil.notFound(res, 'Product not found');
    }

    return ResponseUtil.success(res, 'Product retrieved successfully', product);
  });

  static createProduct = ErrorHandler.asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const productData: CreateProductDto = req.body;

    // Check if category exists and get its ID
    const category = await Category.findOne({
      name: productData.category,
      status: 'active'
    });

    if (!category) {
      return ResponseUtil.validation(res, 'Invalid category selected');
    }

    // Create new product with category name
    const product = new Product({
      ...productData,
      category: category.name // Use the category name
    });

    await product.save();

    return ResponseUtil.success(res, 'Product created successfully', product, 201);
  });

  static updateProduct = ErrorHandler.asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const updateData: UpdateProductDto = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return ResponseUtil.notFound(res, 'Product not found');
    }

    // Handle category update if provided
    if (updateData.category) {
      const category = await Category.findOne({
        name: updateData.category,
        status: 'active'
      });
      if (!category) {
        return ResponseUtil.validation(res, 'Invalid category selected');
      }
      updateData.category = category.name;
    }

    Object.assign(product, updateData);
    await product.save();

    return ResponseUtil.success(res, 'Product updated successfully', product);
  });

  static deleteProduct = ErrorHandler.asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return ResponseUtil.notFound(res, 'Product not found');
    }

    // Soft delete by setting status to inactive
    product.status = 'inactive';
    await product.save();

    return ResponseUtil.success(res, 'Product deleted successfully');
  });

  static getFeaturedProducts = ErrorHandler.asyncHandler(async (req: Request, res: Response) => {
    const { limit = 8 } = req.query;

    const products = await Product.find({ featured: true, status: 'active' })
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    return ResponseUtil.success(res, 'Featured products retrieved successfully', products);
  });

  static getProductsByCategory = ErrorHandler.asyncHandler(async (req: Request, res: Response) => {
    const { categoryName } = req.params;
    const { page = 1, limit = 12, sort = 'createdAt', order = 'desc' } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const sortObj: any = {};
    sortObj[sort as string] = order === 'desc' ? -1 : 1;

    const category = await Category.findOne({ name: categoryName, status: 'active' });
    if (!category) {
      return ResponseUtil.success(res, 'No products found', {
        products: [],
        pagination: {
          currentPage: Number(page),
          totalPages: 0,
          totalItems: 0,
          itemsPerPage: Number(limit)
        }
      });
    }

    const products = await Product.find({ category: categoryName, status: 'active' })
        .sort(sortObj)
        .skip(skip)
        .limit(Number(limit));

    const total = await Product.countDocuments({ category: categoryName, status: 'active' });
    const totalPages = Math.ceil(total / Number(limit));

    return ResponseUtil.success(res, 'Products retrieved successfully', {
      products,
      pagination: {
        currentPage: Number(page),
        totalPages,
        totalItems: total,
        itemsPerPage: Number(limit)
      }
    });
  });

  static searchProducts = ErrorHandler.asyncHandler(async (req: Request, res: Response) => {
    const { q, page = 1, limit = 12 } = req.query;

    if (!q) {
      return ResponseUtil.validation(res, 'Search query is required');
    }

    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find({
      $text: { $search: q as string },
      status: 'active'
    })
      .sort({ score: { $meta: 'textScore' } })
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments({
      $text: { $search: q as string },
      status: 'active'
    });

    const totalPages = Math.ceil(total / Number(limit));

    return ResponseUtil.success(res, 'Search completed successfully', {
      products,
      query: q,
      pagination: {
        currentPage: Number(page),
        totalPages,
        totalItems: total,
        itemsPerPage: Number(limit)
      }
    });
  });

  static getProductStats = ErrorHandler.asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const totalProducts = await Product.countDocuments({ status: 'active' });
    const featuredProducts = await Product.countDocuments({ featured: true, status: 'active' });
    const outOfStock = await Product.countDocuments({ stock: 0, status: 'active' });
    const lowStock = await Product.countDocuments({ stock: { $lte: 10, $gt: 0 }, status: 'active' });

    const categories = await Product.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const brands = await Product.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: '$brand', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    return ResponseUtil.success(res, 'Product statistics retrieved successfully', {
      totalProducts,
      featuredProducts,
      outOfStock,
      lowStock,
      categories,
      brands
    });
  });

  static createCategory = ErrorHandler.asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const categoryData: CreateCategoryDto = req.body;

    // Check if category already exists
    const existingCategory = await Category.findOne({ 
      name: { $regex: new RegExp(`^${categoryData.name}$`, 'i') } 
    });
    
    if (existingCategory) {
      return ResponseUtil.validation(res, 'Category with this name already exists');
    }
    const category = new Category(categoryData);
    await category.save();

    return ResponseUtil.success(res, 'Category created successfully', category, 201);
  });

  static getAllCategories = ErrorHandler.asyncHandler(async (req: Request, res: Response) => {
    const { status = 'active' } = req.query;
    
    const filter: any = {};
    if (status) {
      filter.status = status;
    }

    const categories = await Category.find(filter).sort({ name: 1 });

    return ResponseUtil.success(res, 'Categories retrieved successfully', categories);
  });

  static updateCategory = ErrorHandler.asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return ResponseUtil.notFound(res, 'Category not found');
    }

    // Check if name is being updated and if it already exists
    if (updateData.name && updateData.name !== category.name) {
      const existingCategory = await Category.findOne({ 
        name: { $regex: new RegExp(`^${updateData.name}$`, 'i') },
        _id: { $ne: id }
      });
      
      if (existingCategory) {
        return ResponseUtil.validation(res, 'Category with this name already exists');
      }
    }

    Object.assign(category, updateData);
    await category.save();

    return ResponseUtil.success(res, 'Category updated successfully', category);
  });

  static deleteCategory = ErrorHandler.asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return ResponseUtil.notFound(res, 'Category not found');
    }

    // Check if category is being used by any products
    const productsUsingCategory = await Product.countDocuments({ category: id, status: 'active' });
    if (productsUsingCategory > 0) {
      return ResponseUtil.validation(res, 'Cannot delete category that is being used by products');
    }

    // Soft delete
    category.status = 'inactive';
    await category.save();

    return ResponseUtil.success(res, 'Category deleted successfully');
  });

  static getCategoryStats = ErrorHandler.asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const totalCategories = await Category.countDocuments({ status: 'active' });
    const inactiveCategories = await Category.countDocuments({ status: 'inactive' });
    
    const categoriesWithProductCount = await Category.aggregate([
      { $match: { status: 'active' } },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: 'category',
          as: 'products'
        }
      },
      {
        $project: {
          name: 1,
          description: 1,
          productCount: { $size: '$products' }
        }
      },
      { $sort: { productCount: -1 } }
    ]);
    return ResponseUtil.success(res, 'Category statistics retrieved successfully', {
      totalCategories,
      inactiveCategories,
      categoriesWithProductCount
    });
  });
}