import { createSlice } from "@reduxjs/toolkit";
var initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true
};
export var cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {}
});
export default cartSlice.reducer;
