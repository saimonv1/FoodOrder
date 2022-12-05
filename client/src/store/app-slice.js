import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    url: "https://goldfish-app-ibq9e.ondigitalocean.app/api"
};

const appSlice = createSlice({
    name: 'app',
    initialState: initialState
});

export const appActions = appSlice.actions;
export default appSlice;