'use client'

import Reveal from "@/components/playfolio/Reveal/Reveal";
import FirebaseController from "@/firebase/controller";
import { FirebaseContext } from "@/hooks/useFirebase";
import { AboutPage } from "@/types/models";
import { useContext, useEffect, useState } from "react";

export default function Introduction() {
	const firebaseInstance = useContext(FirebaseContext) as FirebaseController;
	const [aboutPage, setAboutPage] = useState<AboutPage | null>();

	useEffect(() => {
		firebaseInstance.fetchAbout()
			.then((data) => {
				setAboutPage(data)
			})
	}, [firebaseInstance])

	const renderIntroduction = (introduction: string) => {
		const splitIntroduction = introduction.split('**')
		return (
			<>
				{splitIntroduction.map((section, index) => {
					if (index % 2 === 1) {
						return <strong key={section}>{section}</strong>
					} else {
						return section
					}
				})}
			</>
		)
	}

	return (
			<div 
				className='bg-black w-full text-white p-10 md:p-48 pt-32 md:!pt-48 !pb-32 md:pr-64 md:pl-64 text-[30px] md:text-[40px] font-thin'
			>
				<Reveal>
					{aboutPage?.greeting}
				</Reveal>
				<br/>
				<Reveal>
					{aboutPage?.introduction && renderIntroduction(aboutPage.introduction)}
				</Reveal>
			</div>
	);
}
