import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Customer {
  id: string;
  name: string;
  food: string[];
}

interface AddFood {
  id: string;
  food: string;
}

interface CustomerState {
  value: Customer[];
}

const initialState: CustomerState = {
  value: [],
};

export const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.value.push(action.payload);
    },
    removeCustomer: (state, action: PayloadAction<number>) => {
      state.value.splice(action.payload, 1);
    },
    addFood: (state, action: PayloadAction<AddFood>) => {
      state.value.forEach((customer) => {
        if (customer.id === action.payload.id)
          customer.food.push(action.payload.food);
      });
    },
  },
});

export const { addCustomer, removeCustomer, addFood } = customerSlice.actions;

export default customerSlice.reducer;
