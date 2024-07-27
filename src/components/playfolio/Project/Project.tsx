/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

import GitHub from "@/assets/skillIcons/github.png";
import InfoIcon from "@/assets/miscellaneous/infoIcon.png";
import EyeIcon from "@/assets/miscellaneous/eyeIcon.png"
import Flip from "@/components/playfolio/Reveal/Flip";
import { SectionProps } from "@/pages";
import SkillIcon from "@/components/playfolio/Skill/SkillIcon";
import Reveal from "../Reveal/Reveal";
import PlayfolioTooltip from "../Tooltip/Tooltip";
import { Skill } from "@/types/models";

interface ProjectProps extends SectionProps {
    title: string,
    description: string,
    github?: string,
    additionalInfo?: string,
    skills: Skill[],
    image: string,
    liveLink?: string,
}

export default function Project({ title, description, github, additionalInfo, skills, image, liveLink, cursorEnter, cursorLeave}: ProjectProps) {
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
                                    <PlayfolioTooltip title='View Code'>
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
                                    </PlayfolioTooltip>
                                    <div className='h-[30px] w-[1.5px] bg-white mr-2 ml-2 hidden lg:flex'/>
                                </>
                            }
                            {additionalInfo &&
                                <>
                                    <a 
                                        href={additionalInfo}
                                        target="_blank"
                                        className='hidden lg:flex'
                                        onMouseEnter={() => cursorEnter()}
                                        onMouseLeave={() => cursorLeave()}
                                    >
                                        <PlayfolioTooltip title='More Information'>
                                            <Image 
                                                src={InfoIcon}
                                                alt=''
                                                className='w-6 lg:w-8'
                                            />
                                        </PlayfolioTooltip>
                                    </a>
                                    <div className='h-[30px] w-[1.5px] bg-white mr-2 ml-2 hidden lg:flex'/>
                                </>
                            }
                            <div className='flex flex-row flex-wrap gap-3'>
                                {skills.map((skill) =>
                                    <SkillIcon 
                                        key={skill.title}
                                        title={skill.title}
                                        icon={skill.logo}
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
                                        <PlayfolioTooltip title='View Live Site'>
                                            <Image 
                                                src={EyeIcon}
                                                alt=''
                                                className='w-6 lg:w-8'
                                            />
                                        </PlayfolioTooltip>
                                    </a>
                                </>
                            }
                        </div>
                    </div>
                </Reveal>
            </div>
            <div className='col-span-3 lg:pl-10'>
                <Flip>
                    <img 
                        src={image}
                        alt=''
                        className='rounded-2xl w-full h-full max-h-[450px] object-cover object-top'
                    />
                </Flip>
            </div>
        </div>
    )
};
