import { UserDto } from "@/interface/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AccountSliceState = {
  user: UserDto | null;
};

const initialState: AccountSliceState = {
  user: null,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserDto | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = accountSlice.actions;
export default accountSlice.reducer;
