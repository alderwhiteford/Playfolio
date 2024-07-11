'use client'

import useFirebase from "@/hooks/useFirebase";
import { store } from "@/store/store";
import { ThemeProvider, createTheme } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider } from "react-redux";

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { FirebaseProvider, auth } = useFirebase();

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
                <Provider store={store}>
                    {children}
                </Provider>
            </FirebaseProvider>
        </ThemeProvider>
    )
}