/* eslint-disable @next/next/no-img-element */
import Image, { StaticImageData } from "next/image"
import PlayfolioTooltip from "../Tooltip/Tooltip"

type SkillIconProps = {
    title: string,
    icon: string,
}

export default function SkillIcon({ title, icon }: SkillIconProps) {
    return (
        <PlayfolioTooltip title={title}>
            <img
                key={title}
                src={icon}
                alt=''
                className='w-6 lg:w-8 self-center'
            />
        </PlayfolioTooltip>
    )
}