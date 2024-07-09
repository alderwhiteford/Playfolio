'use client'

import Navbar from "@/components/Navbar/Navbar";
import FirebaseController from "@/firebase/controller";
import { AlertContext, AlertContextProps } from "@/hooks/useAlert";
import { FirebaseContext } from "@/hooks/useFirebase";
import { useContext, useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import SettingsIcon from '@mui/icons-material/Settings';
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import About from "@/sections/dashboard/About";
import Work from "@/sections/dashboard/Work";
import Projects from "@/sections/dashboard/Projects";

export type DashboardSection = 'About' | 'Work' | 'Projects'

export default function Dashboard() {
    const sections: DashboardSection[] = ['About', 'Work', 'Projects']
    const sectionIcons: Record<DashboardSection, OverridableComponent<SvgIconTypeMap<{}, "svg">>> = { 
        'About': PersonIcon,
        'Work': WorkIcon,
        'Projects': SettingsIcon 
    }
    const sectionComponents: Record<DashboardSection, React.ReactNode> = {
        'About': <About />,
        'Work': <Work />,
        'Projects': <Projects />
    }

    const [selectedSection, setSelectedSection] = useState<DashboardSection>('About')
    const firebaseInstance = useContext(FirebaseContext) as FirebaseController;
    const alertInstance = useContext(AlertContext) as AlertContextProps;

    const handleSignOut = () => {
        try {
            firebaseInstance.signOut();
        } catch {
            alertInstance.setError('failedToSignOut');
        }
    }

    return (
        <div className='h-screen w-screen'>
            <Navbar 
                sections={sections}
                sectionIcons={sectionIcons}
                selectedSection={selectedSection}
                setSelectedSection={setSelectedSection}
                signOut={handleSignOut}
            />
            {sectionComponents[selectedSection]}
        </div>
    )
}