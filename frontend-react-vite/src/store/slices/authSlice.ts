import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, User, LoginForm, RegisterForm } from '../../types';
import apiService from '../../services/api';
import toast from 'react-hot-toast';

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  isAuthenticated: !!localStorage.getItem('accessToken'),
  loading: false,
  error: null,
};

// Helper function to safely extract auth data from API response
const extractAuthData = (payload: any) => {
  if (payload.data) {
    return payload.data;
  }
  return payload;
};

// Helper function to safely extract user data from API response
const extractUser = (payload: any) => {
  if (payload.data) {
    return payload.data;
  }
  return payload;
};

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginForm, { rejectWithValue }) => {
    try {
      const response = await apiService.login(credentials);
      const authData = extractAuthData(response);
      
      if (authData.accessToken && authData.refreshToken) {
        localStorage.setItem('accessToken', authData.accessToken);
        localStorage.setItem('refreshToken', authData.refreshToken);
      }
      
      toast.success('Login successful!');
      return authData;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterForm, { rejectWithValue }) => {
    try {
      const response = await apiService.register(userData);
      const authData = extractAuthData(response);
      
      if (authData.accessToken && authData.refreshToken) {
        localStorage.setItem('accessToken', authData.accessToken);
        localStorage.setItem('refreshToken', authData.refreshToken);
      }
      
      toast.success('Registration successful!');
      return authData;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await apiService.logout();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      toast.success('Logged out successfully!');
    } catch (error: any) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

export const getProfile = createAsyncThunk(
  'auth/profile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getProfile();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (userData: Partial<User>, { rejectWithValue }) => {
    try {
      const response = await apiService.updateProfile(userData);
      toast.success('Profile updated successfully!');
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (passwordData: any, { rejectWithValue }) => {
    try {
      await apiService.changePassword(passwordData);
      toast.success('Password changed successfully!');
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to change password');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const authData = action.payload;
        state.user = authData.user;
        state.token = authData.accessToken;
        state.refreshToken = authData.refreshToken;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        const authData = action.payload;
        state.user = authData.user;
        state.token = authData.accessToken;
        state.refreshToken = authData.refreshToken;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })
      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = extractUser(action.payload);
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Profile
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = extractUser(action.payload);
      })
      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearAuth } = authSlice.actions;
export default authSlice.reducer;