import Card from "@/components/playfolio/Card/Card";
import FirebaseController from "@/firebase/controller";
import { parsePositions } from "@/forms/WorkForm";
import { FirebaseContext } from "@/hooks/useFirebase";
import { useStateDispatch, useStateSelector } from "@/store/store";
import { setWorks } from "@/store/worksSlice";
import { Skill } from "@/types/models";
import { useContext, useEffect, useState } from "react";

export default function Work() {
    const { works } = useStateSelector((state) => state.works);
    const { skills } = useStateSelector((state) => state.skills);

    const dispatch = useStateDispatch();
    const firebaseInstance = useContext(FirebaseContext) as FirebaseController;

    useEffect(() => {
        firebaseInstance.fetchWorks()
            .then((data) => {
                dispatch(setWorks(data));
            });
    }, [dispatch, firebaseInstance])

    return (
        <section id='work' className='w-screen bg-black text-white pr-10 pl-10 lg:pr-32 lg:pl-32 font-light text-[50px] pb-16'>
            <h1>
                Work.
            </h1>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10'>
                {works && skills && works?.map((work) => {
                    return (
                        <Card 
                            key={work.id}
                            backgroundImage={work.work.image}
                            logo={work.work.logo}
                            highlighted_position={work.work.highlighted_position}
                            cursor={work.work.hover_emoji}
                            link={work.work.link}
                            description={work.work.description}
                            experiences={parsePositions(work.work.positions)}
                            skills={work.work.skills.map((s) => skills?.find((skill) => skill.title === s) as Skill)}
                        />
                    )
                })}
           </div>
        </section>
    );
}