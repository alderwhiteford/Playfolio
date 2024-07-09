'use client'

import useAlert from "@/hooks/useAlert";
import useFirebase from "@/hooks/useFirebase";
import { ThemeProvider, createTheme } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { FirebaseProvider, auth } = useFirebase();
    const { AlertProvider, ErrorAlert, SuccessAlert } = useAlert();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (router.pathname === '/') {
                return;
            }
            if (!user) {
                router.push('/dashboard/sign-in')
            } else {
                router.push('/dashboard')
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <FirebaseProvider>
                <AlertProvider>
                    <ErrorAlert />
                    <SuccessAlert />
                    {children}
                </AlertProvider>
            </FirebaseProvider>
        </ThemeProvider>
    )
}