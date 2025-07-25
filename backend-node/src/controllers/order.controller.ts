import { Request, Response } from 'express';
import { Order } from '../model/Order';
import { Cart } from '../model/Cart';
import { Product } from '../model/Product';
import { ResponseUtil } from '../utils/response';
import { ErrorHandler } from '../middleware/errorHandler';
import { AuthenticatedRequest } from '../types';
import { CreateOrderDto, UpdateOrderStatusDto } from '../dto';
import { EmailUtil } from '../utils/email';
import { User } from '../model/User';

export class OrderController {
  static createOrder = ErrorHandler.asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.userId!;
    const orderData: CreateOrderDto = req.body;

    // Validate order items
    if (!orderData.items || orderData.items.length === 0) {
      return ResponseUtil.validation(res, 'Order items are required');
    }

    let totalAmount = 0;
    const orderItems = [];

    // Validate each item and calculate total
    for (const item of orderData.items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return ResponseUtil.validation(res, `Product with ID ${item.productId} not found`);
      }

      if (product.stock < item.quantity) {
        return ResponseUtil.validation(res, `Insufficient stock for product: ${product.name}`);
      }

      const itemPrice = product.discountPrice || product.price;
      const itemTotal = itemPrice * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        orderId: '', // Will be set after order creation
        productId: item.productId,
        quantity: item.quantity,
        price: itemPrice,
        totalPrice: itemTotal
      });

      // Update product stock
      product.stock -= item.quantity;
      await product.save();
    }

    // Create order
    const order = new Order({
      userId,
      items: orderItems,
      totalAmount,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      notes: orderData.notes
    });

    // Set orderId for items
    order.items.forEach(item => {
      item.orderId = order._id.toString();
    });

    await order.save();

    // Clear user's cart
    await Cart.findOneAndUpdate(
      { userId },
      { items: [], totalAmount: 0 }
    );

    // Populate order details
    const populatedOrder = await OrderController.getPopulatedOrder(order._id.toString());

    // Send order confirmation email
    try {
      const user = await User.findById(userId);
      if (user && user.email) {
        await EmailUtil.sendOrderConfirmation(
          user.email,
          order.orderNumber,
          order.totalAmount
        );
      }
    } catch (error) {
      console.error('Failed to send order confirmation email:', error);
    }

    return ResponseUtil.success(res, 'Order created successfully', populatedOrder, 201);
  });

  static getOrders = ErrorHandler.asyncHandler(async (req: Request, res: Response) => {
    const {
      page = 1,
      limit = 10,
      sort = 'createdAt',
      order = 'desc',
      search,
      orderStatus,
      paymentStatus,
      userId
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const filter: any = {};

    if (search) {
      filter.orderNumber = { $regex: search, $options: 'i' };
    }

    if (orderStatus) {
      filter.orderStatus = orderStatus;
    }

    if (paymentStatus) {
      filter.paymentStatus = paymentStatus;
    }

    if (userId) {
      filter.userId = userId;
    }

    const sortObj: any = {};
    sortObj[sort as string] = order === 'desc' ? -1 : 1;

    const orders = await Order.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(Number(limit));

    // Populate order details
    const populatedOrders = [];
    for (const orderDoc of orders) {
      const populatedOrder = await OrderController.getPopulatedOrder(orderDoc._id.toString());
      populatedOrders.push(populatedOrder);
    }
    const total = await Order.countDocuments(filter);
    const totalPages = Math.ceil(total / Number(limit));

    return ResponseUtil.success(res, 'Orders retrieved successfully', {
      orders: populatedOrders,
      pagination: {
        currentPage: Number(page),
        totalPages,
        totalItems: total,
        itemsPerPage: Number(limit)
      }
    });
  });

  static getOrderById = ErrorHandler.asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const order = await OrderController.getPopulatedOrder(id);

    if (!order) {
      return ResponseUtil.notFound(res, 'Order not found');
    }

    return ResponseUtil.success(res, 'Order retrieved successfully', order);
  });

  static getUserOrders = ErrorHandler.asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.userId!;
    const {
      page = 1,
      limit = 10,
      sort = 'createdAt',
      order = 'desc',
      orderStatus
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const filter: any = { userId };

    if (orderStatus) {
      filter.orderStatus = orderStatus;
    }

    const sortObj: any = {};
    sortObj[sort as string] = order === 'desc' ? -1 : 1;

    const orders = await Order.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(Number(limit));

    // Populate order details
    const populatedOrders = [];
    for (const orderDoc of orders) {
      const populatedOrder = await OrderController.getPopulatedOrder(orderDoc._id.toString());
      populatedOrders.push(populatedOrder);
    }
    const total = await Order.countDocuments(filter);
    const totalPages = Math.ceil(total / Number(limit));

    return ResponseUtil.success(res, 'User orders retrieved successfully', {
      orders: populatedOrders,
      pagination: {
        currentPage: Number(page),
        totalPages,
        totalItems: total,
        itemsPerPage: Number(limit)
      }
    });
  });

  static updateOrderStatus = ErrorHandler.asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const updateData: UpdateOrderStatusDto = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return ResponseUtil.notFound(res, 'Order not found');
    }

    if (updateData.orderStatus) {
      order.orderStatus = updateData.orderStatus;
    }

    if (updateData.paymentStatus) {
      order.paymentStatus = updateData.paymentStatus;
    }

    await order.save();

    const updatedOrder = await OrderController.getPopulatedOrder(order._id.toString());

    return ResponseUtil.success(res, 'Order status updated successfully', updatedOrder);
  });

  static getOrderStats = ErrorHandler.asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ orderStatus: 'pending' });
    const confirmedOrders = await Order.countDocuments({ orderStatus: 'confirmed' });
    const shippedOrders = await Order.countDocuments({ orderStatus: 'shipped' });
    const deliveredOrders = await Order.countDocuments({ orderStatus: 'delivered' });
    const cancelledOrders = await Order.countDocuments({ orderStatus: 'cancelled' });

    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const monthlyRevenue = await Order.aggregate([
      {
        $match: {
          paymentStatus: 'paid',
          createdAt: { $gte: new Date(new Date().getFullYear(), 0, 1) }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          revenue: { $sum: '$totalAmount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    return ResponseUtil.success(res, 'Order statistics retrieved successfully', {
      totalOrders,
      pendingOrders,
      confirmedOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      monthlyRevenue
    });
  });

  private static async getPopulatedOrder(orderId: string) {
    const order = await Order.findById(orderId);
    if (!order) return null;

    const user = await User.findById(order.userId);
    const populatedItems = [];

    for (const item of order.items) {
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
            brand: product.brand
          }
        });
      }
    }
    return {
      ...order.toObject(),
      user: user ? {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone
      } : null,
      items: populatedItems
    };
  }
}