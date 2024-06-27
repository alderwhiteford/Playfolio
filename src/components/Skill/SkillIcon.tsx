import { SkillMappings } from "@/utilties/SkillMappings"
import { Tooltip } from "@mui/material"
import Image, { StaticImageData } from "next/image"
import PlayfolioTooltip from "../Tooltip/Tooltip"

type SkillIconProps = {
    title: string,
    icon: StaticImageData,
}

export default function SkillIcon({ title, icon }: SkillIconProps) {
    return (
        <PlayfolioTooltip title={title}>
            <Image
                key={title}
                src={icon}
                alt=''
                className='w-6 lg:w-8 self-center'
            />
        </PlayfolioTooltip>
    )
}