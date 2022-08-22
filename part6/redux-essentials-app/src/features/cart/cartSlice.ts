import { createSlice } from "@reduxjs/toolkit";

export interface cartState {
  cartItems: string[];
  amount: number;
  total: number;
  isLoading: boolean;
}

const initialState: cartState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export default cartSlice.reducer;
