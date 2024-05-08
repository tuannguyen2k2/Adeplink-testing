import { createSlice } from '@reduxjs/toolkit';
export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        user: null,
    },
    reducers: {
        login: (state, action) => {},
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state, action) => {
            state.user = null;
        },
    },
});

export const { login, setUser, logout } = accountSlice.actions;
export default accountSlice.reducer;
