import Email from "@/assets/contactIcons/emailIcon.png";
import LinkedIn from "@/assets/contactIcons/linkedInIcon.png";
import Instagram from "@/assets/contactIcons/instagramIcon.png";
import Image from "next/image";
import { useState } from "react";

type TouchPointProps = {
    content: string,
    type: 'EMAIL' | 'LINKEDIN' | 'INSTAGRAM',
}

const contactConfig = {
    'EMAIL': {
        title: 'Email',
        icon: Email,
        type: 'email'
    },
    'LINKEDIN': {
        title: 'LinkedIn',
        icon: LinkedIn,
        type: 'link'
    },
    'INSTAGRAM': {
        title: 'Instagram',
        icon: Instagram,
        type: 'link'
    }
}

export default function TouchPoint({content, type}: TouchPointProps) {
    const config = contactConfig[type];
    const [hover, setHover] = useState(false);
    
    return (
        <div className='w-full flex flex-col items-center justify-center text-[15px] relative h-[300px]'>
            <a 
                href={config.type === 'email' ? 'mailto:' + content : content}
                target={config.type === 'link' ? "_blank" : ""}
                className='absolute'
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <Image src={config.icon} alt='' className='w-16 md:w-24 mb-5 hover:w-28 transition-all ease-in-out' />
            </a>
            <h3 className={`translate-y-20 text-gray-300 opacity-0 ${hover && '!opacity-100'} transition-all ease-in-out`}>
                {config.title}
            </h3>
        </div>
    )
}