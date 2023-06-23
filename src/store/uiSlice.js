import { createSlice } from "@reduxjs/toolkit";

const visbilityState = {cartIsVisible:false}

const uiSlice = createSlice({
    name: "cartUi",
    initialState: {cartIsVisible:false},
    reducers:{
        toggle(state) {
            state.cartIsVisible = !state.cartIsVisible;
        }
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice;