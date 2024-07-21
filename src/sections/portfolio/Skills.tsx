import Skill from "@/components/playfolio/Skill/Skill";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "@/hooks/useFirebase";
import FirebaseController from "@/firebase/controller";
import { Skill as SkillModel } from "@/types/models";
import { useStateDispatch, useStateSelector } from "@/store/store";
import { setSkills } from "@/store/skillsSlice";

export default function Skills() {
    const { skills } = useStateSelector((state) => state.skills);
    const dispatch = useStateDispatch();
    const firebaseInstance = useContext(FirebaseContext) as FirebaseController;

    useEffect(() => {
        firebaseInstance.fetchSkills()
            .then((data) => {
                let skills = data as SkillModel[];
                skills.sort((a, b) => a.title.localeCompare(b.title));
                dispatch(setSkills(skills));
            });
    }, [dispatch, firebaseInstance])

    
    return (
        <section id='skills' className='w-screen bg-black text-white pr-10 pl-10 md:pr-32 md:pl-32 font-light text-[50px] pt-16 pb-16'>
            <h1>
                Skills.
            </h1>
            <div className='flex flex-wrap flex-row w-full justify-center mt-10'>
                {skills?.map((skill) => {
                    return (
                        <Skill 
                            key={skill.title}
                            title={skill.title}
                            icon={skill.logo}
                        />
                    )
                })}
            </div>
        </section>
    );
}