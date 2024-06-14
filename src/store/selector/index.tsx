import { RootState } from "../reducers";

export const userSelector = (state: RootState) => state.account.user;
export const cartSelector = (state: RootState) => state.app.cart;
export const supplierContactSelector = (state: RootState) => state.app.supplierContact;