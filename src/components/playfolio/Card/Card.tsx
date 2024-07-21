/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Reveal from "@/components/playfolio/Reveal/Reveal";
import  { ExperienceSectionProps } from "./CardExperience/CardExperience";
import CardModal from "./CardModal/CardModal";
import { Skill } from "@/types/models";

type CardProps = {
    backgroundImage: string
    logo: string
    cursor: string
    link: string
    experiences? : ExperienceSectionProps[]
    description: string,
    skills?: Skill[],
    highlighted_position: number,
}

export default function Card({ backgroundImage, logo, cursor, link, description, experiences, skills, highlighted_position }: CardProps) {
    const [hover, setHover] = useState(false)

    // Modal states:
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const highlighted_index = highlighted_position === -1 ? 0 : highlighted_position;
    
    return (
        <>
            <Reveal width='100%' type='right'>
                <div 
                    className={`w-full h-[50vw] md:h-[300px] rounded-xl bg-cover bg-left flex relative items-center justify-center transition-all`}
                    style={{ 
                        backgroundImage: `url(${backgroundImage})`,
                        cursor: `url(${cursor}) 19 19, auto`
                    }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    onClick={handleOpen}
                >
                    <div className={`w-full h-[50vw] md:[h-100px] rounded-xl absolute z-10 bg-black opacity-60 ${ hover && 'z-0 opacity-80'} transition-all ease-in-out`} />
                    <img 
                        className={`h-[30%] md:h-[100px] absolute z-30 ${ hover && 'z-0 h-[60px] md:h-[80px] -translate-y-8 md:-translate-y-12' } transition-all ease-in-out`} 
                        src={logo}
                        alt='' 
                    />
                    <div className={`absolute z-30 text-3xl translate-y-12 opacity-0 ${ hover && '!opacity-100'} transition-all ease-in-out items-center flex flex-col`}>
                        <h1 className='font-light'>
                            {experiences?.[highlighted_index]?.position}
                        </h1>
                        <h3 className='font-light text-base mt-3'>
                            {experiences?.[highlighted_index]?.dates}
                        </h3>
                    </div>
                </div>
            </Reveal>
            <CardModal 
                open={open}
                handleClose={handleClose}
                link={link}
                logo={logo}
                skills={skills}
                experiences={experiences}
                description={description}
            />
        </>
    );
}