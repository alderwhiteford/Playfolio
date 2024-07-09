import Image, { StaticImageData } from "next/image";

import GitHub from "../../assets/skillIcons/github.png";
import EyeIcon from "../../assets/miscellaneous/eyeIcon.png"
import { SkillMappings } from "../../utilties/skillMappings";
import Reveal from "../Reveal/Reveal";
import Flip from "../Reveal/Flip";
import { SectionProps } from "@/pages";
import SkillIcon from "../Skill/SkillIcon";

export type Skill = 'AWS' | 'Azure' | 'C++' | 'CSS' | 'Docker' | 'Firebase' | 'GCP' | 'Golang' 
            | 'HTML' | 'Java' | 'JavaScript' | 'MongoDB' | 'NextJS' | 'Postgres' | 'Python'
            | 'ReactJS' | 'Redux' | 'Scala' | 'TypeScript';

interface ProjectProps extends SectionProps {
    title: string,
    description: string,
    github?: string,
    skills: Skill[],
    video: StaticImageData,
    liveLink?: string,
}

export default function Project({ title, description, github, skills, video, liveLink, cursorEnter, cursorLeave}: ProjectProps) {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-5 w-full gap-10 items-center lg:mt-10 lg:mb-10'>
            <div className='col-span-3 md:col-span-2'>
                <Reveal>
                    <div className='flex flex-col text-lg gap-8'>
                        <h3 className='text-[25px] lg:text-[35px]'>
                            {title}
                        </h3>
                        {description}
                        <div className='flex flex-row gap-3 items-center'>
                            {github &&
                            <>
                                <a 
                                    href={github}
                                    target="_blank"
                                    className='hidden lg:flex'
                                    onMouseEnter={() => cursorEnter()}
                                    onMouseLeave={() => cursorLeave()}
                                >
                                    <Image 
                                        src={GitHub}
                                        alt=''
                                        className='w-6 lg:w-8'
                                    />
                                </a>
                                <div className='h-[30px] w-[1.5px] bg-white mr-2 ml-2 hidden lg:flex'/>
                            </>
                            }
                            <div className='flex flex-row flex-wrap gap-3'>
                                {skills.map((skill) =>
                                    <SkillIcon 
                                        key={skill}
                                        title={skill}
                                        icon={SkillMappings[skill]}
                                    />
                                )}
                            </div>
                            {liveLink &&
                                <>
                                    <div className='h-[30px] w-[1.5px] bg-white mr-2 ml-2 hidden lg:flex'/>
                                    <a 
                                        href={liveLink}
                                        target="_blank"
                                        className='hidden lg:flex'
                                        onMouseEnter={() => cursorEnter()}
                                        onMouseLeave={() => cursorLeave()}
                                    >
                                        <Image 
                                            src={EyeIcon}
                                            alt=''
                                            className='w-6 lg:w-8'
                                        />
                                    </a>
                                </>
                            }
                        </div>
                    </div>
                </Reveal>
            </div>
            <div className='col-span-3 lg:pl-10'>
                <Flip>
                    <Image 
                        src={video}
                        alt=''
                        className='rounded-2xl w-full h-full'
                    />
                </Flip>
            </div>
        </div>
    )
};
