import { DashboardSection } from "@/pages/dashboard";
import { Button } from "@mui/material";

type NavbarProps = {
    sections: DashboardSection[]
    sectionIcons: { [key: string]: any }
    selectedSection: string;
    setSelectedSection: (section: DashboardSection) => void;
    signOut: () => void;
}

export default function Navbar({ sections, selectedSection, sectionIcons, setSelectedSection, signOut }: NavbarProps) {
    return (
        <div className='w-screen p-8 bg-black text-white flex flex-row justify-between items-center fixed'>
            <div className='flex flex-row gap-12'>
                {sections.map(section => {
                    const Icon = sectionIcons[section]

                    return (
                        <div 
                            key={section}
                            className={`${selectedSection === section ? 'text-[#77a4ed]' : 'text-gray-400'} flex flex-row gap-2 items-center cursor-pointer transition-all ease-in-out hover:text-white`}
                            onClick={() => setSelectedSection(section)}
                        >
                            <Icon />
                            <h1 className={`${selectedSection === section ? 'text-white' : 'text-gray-400'} hover:text-white transition-all ease-in-out`}>
                                {section}
                            </h1>
                        </div>
                    )
                })}
            </div>
            <Button 
                className='border-[#77a4ed] text-[#77a4ed] normal-case hover:bg-[#77a4ed] hover:bg-opacity-30 hover:text-white' 
                variant='outlined' 
                type='button'
                onClick={signOut}
            >
                Sign Out
            </Button>
        </div>
    )
}