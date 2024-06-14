import { CartType } from "@/interface/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AppSliceState = {
  cart: CartType | null;
  supplierContact: string[];
};

const initialState: AppSliceState = {
  cart: null,
  supplierContact: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartType | null>) => {
      state.cart = action.payload;
    },
    setSupplierContact: (state, action: PayloadAction<string[]>) => {
      state.supplierContact = action.payload;
    },
  },
});

export const { setCart, setSupplierContact } = appSlice.actions;
export default appSlice.reducer;
