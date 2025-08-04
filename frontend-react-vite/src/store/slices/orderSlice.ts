import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { OrderState } from '../../types';
import apiService from '../../services/api';
import toast from 'react-hot-toast';

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  },
};

// Helper function to safely extract orders from API response
const extractOrders = (payload: any) => {
  if (Array.isArray(payload)) {
    return payload;
  }
  if (payload.data) {
    if (Array.isArray(payload.data)) {
      return payload.data;
    }
    if (payload.data.orders && Array.isArray(payload.data.orders)) {
      return payload.data.orders;
    }
  }
  if (payload.orders && Array.isArray(payload.orders)) {
    return payload.orders;
  }
  return [];
};

// Helper function to safely extract pagination from API response
const extractPagination = (payload: any) => {
  if (payload.pagination) {
    return payload.pagination;
  }
  if (payload.data && payload.data.pagination) {
    return payload.data.pagination;
  }
  return null;
};

// Helper function to safely extract single order from API response
const extractOrder = (payload: any) => {
  if (payload.data) {
    return payload.data;
  }
  return payload;
};

// Async thunks
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData: any, { rejectWithValue }) => {
    try {
      const response = await apiService.createOrder(orderData);
      toast.success('Order placed successfully!');
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create order');
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (params: any = {}, { rejectWithValue }) => {
    try {
      const response = await apiService.getUserOrders(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiService.getOrderById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch order');
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAllOrders',
  async (params: any = {}, { rejectWithValue }) => {
    try {
      const response = await apiService.getAllOrders(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await apiService.updateOrderStatus(id, data);
      toast.success('Order status updated successfully!');
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update order status');
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        const newOrder = extractOrder(action.payload);
        if (newOrder) {
          state.currentOrder = newOrder;
          state.orders.unshift(newOrder);
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch User Orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = extractOrders(action.payload);
        
        const pagination = extractPagination(action.payload);
        if (pagination) {
          state.pagination = {
            currentPage: pagination.currentPage || 1,
            totalPages: pagination.totalPages || 1,
            totalItems: pagination.totalItems || 0,
          };
        }
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.orders = [];
      })
      // Fetch Order by ID
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.currentOrder = extractOrder(action.payload);
      })
      // Fetch All Orders (Admin)
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.orders = extractOrders(action.payload);
        
        const pagination = extractPagination(action.payload);
        if (pagination) {
          state.pagination = {
            currentPage: pagination.currentPage || 1,
            totalPages: pagination.totalPages || 1,
            totalItems: pagination.totalItems || 0,
          };
        }
      })
      .addCase(fetchAllOrders.rejected, (state) => {
        state.orders = [];
      })
      // Update Order Status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = extractOrder(action.payload);
        if (updatedOrder) {
          const index = state.orders.findIndex(o => o._id === updatedOrder._id);
          if (index !== -1) {
            state.orders[index] = updatedOrder;
          }
          if (state.currentOrder?._id === updatedOrder._id) {
            state.currentOrder = updatedOrder;
          }
        }
      });
  },
});

export const { clearError, clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;