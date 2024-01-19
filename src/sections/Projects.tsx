import Project from "@/components/Project/Project";

import Voxeti from "../assets/videos/voxeti.gif";
import Boxy from "../assets/videos/boxy.gif";
import IsDevFree from "../assets/videos/isDevFree.gif";
import WIP from "../assets/videos/wip.gif";

export default function Projects() {
    return (
        <section id='projects' className='w-screen bg-black text-white pr-10 pl-10 md:pr-32 md:pl-32 font-light text-[50px] pt-16 pb-16'>
            <h1>
                Featured Projects.
            </h1>
            <div className='mt-16 flex flex-col gap-24'>
                <Project
                    title='ScheduleSync'
                    description="ScheduleSync is a group scheduling application that offers an efficient solution for identifying optimal meeting times for a class project, a birthday, or any other event you can dream of. "
                    github="https://github.com/alderwhiteford/When3Meet"
                    skills={['ReactJS', 'Redux', 'TypeScript', 'HTML', 'CSS', 'Firebase' ]}
                    video={WIP}
                />
                <Project
                    title='IsDevFree - OneASICS'
                    description="IsDevFree is an internal tool I designed and developed for the OneASICS engineering team at ASICS Digital. It is meant to be used as a centalized, visual tool to see who was the last to interact with an environment. It also gives developers the ability to 'soft lock' an environment, a feature that notifies users, both in browser and the CLI, that they should avoid over-writing changes until some specified date in the future."
                    github=""
                    skills={['ReactJS', 'JavaScript', 'HTML', 'CSS', 'Scala', 'MongoDB', 'AWS' ]}
                    video={IsDevFree}
                />
                <Project
                    title='Voxeti'
                    description="Voxeti is a service based platform that allows individuals with 3D printers to monetize their printer when it is not in use. Voxeti aims to connect two primary groups of individuals to those with printers. 1) individuals looking to try out 3D printing but not willing to pay hundreds of dollars for their own printer and 2) individuals who work in labs where the 3D printers often have backlogs ranging from days to weeks."
                    github="https://github.com/alderwhiteford/voxeti"
                    skills={['ReactJS', 'Redux', 'TypeScript', 'HTML', 'CSS', 'C++', 'Golang', 'MongoDB', 'AWS' ]}
                    video={Voxeti}
                />
                <Project
                    title='Boxy'
                    description="Boxy is a service based platform that allows city residents to monetize their underutilized living space for college students as a storage space on an hourly, daily, and monthly basis. Traditional storage solutions such as Uhaul, Public storage as well as our business model competitor Neighbor exist in the overall storage market."
                    github="https://github.com/alderwhiteford/Boxy"
                    skills={['NextJS', 'TypeScript', 'HTML', 'CSS', 'Postgres']}
                    video={Boxy}
                />
            </div>
        </section>
    );
}
