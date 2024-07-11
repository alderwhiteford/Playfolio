/* eslint-disable @next/next/no-img-element */
import Image, { StaticImageData } from "next/image";

import Flip from "@/components/playfolio/Reveal/Flip";
import PlayfolioTooltip from "@/components/playfolio/Tooltip/Tooltip";

type SkillProps = {
    title: string,
    icon: string,
    dashboard?: boolean
}

export default function Skill({ title, icon, dashboard }: SkillProps) {
    return (
        <div>
            {dashboard ? (
                <div className='w-[50px] h-[50px] md:w-[100px] md:h-[100px] bg-gray-500 bg-opacity-20 border-gray-500 border-[1px] rounded-2xl flex items-center justify-center text-lg hover:border-white transition-all ease-in-out hover:transition-all hover:ease-in-out'>
                    <img 
                        className='!w-[50%]'
                        src={icon}
                        alt={title} />
                </div>
            ) : (
                <Flip>
                    <PlayfolioTooltip title={title}>
                        <div className='w-[70px] h-[70px] md:w-[125px] md:h-[125px] bg-gray-500 bg-opacity-20 border-gray-500 border-[1px] m-3 md:m-5 rounded-2xl flex items-center justify-center text-lg hover:border-white transition-all ease-in-out hover:transition-all hover:ease-in-out'>
                            <img 
                                className='!w-[50%]'
                                src={icon}
                                alt={title} />
                        </div>
                    </PlayfolioTooltip>
            </Flip>
            )
            }
        </div>
    );
}