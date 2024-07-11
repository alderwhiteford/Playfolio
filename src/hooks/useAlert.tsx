import { resetError, resetSuccess } from "@/store/alertSlice";
import { useStateDispatch, useStateSelector } from "@/store/store";
import { ErrorCode, getErrorMessage, SuccessCode, getSuccessMessage } from "@/utilties/alerts";
import { Alert, Snackbar } from "@mui/material";


export default function useAlert() {
    const { success, successMessage, error, errorMessage } = useStateSelector(state => state.alert)
    const dispatch = useStateDispatch();

    // Handle error alerts:
    const ErrorAlert = (error: ErrorCode) => {
        const onClose = () => {
            dispatch(resetError());
        }

        return (
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
                open={Boolean(error)} 
                autoHideDuration={4000} 
                onClose={onClose}
            >
                <Alert severity="error" onClose={onClose}>
                    {getErrorMessage(error)}
                </Alert>
            </Snackbar>
        )
    }

    // Handle success alerts:
    const SuccessAlert = (success: SuccessCode) => {
        const onClose = () => {
            dispatch(resetSuccess());
        }

        return (
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
                open={Boolean(success)} 
                autoHideDuration={4000} 
                onClose={onClose}
            >
                <Alert severity="success" onClose={onClose}>
                    {getSuccessMessage(success)}
                </Alert>
            </Snackbar>
        )
    }

    const AlertProvider = () => {
        return (
            <div>
                {error && ErrorAlert(errorMessage as ErrorCode)}
                {success && SuccessAlert(successMessage as SuccessCode)}
            </div>
        )
    }

    return { AlertProvider }
}