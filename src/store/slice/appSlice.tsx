import { CartType } from "@/interface/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AppSliceState = {
  cart: CartType | null;
  checkout: any;
};

const initialState: AppSliceState = {
  cart: null,
  checkout: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartType | null>) => {
      state.cart = action.payload;
    },
    setCheckOut: (state, action: PayloadAction<any>) => {
      state.checkout = action.payload;
    },
  },
});

export const { setCart, setCheckOut } = appSlice.actions;
export default appSlice.reducer;
