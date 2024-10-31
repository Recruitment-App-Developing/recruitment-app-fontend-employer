import { configureStore } from '@reduxjs/toolkit';
import siderReducer from './siderSlice';
import authReducer from './authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        sider: siderReducer,
    },
});
