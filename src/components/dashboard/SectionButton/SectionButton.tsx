import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useState } from "react";

type SectionButtonProps = {
    section: string,
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>,
    onClick: () => void,
}

export default function SectionButton({ section, Icon, onClick }: SectionButtonProps) {
    const [hover, setHover] = useState(false);

    return (
        <div 
            className={`bg-gray-900 bg-opacity-90 border-[1px] w-[25%] aspect-square rounded-2xl cursor-pointer relative overflow-hidden ${hover ? 'border-[#77a4ed]' : 'border-gray-500' } flex items-center justify-center`}
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={onClick}
        >
            <h1 className={`text-white text-3xl font-extralight z-30 ${hover ? 'opacity-100' : 'opacity-0' } transition-all`}
                onMouseOver={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                {section}
            </h1>
            <Icon sx={{ position: 'absolute', bottom: '-25%', right: '-25%', width: '115%', height: '115%', transition: 'all 0.2s ease-in-out', color: hover ? '#77a4ed' : '#6b7280'}}/>
        </div>
    )
}