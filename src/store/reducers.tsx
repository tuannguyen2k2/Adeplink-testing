import { combineReducers } from 'redux';
import accountReducer from './slice/accountSlice';

export const rootReducer = combineReducers({
  account: accountReducer,
});

export type RootState = ReturnType<typeof rootReducer>;