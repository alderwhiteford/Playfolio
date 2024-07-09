import Image from "next/image";
import LandingImage from '../../assets/Landing.png'
import Link from "@/components/Link/Link";
import Reveal from "@/components/Reveal/Reveal";
import { SectionProps } from "@/pages";
import { RefObject, forwardRef } from "react";

export const LINKS = ['SKILLS', 'WORK', 'PROJECTS', 'CONTACT'];

export const scrollOnClick = (type: string) => {
	const lowercaseType = type.toLowerCase();
	const element = document.getElementById(lowercaseType);
	element?.scrollIntoView({ behavior: 'smooth' });
};

const Landing = forwardRef(({ cursorEnter, cursorLeave }: SectionProps, ref) => {
	return (
		<section className='w-screen h-screen relative text-white'>
			<Image
				alt='alder-portfolio-landing'
				className='w-full h-full object-cover absolute'
				src={LandingImage}
			/>
			<div className='w-full h-full p-10 md:p-32 absolute z-10 flex md:justify-between items-center'>
				<div className='self-center'>
					<Reveal box={false}>
						<h1 className='text-[60px] md:text-[90px] md:max-w-[50%] leading-[60px] md:leading-[90px]'>
							alder whiteford
						</h1>
					</Reveal>
					<h3 className='text-[20px] md:text-[26px] font-thin mt-5 animate-fadeInSlow'>
						software engineer | photographer
					</h3>
				</div>
				<div ref={ref as RefObject<HTMLDivElement>} className='hidden lg:flex lg:flex-col text-[30px] font-thin text-end animate-fadeInRight'>
					{LINKS.map((link) => 
						<Link 
							key={link}
							title={link}
							onClick={scrollOnClick}
							cursorEnter={cursorEnter}
							cursorLeave={cursorLeave}
						/>
					)}
				</div>
			</div>
			<h3 className='z-10 absolute bottom-10 left-10 md:left-32 font-thin'>
				Sony A7III | Sigma 28-70mm f/2.8
			</h3>
		</section>
	);
});

Landing.displayName = 'Landing';
export default Landing;
