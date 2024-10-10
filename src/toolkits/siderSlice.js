import { createSlice } from '@reduxjs/toolkit';

const initialState = { isOpen: true };

const siderSlice = createSlice({
    name: 'sider',
    initialState,
    reducers: {
        toggleSider: (state) => {
            state.isOpen = !state.isOpen;
        },
    },
});

export const { toggleSider } = siderSlice.actions;
export const siderSelector = (state) => state.sider;

export default siderSlice.reducer;
