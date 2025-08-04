import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CartState } from '../../types';
import apiService from '../../services/api';
import toast from 'react-hot-toast';

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

// Helper function to safely extract cart from API response
const extractCart = (payload: any) => {
  if (payload.data) {
    return payload.data;
  }
  return payload;
};

// Async thunks
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getCart();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (data: { productId: string; quantity: number }, { rejectWithValue }) => {
    try {
      const response = await apiService.addToCart(data);
      toast.success('Product added to cart!');
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add to cart');
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ productId, quantity }: { productId: string; quantity: number }, { rejectWithValue }) => {
    try {
      const response = await apiService.updateCartItem(productId, { quantity });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update cart item');
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await apiService.removeFromCart(productId);
      toast.success('Product removed from cart!');
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove from cart');
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      await apiService.clearCart();
      toast.success('Cart cleared!');
      return null;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to clear cart');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = extractCart(action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add to Cart
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = extractCart(action.payload);
      })
      // Update Cart Item
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cart = extractCart(action.payload);
      })
      // Remove from Cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = extractCart(action.payload);
      })
      // Clear Cart
      .addCase(clearCart.fulfilled, (state) => {
        state.cart = null;
      });
  },
});

export const { clearError } = cartSlice.actions;
export default cartSlice.reducer;