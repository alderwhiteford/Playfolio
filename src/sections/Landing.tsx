import Image from "next/image";
import LandingImage from '../assets/Landing.png'
import { useState } from "react";
import Link from "@/components/Link/Link";
import Reveal from "@/components/Reveal/Reveal";

export default function Landing() {
  const [hoveredItem, setHoveredItem] = useState('');
	const links = ['WORK', 'PROJECTS', 'PHOTOGRAPHY', 'CONTACT']
	
	return (
		<section className='w-screen h-screen relative text-white'>
			<Image 
				alt='alder-portfolio-landing'
				className='w-full h-full object-cover absolute'
				src={LandingImage}
			/>
			<div className='w-full h-full p-32 absolute z-10 flex justify-between items-center'>
				<div>
					<Reveal box={false}>
						<h1 className='text-[90px] md:max-w-[50%] leading-[90px]'>
							alder whiteford
						</h1>
					</Reveal>
					<h3 className='text-[26px] font-thin mt-5 animate-fadeInSlow'>
						software engineer | photographer
					</h3>
				</div>
				<div className='text-[30px] font-thin text-end animate-fadeInRight'>
					{links.map((link) => 
						<Link 
							title={link}
							setHoveredItem={setHoveredItem}
							hoveredItem={hoveredItem}
						/>
					)}
				</div>
			</div>
			<h3 className='z-10 absolute bottom-10 left-32 font-thin'>
				Sony A73 | Sigma 28-70mm f/2.8
			</h3>
		</section>
	);
}