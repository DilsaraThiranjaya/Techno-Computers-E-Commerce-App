import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductState, Product } from '../../types';
import { ProductsResponse, FeaturedProductsResponse, ApiResponse } from '../../types/api';
import apiService from '../../services/api';
import toast from 'react-hot-toast';

const initialState: ProductState = {
  products: [],
  featuredProducts: [],
  currentProduct: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },
  filters: {},
};

// Helper function to safely extract products from API response
const extractProducts = (payload: any): Product[] => {
  // Handle different response structures
  if (Array.isArray(payload)) {
    return payload;
  }
  if (payload.data) {
    if (Array.isArray(payload.data)) {
      return payload.data;
    }
    if (payload.data.products && Array.isArray(payload.data.products)) {
      return payload.data.products;
    }
    if (payload.data.data && Array.isArray(payload.data.data)) {
      return payload.data.data;
    }
  }
  if (payload.products && Array.isArray(payload.products)) {
    return payload.products;
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

// Async thunks
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (params: any = {}, { rejectWithValue }) => {
      try {
        // Convert sortBy and sortOrder to sort and order for API compatibility
        if (params.sortBy && params.sortOrder) {
          params.sort = params.sortBy;
          params.order = params.sortOrder;
          delete params.sortBy;
          delete params.sortOrder;
        }
        const response = await apiService.getProducts(params);
        return response;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
      }
    }
);

export const fetchFeaturedProducts = createAsyncThunk(
    'products/fetchFeaturedProducts',
    async (limit: number = 8, { rejectWithValue }) => {
      try {
        const response = await apiService.getFeaturedProducts(limit);
        return response;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch featured products');
      }
    }
);

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id: string, { rejectWithValue }) => {
      try {
        const response = await apiService.getProductById(id);
        return response;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
      }
    }
);

export const searchProducts = createAsyncThunk(
    'products/searchProducts',
    async (params: any, { rejectWithValue }) => {
      try {
        // Convert sortBy and sortOrder to sort and order for API compatibility
        if (params.sortBy && params.sortOrder) {
          params.sort = params.sortBy;
          params.order = params.sortOrder;
          delete params.sortBy;
          delete params.sortOrder;
        }
        const response = await apiService.searchProducts(params);
        return response;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to search products');
      }
    }
);

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (productData: any, { rejectWithValue }) => {
      try {
        const response = await apiService.createProduct(productData);
        toast.success('Product created successfully!');
        return response;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to create product');
      }
    }
);

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
      try {
        const response = await apiService.updateProduct(id, data);
        toast.success('Product updated successfully!');
        return response;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to update product');
      }
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id: string, { rejectWithValue }) => {
      try {
        await apiService.deleteProduct(id);
        toast.success('Product deleted successfully!');
        return id;
      } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
      }
    }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {};
    },
  },
  extraReducers: (builder) => {
    builder
        // Fetch Products
        .addCase(fetchProducts.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.loading = false;
          state.products = extractProducts(action.payload);
          
          const pagination = extractPagination(action.payload);
          if (pagination) {
            state.pagination = {
              currentPage: pagination.currentPage || 1,
              totalPages: pagination.totalPages || 1,
              totalItems: pagination.totalItems || 0,
              hasNextPage: pagination.hasNextPage || false,
              hasPrevPage: pagination.hasPrevPage || false,
            };
          }
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          state.products = [];
        })
        // Fetch Featured Products
        .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
          state.featuredProducts = extractProducts(action.payload);
        })
        .addCase(fetchFeaturedProducts.rejected, (state) => {
          state.featuredProducts = [];
        })
        // Fetch Product by ID
        .addCase(fetchProductById.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchProductById.fulfilled, (state, action) => {
          state.loading = false;
          // Handle single product response
          if (action.payload.data) {
            state.currentProduct = action.payload.data;
          } else {
            state.currentProduct = action.payload;
          }
        })
        .addCase(fetchProductById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Search Products
        .addCase(searchProducts.fulfilled, (state, action) => {
          state.products = extractProducts(action.payload);
          
          const pagination = extractPagination(action.payload);
          if (pagination) {
            state.pagination = {
              currentPage: pagination.currentPage || 1,
              totalPages: pagination.totalPages || 1,
              totalItems: pagination.totalItems || 0,
              hasNextPage: pagination.hasNextPage || false,
              hasPrevPage: pagination.hasPrevPage || false,
            };
          }
        })
        .addCase(searchProducts.rejected, (state) => {
          state.products = [];
        })
        // Create Product
        .addCase(createProduct.fulfilled, (state, action) => {
          const newProduct = action.payload.data || action.payload;
          if (newProduct) {
            state.products.unshift(newProduct);
          }
        })
        // Update Product
        .addCase(updateProduct.fulfilled, (state, action) => {
          const updatedProduct = action.payload.data || action.payload;
          if (updatedProduct) {
            const index = state.products.findIndex(p => p._id === updatedProduct._id);
            if (index !== -1) {
              state.products[index] = updatedProduct;
            }
            if (state.currentProduct?._id === updatedProduct._id) {
              state.currentProduct = updatedProduct;
            }
          }
        })
        // Delete Product
        .addCase(deleteProduct.fulfilled, (state, action) => {
          state.products = state.products.filter(p => p._id !== action.payload);
        });
  },
});

export const { clearError, clearCurrentProduct, setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;