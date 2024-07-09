import Project from "@/components/Project/Project";

import Voxeti from "../../assets/videos/voxeti.gif";
import Boxy from "../../assets/videos/boxy.gif";
import IsDevFree from "../../assets/videos/isDevFree.gif";
import WIP from "../../assets/videos/wip.gif";
import RapidMeet from "../../assets/videos/RapidMeet.gif"
import Playfolio from "../../assets/videos/playfolio.gif"
import { SectionProps } from "@/pages";

export default function Projects({ cursorEnter, cursorLeave }: SectionProps) {
    return (
        <section id='projects' className='w-screen bg-black text-white pr-10 pl-10 md:pr-32 md:pl-32 font-light text-[50px] pt-16 pb-16'>
            <h1>
                Featured Projects.
            </h1>
            <div className='mt-16 flex flex-col gap-24'>
                <Project
                    title='Scout Website - Rebrand'
                    description="This project involves the development of a new website for Scout; Northeastern University's premier, student-led design studio. I am working alongside one other developer to help bring new life to the club's public online presence, while at the same time ensuring the page integrates with the club's current CMS."
                    skills={['NextJS', 'TypeScript', 'HTML', 'CSS' ]}
                    video={WIP}
                    cursorEnter={cursorEnter}
                    cursorLeave={cursorLeave}
                />
                <Project
                    title='Student Activity Calendar'
                    description="I am leading a team of 10 engineers and 5 designers to to create the The Student Activity Calendar, a Northeastern University, student government backed project that aims to build a centralized tool for promoting involvement opportunities on campus. It will be a dual-application system that consists of a student-facing hybrid web/mobile app and a web dashboard for club executives. The tech stack will expand to include services such as Redis, MongoDB, and Pinecone as well as languages like Python."
                    github="https://github.com/GenerateNU/sac"
                    skills={['ReactJS', 'TypeScript', 'Golang', 'Postgres', 'AWS' ]}
                    video={WIP}
                    cursorEnter={cursorEnter}
                    cursorLeave={cursorLeave}
                />
                <Project
                    title='RapidMeet'
                    description="RapidMeet is a group scheduling application that offers an efficient solution for identifying optimal meeting times for a class project, a birthday, or any other event you can dream of. "
                    github="https://github.com/alderwhiteford/RapidMeet"
                    skills={['ReactJS', 'Redux', 'TypeScript', 'HTML', 'CSS', 'Firebase' ]}
                    video={RapidMeet}
                    liveLink='https://rapidmeet.io'
                    cursorEnter={cursorEnter}
                    cursorLeave={cursorLeave}
                />
                <Project
                    title='Playfolio'
                    description="Playfolio is... what you're taking a look at right now! It is still a work in progress with a management backend still in the development backlog. I'm looking forward to seeing how this site will grow over the coming year."
                    github="https://github.com/alderwhiteford/Playfolio"
                    skills={['NextJS', 'TypeScript', 'HTML', 'CSS' ]}
                    video={Playfolio}
                    cursorEnter={cursorEnter}
                    cursorLeave={cursorLeave}
                />
                <Project
                    title='IsDevFree - OneASICS'
                    description="IsDevFree is an internal tool I designed and developed for the OneASICS engineering team at ASICS Digital. It is meant to be used as a centalized, visual tool to see who was the last to interact with an environment. It also gives developers the ability to 'soft lock' an environment, a feature that notifies users, both in browser and the CLI, that they should avoid over-writing changes until some specified date in the future."
                    skills={['ReactJS', 'JavaScript', 'HTML', 'CSS', 'Scala', 'MongoDB', 'AWS' ]}
                    video={IsDevFree}
                    cursorEnter={cursorEnter}
                    cursorLeave={cursorLeave}
                />
                <Project
                    title='Voxeti'
                    description="Voxeti is a service based platform that allows individuals with 3D printers to monetize their printer when it is not in use. Voxeti aims to connect two primary groups of individuals to those with printers. 1) individuals looking to try out 3D printing but not willing to pay hundreds of dollars for their own printer and 2) individuals who work in labs where the 3D printers often have backlogs ranging from days to weeks."
                    github="https://github.com/alderwhiteford/voxeti"
                    skills={['ReactJS', 'Redux', 'TypeScript', 'HTML', 'CSS', 'C++', 'Golang', 'MongoDB', 'AWS' ]}
                    video={Voxeti}
                    cursorEnter={cursorEnter}
                    cursorLeave={cursorLeave}
                />
                <Project
                    title='Boxy'
                    description="Boxy is a service based platform that allows city residents to monetize their underutilized living space for college students as a storage space on an hourly, daily, and monthly basis. Traditional storage solutions such as Uhaul, Public storage as well as our business model competitor Neighbor exist in the overall storage market."
                    github="https://github.com/alderwhiteford/Boxy"
                    skills={['NextJS', 'TypeScript', 'HTML', 'CSS', 'Postgres']}
                    video={Boxy}
                    cursorEnter={cursorEnter}
                    cursorLeave={cursorLeave}
                />
            </div>
        </section>
    );
}
