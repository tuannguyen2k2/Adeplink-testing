import { combineReducers } from "redux";
import accountReducer from "./slice/accountSlice";
import appReducer from "./slice/appSlice";
export const rootReducer = combineReducers({
  account: accountReducer,
  app: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
