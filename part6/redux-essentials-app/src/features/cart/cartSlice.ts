import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const url = `https://course-api.com/react-useReducer-cart-project`;

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_arg, thunkAPI) => {
    try {
      const res = await axios(url);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

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
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, action: PayloadAction<string>) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (cartItem) cartItem.amount += 1;
    },
    decrease: (state, action: PayloadAction<string>) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (cartItem) cartItem.amount -= 1;
    },
    calcTotal: (state) => {
      let amount: number = 0;
      let total: number = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * +item.price;
      });
      state.amount = amount;
      if (!isNaN(total)) state.total = +total.toFixed(2);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getCartItems.fulfilled,
      (state, action: PayloadAction<cartItem[]>) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      }
    );
    builder.addCase(getCartItems.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { clearCart, removeItem, increase, decrease, calcTotal } =
  cartSlice.actions;

export default cartSlice.reducer;
