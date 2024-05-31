import { CartType } from "@/interface/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AppSliceState = {
  cart: CartType | null;
};

const initialState: AppSliceState = {
  cart: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartType | null>) => {
      state.cart = action.payload;
    },
  },
});

export const { setCart } = appSlice.actions;
export default appSlice.reducer;
