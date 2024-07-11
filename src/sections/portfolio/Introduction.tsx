'use client'

import Reveal from "@/components/playfolio/Reveal/Reveal";

export default function Introduction() {
	return (
			<div 
				className='bg-black w-full text-white p-10 md:p-48 pt-32 md:!pt-48 !pb-32 md:pr-64 md:pl-64 text-[30px] md:text-[40px] font-thin'
			>
				<Reveal>
					Hey there 👋🏼
				</Reveal>
				<br/>
				<Reveal>
					I am a <strong> student</strong>, <strong> software engineer</strong>, 
					<strong> photographer</strong>, and <strong> running enthusiast </strong>
					born and raised in the beautiful state of Oregon. I run off the adage 
					that <strong>work is play</strong>, so lets have fun and <strong>create something together</strong>.
				</Reveal>
			</div>
	);
}
