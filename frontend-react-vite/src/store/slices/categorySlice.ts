import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CategoryState } from '../../types';
import apiService from '../../services/api';
import toast from 'react-hot-toast';

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

// Helper function to safely extract categories from API response
const extractCategories = (payload: any) => {
  if (Array.isArray(payload)) {
    return payload;
  }
  if (payload.data) {
    if (Array.isArray(payload.data)) {
      return payload.data;
    }
    if (payload.data.categories && Array.isArray(payload.data.categories)) {
      return payload.data.categories;
    }
  }
  if (payload.categories && Array.isArray(payload.categories)) {
    return payload.categories;
  }
  return [];
};

// Helper function to safely extract single category from API response
const extractCategory = (payload: any) => {
  if (payload.data) {
    return payload.data;
  }
  return payload;
};

// Async thunks
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (params: any = {}, { rejectWithValue }) => {
    try {
      const response = await apiService.getCategories(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
    }
  }
);

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (categoryData: any, { rejectWithValue }) => {
    try {
      const response = await apiService.createCategory(categoryData);
      toast.success('Category created successfully!');
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create category');
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const response = await apiService.updateCategory(id, data);
      toast.success('Category updated successfully!');
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update category');
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id: string, { rejectWithValue }) => {
    try {
      await apiService.deleteCategory(id);
      toast.success('Category deleted successfully!');
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete category');
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = extractCategories(action.payload);
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.categories = [];
      })
      // Create Category
      .addCase(createCategory.fulfilled, (state, action) => {
        const newCategory = extractCategory(action.payload);
        if (newCategory) {
          state.categories.unshift(newCategory);
        }
      })
      // Update Category
      .addCase(updateCategory.fulfilled, (state, action) => {
        const updatedCategory = extractCategory(action.payload);
        if (updatedCategory) {
          const index = state.categories.findIndex(c => c._id === updatedCategory._id);
          if (index !== -1) {
            state.categories[index] = updatedCategory;
          }
        }
      })
      // Delete Category
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(c => c._id !== action.payload);
      });
  },
});

export const { clearError } = categorySlice.actions;
export default categorySlice.reducer;