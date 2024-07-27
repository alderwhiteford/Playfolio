import Project from "@/components/playfolio/Project/Project";
import FirebaseController from "@/firebase/controller";
import { FirebaseContext } from "@/hooks/useFirebase";

import { SectionProps } from "@/pages";
import { setProjects } from "@/store/projectsSlice";
import { useStateDispatch, useStateSelector } from "@/store/store";
import { Skill } from "@/types/models";
import { useContext, useEffect } from "react";

export default function Projects({ cursorEnter, cursorLeave }: SectionProps) {
    const { projects } = useStateSelector((state) => state.projects);
    const { skills } = useStateSelector((state) => state.skills);

    const dispatch = useStateDispatch();
    const firebaseInstance = useContext(FirebaseContext) as FirebaseController;

    useEffect(() => {
        firebaseInstance.fetchProjects()
            .then((data) => {
                dispatch(setProjects(data));
            });
    }, [dispatch, firebaseInstance]);

    return (
        <section id='projects' className='w-screen bg-black text-white pr-10 pl-10 md:pr-32 md:pl-32 font-light text-[50px] pt-16 pb-16'>
            <h1>
                Featured Projects.
            </h1>
            <div className='mt-16 flex flex-col gap-24'>
                {projects && skills && projects?.map((project) => {
                    return (
                        <Project 
                            key={project.id}
                            title={project.data.title}
                            description={project.data.description}
                            skills={project.data.skills.map((s) => skills?.find((skill) => skill.title === s) as Skill)}
                            image={project.data.image}
                            github={project.data.github}
                            liveLink={project.data.live_link}
                            additionalInfo={project.data.additional_info}
                            cursorEnter={cursorEnter}
                            cursorLeave={cursorLeave}
                        />
                    )
                })}
            </div>
        </section>
    );
}
