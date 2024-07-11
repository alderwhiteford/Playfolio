'use client'

import Navbar from "@/components/dashboard/Navbar/Navbar";
import FirebaseController from "@/firebase/controller";
import { FirebaseContext } from "@/hooks/useFirebase";
import { use, useContext, useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import Home from "@/sections/dashboard/Home";
import { useStateDispatch } from "@/store/store";
import { setError } from "@/store/alertSlice";
import useAlert from "@/hooks/useAlert";

export type DashboardSection = 'Home'

export default function Dashboard() {
    const sections: DashboardSection[] = ['Home']
    const sectionIcons: Record<DashboardSection, OverridableComponent<SvgIconTypeMap<{}, "svg">>> = { 
        'Home': PersonIcon,
    }
    const sectionComponents: Record<DashboardSection, React.ReactNode> = {
        'Home': <Home />,
    }

    const [selectedSection, setSelectedSection] = useState<DashboardSection>('Home')
    const firebaseInstance = useContext(FirebaseContext) as FirebaseController;

    const dispatch = useStateDispatch();
    const { AlertProvider } = useAlert();

    const handleSignOut = () => {
        try {
            firebaseInstance.signOut();
        } catch {
            dispatch(setError('failedToSignOut'))
        }
    }

    return (
        <>
            <AlertProvider />
            <div className='h-screen w-screen flex flex-col'>
                <Navbar 
                    sections={sections}
                    sectionIcons={sectionIcons}
                    selectedSection={selectedSection}
                    setSelectedSection={setSelectedSection}
                    signOut={handleSignOut}
                />
                {sectionComponents[selectedSection]}
            </div>
        </>
    )
}