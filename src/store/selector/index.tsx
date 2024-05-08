import { RootState } from "../reducers";

export const userSelector = (state: RootState) => state.account.user;