import productsReducer from "./productsSlice.ts";
import cartReducer from "./cartSlice.ts";
import {combineReducers} from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer
});

export type RootState = ReturnType<typeof rootReducer>;