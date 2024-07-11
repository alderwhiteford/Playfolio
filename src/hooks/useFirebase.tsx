import FirebaseController from "@/firebase/controller";
import { NextRouter } from "next/router";
import { createContext, useContext } from "react";

export const FirebaseContext = createContext<FirebaseController | null>(null);

export default function useFirebase() {
    const firebase = new FirebaseController();

    const FirebaseProvider = ({ children }: { children: React.ReactNode}) => {
        return (
            <FirebaseContext.Provider value={firebase}>
                {children}
            </FirebaseContext.Provider>
        )
    }

    return { FirebaseProvider, auth: firebase.auth }
}