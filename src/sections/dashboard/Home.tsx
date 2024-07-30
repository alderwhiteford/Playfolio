import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useState } from "react"
import PersonIcon from '@mui/icons-material/Person';
import BoltIcon from '@mui/icons-material/Bolt';
import ConstructionIcon from '@mui/icons-material/Construction';
import WorkIcon from '@mui/icons-material/Work';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import SectionButton from "@/components/dashboard/SectionButton/SectionButton";
import AboutModal from "@/components/dashboard/SectionModal/AboutModal";
import SkillsModal from "@/components/dashboard/SectionModal/SkillsModal";
import WorkModal from "@/components/dashboard/SectionModal/WorkModal";
import ProjectModal from "@/components/dashboard/SectionModal/ProjectModal";
import ContactModal from "@/components/dashboard/SectionModal/ContactModal";

type HomeSections = 'About' | 'Skills' | 'Work' | 'Projects' | 'Contact'

export default function Home() {
    const [selectedSection, setSelectedSection] = useState<HomeSections | undefined>()

    const sections: HomeSections[] = ['About', 'Skills', 'Work', 'Projects', 'Contact'];
    const sectionIcons: Record<HomeSections, OverridableComponent<SvgIconTypeMap<{}, "svg">>> = {
        'About': PersonIcon,
        'Skills': BoltIcon,
        'Work': WorkIcon,
        'Projects': ConstructionIcon,
        'Contact': LocalPhoneIcon,
    }
    const sectionModals: Record<HomeSections, React.ReactNode> = {
        'About': <AboutModal key='about' open={selectedSection === 'About'} handleClose={() => setSelectedSection(undefined)} />,
        'Skills':  <SkillsModal key='skills' open={selectedSection === 'Skills'} handleClose={() => setSelectedSection(undefined)} />,
        'Work': <WorkModal key='work' open={selectedSection === 'Work'} handleClose={() => setSelectedSection(undefined)} />,
        'Projects': <ProjectModal key='projects' open={selectedSection === 'Projects'} handleClose={() => setSelectedSection(undefined)} />,
        'Contact': <ContactModal key='contact' open={selectedSection === 'Contact'} handleClose={() => setSelectedSection(undefined)} />,
    }

    return (
        <div className="flex-grow bg-black flex flex-col gap-12 items-center">
            <div className='flex flex-col text-center'>
                <h1 className='text-white font-medium text-3xl'>Home Portfolio Management</h1>
                <h3 className='text-white font-extralight text-lg'>Select a section to edit the public content</h3>
            </div>
            <div className='w-[60%] h-auto flex flex-row flex-wrap justify-center gap-5'>
                {sections.map((section, index) => {
                    return (
                        <>
                            <SectionButton 
                                key={section} 
                                section={section} 
                                Icon={sectionIcons[section]} 
                                onClick={() => setSelectedSection(section)}
                            />
                            {sectionModals[section]}
                        </>
                    )
                })}
            </div>
        </div>
    )
}
