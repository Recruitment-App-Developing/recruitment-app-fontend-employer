import { createSlice } from '@reduxjs/toolkit';
import { deleteToken, getToken, setToken } from '../utils/storageUtil';

const initialState = { isAuthenticated: !!getToken() };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            setToken(action.payload);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            deleteToken();
        },
    },
});

export const { login, logout } = authSlice.actions;
export const authSelector = (state) => state.auth;

export default authSlice.reducer;
