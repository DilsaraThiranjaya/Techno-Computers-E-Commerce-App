import { Request, Response } from 'express';
import {Cart, CartItem} from '../model/Cart';
import { Product } from '../model/Product';
import { ResponseUtil } from '../utils/response';
import { ErrorHandler } from '../middleware/errorHandler';
import { AuthenticatedRequest } from '../types';
import { AddToCartDto, UpdateCartItemDto } from '../dto';

export class CartController {
  static getCart = ErrorHandler.asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.userId!;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [], totalAmount: 0 });
      await cart.save();
    }

    // Populate product details for each cart item
    const populatedItems = [];
    for (const item of cart.items) {
      const product = await Product.findById(item.productId);
      if (product) {
        populatedItems.push({
          ...item.toObject(),
          product: {
            _id: product._id,
            name: product.name,
            price: product.price,
            discountPrice: product.discountPrice,
            images: product.images,
            stock: product.stock
          }
        });
      }
    }

    const cartResponse = {
      ...cart.toObject(),
      items: populatedItems
    };

    return ResponseUtil.success(res, 'Cart retrieved successfully', cartResponse);
  });

  static addToCart = ErrorHandler.asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.userId!;
    const { productId, quantity }: AddToCartDto = req.body;

    if (!productId || !quantity || quantity < 1) {
      return ResponseUtil.validation(res, 'Product ID and valid quantity are required');
    }

    const product = await Product.findById(productId);
    if (!product) {
      return ResponseUtil.notFound(res, 'Product not found');
    }

    if (product.stock < quantity) {
      return ResponseUtil.validation(res, 'Insufficient stock available');
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [], totalAmount: 0 });
    }

    const existingItemIndex = cart.items.findIndex(
        item => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;
      if (product.stock < newQuantity) {
        return ResponseUtil.validation(res, 'Insufficient stock available');
      }
      cart.items[existingItemIndex].quantity = newQuantity;
    } else {
      // Create a new cart item that matches the schema
      const newItem = new CartItem({
        productId,
        quantity,
        price: product.discountPrice || product.price
      });
      cart.items.push(newItem);
    }

    // Recalculate total amount
    cart.totalAmount = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

    await cart.save();

    // Get updated cart with populated items
    const updatedCart = await CartController.getPopulatedCart(userId);
    return ResponseUtil.success(res, 'Item added to cart successfully', updatedCart);
  });

  static updateCartItem = ErrorHandler.asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.userId!;
    const { productId } = req.params;
    const { quantity }: UpdateCartItemDto = req.body;

    if (!quantity || quantity < 1) {
      return ResponseUtil.validation(res, 'Valid quantity is required');
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return ResponseUtil.notFound(res, 'Cart not found');
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return ResponseUtil.notFound(res, 'Item not found in cart');
    }

    const product = await Product.findById(productId);
    if (!product) {
      return ResponseUtil.notFound(res, 'Product not found');
    }

    if (product.stock < quantity) {
      return ResponseUtil.validation(res, 'Insufficient stock available');
    }

    cart.items[itemIndex].quantity = quantity;
    cart.totalAmount = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

    await cart.save();

    const updatedCart = await CartController.getPopulatedCart(userId);
    return ResponseUtil.success(res, 'Cart item updated successfully', updatedCart);
  });

  static removeFromCart = ErrorHandler.asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.userId!;
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return ResponseUtil.notFound(res, 'Cart not found');
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    cart.totalAmount = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

    await cart.save();

    const updatedCart = await CartController.getPopulatedCart(userId);
    return ResponseUtil.success(res, 'Item removed from cart successfully', updatedCart);
  });

  static clearCart = ErrorHandler.asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.userId!;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return ResponseUtil.notFound(res, 'Cart not found');
    }

    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    return ResponseUtil.success(res, 'Cart cleared successfully', cart);
  });

  private static async getPopulatedCart(userId: string) {
    const cart = await Cart.findOne({ userId });
    if (!cart) return null;

    const populatedItems = [];
    for (const item of cart.items) {
      const product = await Product.findById(item.productId);
      if (product) {
        populatedItems.push({
          ...item.toObject(),
          product: {
            _id: product._id,
            name: product.name,
            price: product.price,
            discountPrice: product.discountPrice,
            images: product.images,
            stock: product.stock
          }
        });
      }
    }
    return {
      ...cart.toObject(),
      items: populatedItems
    };
  }
}