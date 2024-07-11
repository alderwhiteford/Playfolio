/* eslint-disable @next/next/no-img-element */
import { Box, Modal } from "@mui/material"
import CardExperience, { ExperienceSectionProps } from "../CardExperience/CardExperience";
import { Skill } from "@/components/playfolio/Project/Project";
import { SkillMappings } from "@/utilties/skillMappings";
import SkillIcon from "@/components/playfolio/Skill/SkillIcon";

type CardModalProps = {
    handleClose: () => void,
    open: boolean,
    link: string,
    logo: string,
    experiences?: ExperienceSectionProps[],
    skills?: Skill[],
    description: string,
}

export default function CardModal({ handleClose, open, link, logo, description, experiences, skills } : CardModalProps) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            disableAutoFocus
        >
            <Box className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[95%] md:w-[700px] max-h-[80%] bg-gray-900 bg-opacity-90 border-gray-500 border-[1px] shadow-lg p-[40px] rounded-xl flex flex-col gap-[20px] overflow-scroll'>
                <a 
                    href={link}
                    target='_blank'
                    className='mr-auto'
                >
                    <img 
                        src={logo}
                        alt=''
                        className='h-[70px]'
                    />
                </a>
                <div className='text-gray-400 text-md'>
                    {description}
                </div>
                <div className='flex flex-col gap-8 relative mt-5'>
                    <div className="absolute rounded-full w-[15px] h-full bg-gray-900 drop-shadow-xl" />
                    {experiences?.map(({dates, position, description, inProgress }) => {
                        return (
                            <CardExperience 
                                key={position}
                                dates={dates}
                                position={position}
                                description={description}
                                inProgress={inProgress}
                            />
                        )
                    })}
                </div>
                <div className='flex flex-row flex-wrap gap-3 mt-5'>
                    {skills?.map((skill) =>
                        <SkillIcon 
                            key={skill}
                            title={skill}
                            icon={SkillMappings[skill] as unknown as string}
                        />
                    )}
                </div>
            </Box>
        </Modal>
    )
}