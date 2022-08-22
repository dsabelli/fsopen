import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

interface cartItem {
  id: string;
  title: string;
  price: string;
  img: string;
  amount: number;
}

export interface cartState {
  cartItems: cartItem[];
  amount: number;
  total: number;
  isLoading: boolean;
}

const initialState: cartState = {
  cartItems: cartItems,
  amount: 4,
  total: 0,
  isLoading: true,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export default cartSlice.reducer;
