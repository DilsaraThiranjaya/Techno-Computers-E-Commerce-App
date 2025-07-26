import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../slices/authSlice.ts';
import productsSlice from '../slices/productsSlice.ts';
import cartSlice from '../slices/cartSlice.ts';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productsSlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;