import { ErrorCode, SuccessCode } from "@/utilties/alerts";
import { createSlice } from "@reduxjs/toolkit";

type AlertState = {
    success: boolean;
    successMessage?: SuccessCode;
    error: boolean;
    errorMessage?: ErrorCode;
}

const initialState: AlertState = {
    success: false,
    error: false
}

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setSuccess: (state, action) => {
            state.success = true;
            state.successMessage = action.payload;
        },
        resetSuccess: (state) => {
            state.success = false;
            state.successMessage = undefined;
        },
        setError: (state, action) => {
            state.error = true;
            state.errorMessage = action.payload;
        },
        resetError: (state) => {
            state.error = false;
            state.errorMessage = undefined;
        }
    }
});

export const { setSuccess, resetSuccess, setError, resetError } = alertSlice.actions;
export default alertSlice.reducer;
