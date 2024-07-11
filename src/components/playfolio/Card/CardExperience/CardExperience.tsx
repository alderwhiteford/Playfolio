import { Box } from "@mui/material"

export type ExperienceSectionProps = {
    position: string
    dates: string
    description?: string[]
    inProgress: boolean
}


export default function CardExperience({ inProgress, position, description, dates }: ExperienceSectionProps) {
    return (
        <div className='flex flex-row gap-5 items-center w-full'>
            <div className='flex flex-col w-full'>
                <div className='flex flex-row items-center'>
                    <div className={`rounded-full w-[15px] h-[45px] ${inProgress ? 'bg-[#FFAE42] animate-pulse' : 'bg-[#52a447]'} mr-5 z-10`} />
                    <div className='w-full flex justify-between items-center'>
                        <h1 className='text-white font-medium text-md md:text-xl'>
                            {position}
                        </h1>
                        <h3 className='text-white font-light text-xs md:text-base'>
                            {dates}
                        </h3>
                    </div>
                </div>
                <p className='text-white font-light text-base ml-12'>
                    <ul className='list-disc'>
                        {description?.map((desc) => <li className='mt-2 mb-2' key={desc}>{desc}</li>)}
                    </ul>
                </p>
            </div>
        </div>
    )
}