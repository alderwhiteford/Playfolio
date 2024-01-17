'use client'

import Reveal from "@/components/Reveal/Reveal";

export default function Introduction() {
	return (
			<div 
				className='bg-black w-full text-white p-48 pr-64 pl-64 text-[40px] font-thin'
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
