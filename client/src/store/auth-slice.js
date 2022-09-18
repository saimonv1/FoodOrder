import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    isLoggedIn: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice;