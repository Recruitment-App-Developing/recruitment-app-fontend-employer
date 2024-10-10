import { configureStore } from '@reduxjs/toolkit';
import siderReducer from './siderSlice';

export const store = configureStore({
    reducer: {
        sider: siderReducer,
    },
});
