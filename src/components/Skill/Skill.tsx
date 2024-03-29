import Image, { StaticImageData } from "next/image";
import { Tooltip, Zoom } from "@mui/material";

import Flip from "../Reveal/Flip";

type SkillProps = {
    title: string,
    icon: StaticImageData,
}

export default function Skill({ title, icon }: SkillProps) {
    return (
        <div>
            <Flip>
                <Tooltip 
                    title={title}
                    slotProps={{
                        popper: {
                          modifiers: [
                            {
                              name: 'offset',
                              options: {
                                offset: [0, -5],
                              },
                            },
                          ],
                        },
                      }}
                      arrow
                      TransitionComponent={Zoom}
                      placement="top"
                >
                <div className='w-[70px] h-[70px] md:w-[125px] md:h-[125px] bg-gray-500 bg-opacity-20 border-gray-500 border-[1px] m-3 md:m-5 rounded-2xl flex items-center justify-center text-lg hover:border-white transition-all ease-in-out hover:transition-all hover:ease-in-out'>
                    <Image 
                        className='w-[50%]'
                        src={icon}
                        alt={title} />
                </div>
                </Tooltip>
            </Flip>
        </div>
    );
}