import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types';
import apiService from '../../services/api';
import toast from 'react-hot-toast';

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  },
};

// Helper function to safely extract users from API response
const extractUsers = (payload: any) => {
  if (Array.isArray(payload)) {
    return payload;
  }
  if (payload.data) {
    if (Array.isArray(payload.data)) {
      return payload.data;
    }
    if (payload.data.users && Array.isArray(payload.data.users)) {
      return payload.data.users;
    }
  }
  if (payload.users && Array.isArray(payload.users)) {
    return payload.users;
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
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (params: any = {}, { rejectWithValue }) => {
    try {
      const response = await apiService.getUsers(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
    }
  }
);

export const updateUserStatus = createAsyncThunk(
  'users/updateUserStatus',
  async ({ id, status }: { id: string; status: string }, { rejectWithValue }) => {
    try {
      await apiService.updateUserStatus(id, { status });
      toast.success('User status updated successfully!');
      return { id, status };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update user status');
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = extractUsers(action.payload);
        
        const pagination = extractPagination(action.payload);
        if (pagination) {
          state.pagination = {
            currentPage: pagination.currentPage || 1,
            totalPages: pagination.totalPages || 1,
            totalItems: pagination.totalItems || 0,
          };
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.users = [];
      })
      // Update User Status
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        const user = state.users.find(u => u._id === id);
        if (user) {
          user.status = status as 'active' | 'inactive';
        }
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;