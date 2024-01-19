import Skill from "@/components/Skill/Skill";

import JavaScript from "../assets/skillIcons/javascript.png";
import TypeScript from "../assets/skillIcons/typescript.png";
import Python from "../assets/skillIcons/python.png";
import Golang from "../assets/skillIcons/golang.png";
import Scala from "../assets/skillIcons/scala.png";
import Java from "../assets/skillIcons/java.png";
import CPP from "../assets/skillIcons/c++.png";
import HTML from "../assets/skillIcons/html.png";
import CSS from "../assets/skillIcons/css.png";
import React from "../assets/skillIcons/react.png";
import Next from "../assets/skillIcons/nextjs.png";
import Redux from "../assets/skillIcons/redux.png";
import Postgres from "../assets/skillIcons/postgres.png"; 
import MongoDB from "../assets/skillIcons/mongodb.png";
import Docker from "../assets/skillIcons/docker.png";
import Firebase from "../assets/skillIcons/firebase.png";
import AWS from "../assets/skillIcons/aws.png";
import Azure from "../assets/skillIcons/azure.png";
import GCP from "../assets/skillIcons/gcp.png";
import Figma from "../assets/skillIcons/figma.png";

import { StaticImageData } from "next/image";

type SkillProps = {
    title: string,
    icon: StaticImageData,
}

const skills: SkillProps[] = [
    { title: 'JavaScript', icon: JavaScript },
    { title: 'TypeScript', icon: TypeScript },
    { title: 'Python', icon: Python },
    { title: 'Golang', icon: Golang },
    { title: 'Scala', icon: Scala },
    { title: 'Java', icon: Java },
    { title: 'C++', icon: CPP },
    { title: 'HTML', icon: HTML },
    { title: 'CSS', icon: CSS },
    { title: 'React.js', icon: React },
    { title: 'Next.js', icon: Next },
    { title: 'Redux', icon: Redux },
    { title: 'Postgres', icon: Postgres },
    { title: 'MongoDB', icon: MongoDB },
    { title: 'Google Firebase', icon: Firebase },
    { title: 'Docker', icon: Docker },
    { title: 'Amazon Web Services', icon: AWS },
    { title: 'Azure', icon: Azure },
    { title: 'Google Cloud Platform', icon: GCP },
    { title: 'Figma', icon: Figma },
]

export default function Skills() {
    return (
        <section id='skills' className='w-screen bg-black text-white pr-10 pl-10 md:pr-32 md:pl-32 font-light text-[50px] pt-16 pb-16'>
            <h1>
                Skills.
            </h1>
            <div className='flex flex-wrap flex-row w-full justify-center mt-10'>
                {skills.map((skill) => {
                    return (
                        <Skill 
                            key={skill.title}
                            title={skill.title}
                            icon={skill.icon}
                        />
                    )
                })}
            </div>
        </section>
    );
}