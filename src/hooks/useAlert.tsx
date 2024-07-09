import { ErrorCode, getErrorMessage, SuccessCode, getSuccessMessage } from "@/utilties/alerts";
import { Alert, Snackbar } from "@mui/material";
import { useState, createContext } from "react";

export type AlertContextProps = {
    setError: (error: ErrorCode | null) => void;
    setSuccess: (success: SuccessCode | null) => void;
    error: ErrorCode | null;
    success: SuccessCode | null;
}

export const AlertContext = createContext<AlertContextProps | null>(null);

export default function useAlert() {
    const [error, setError] = useState<ErrorCode | null>(null);
    const [success, setSuccess] = useState<SuccessCode | null>(null);

    // Handle error alerts:
    const ErrorAlert = () => {
        if (!error) return null;

        const onClose = () => {
            setError(null);
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
    const SuccessAlert = () => {
        if (!success) return null;

        const onClose = () => {
            setSuccess(null);
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

    const AlertProvider = ({ children }: { children: React.ReactNode }) => {
        return (
            <AlertContext.Provider value={{ setError, setSuccess, error, success }}>
                {children}
            </AlertContext.Provider>
        )
    }

    return { AlertProvider, ErrorAlert, SuccessAlert }
}