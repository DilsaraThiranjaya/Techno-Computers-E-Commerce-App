import { Request, Response } from 'express';
import { User } from '../model/User';
import { ResponseUtil } from '../utils/response';
import { ErrorHandler } from '../middleware/errorHandler';
import { AuthenticatedRequest } from '../types';
import { UpdateUserStatusDto } from '../dto';

export class UserController {
  static getAllUsers = ErrorHandler.asyncHandler(async (req: Request, res: Response) => {
    const {
      page = 1,
      limit = 10,
      sort = 'createdAt',
      order = 'desc',
      search,
      role,
      status = 'active'
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const filter: any = {};

    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (role) {
      filter.role = role;
    }

    if (status) {
      filter.status = status;
    }

    const sortObj: any = {};
    sortObj[sort as string] = order === 'desc' ? -1 : 1;

    const users = await User.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(Number(limit));

    const total = await User.countDocuments(filter);
    const totalPages = Math.ceil(total / Number(limit));

    return ResponseUtil.success(res, 'Users retrieved successfully', {
      users,
      pagination: {
        currentPage: Number(page),
        totalPages,
        totalItems: total,
        itemsPerPage: Number(limit)
      }
    });
  });

  static getUserById = ErrorHandler.asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return ResponseUtil.notFound(res, 'User not found');
    }

    return ResponseUtil.success(res, 'User retrieved successfully', user);
  });

  static updateUserStatus = ErrorHandler.asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const { status }: UpdateUserStatusDto = req.body;

    if (!['active', 'inactive'].includes(status)) {
      return ResponseUtil.validation(res, 'Invalid status. Must be active or inactive');
    }

    const user = await User.findById(id);

    if (!user) {
      return ResponseUtil.notFound(res, 'User not found');
    }

    user.status = status;
    await user.save();

    return ResponseUtil.success(res, 'User status updated successfully', user);
  });

  static getUserStats = ErrorHandler.asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: 'active' });
    const inactiveUsers = await User.countDocuments({ status: 'inactive' });
    const adminUsers = await User.countDocuments({ role: 'admin' });
    const customerUsers = await User.countDocuments({ role: 'customer' });

    const usersByMonth = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);

    return ResponseUtil.success(res, 'User statistics retrieved successfully', {
      totalUsers,
      activeUsers,
      inactiveUsers,
      adminUsers,
      customerUsers,
      usersByMonth
    });
  });
}