export interface cartState {
    cartItems: string[];
    amount: number;
    total: number;
    isLoading: boolean;
}
export declare const cartSlice: import("@reduxjs/toolkit").Slice<cartState, {}, "cart">;
declare const _default: import("redux").Reducer<cartState, import("redux").AnyAction>;
export default _default;
