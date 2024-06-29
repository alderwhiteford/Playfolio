'use client'

import Landing from '@/sections/Landing'
import Introduction from '@/sections/Introduction'
import Work from '@/sections/Work'
import Skills from '@/sections/Skills'
import Projects from '@/sections/Projects'
import Contact from '@/sections/Contact'
import useCursor from '@/hooks/useCursor'
import { useEffect, useRef, useState } from 'react'
import NavDropdown from '@/components/Dropdown/NavDropdown'

export type SectionProps = {
  cursorEnter: () => void;
  cursorLeave: () => void;
}

export default function Home() {
  const { cursorOver, cursorEnter, cursorLeave } = useCursor();
  const [offHomeScreen, setOffHomeScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
		const bounds = ref.current?.getBoundingClientRect();
		setOffHomeScreen(Boolean(bounds?.bottom && bounds.bottom < 50))
	}

  useEffect(() => {
		document.addEventListener('scroll', handleScroll)
    if (window) {
      setIsMobile(window.matchMedia("(max-width: 600px)").matches);
    }

		return () => {
		document.removeEventListener('scroll', handleScroll)
		}
	}, []);

  return (
    <>
      {!isMobile && <div 
        id='circle-cursor'
        className={`fixed h-[40px] w-[40px] border-[1px] ${cursorOver ? 'border-[#FFAE42] border-2 shadow-md' : 'border-white'} rounded-full pointer-events-none z-50 -top-[20px] -left-[20px] transition-colors ease-in-out`}
      />}
        <NavDropdown
          cursorEnter={cursorEnter}
          cursorLeave={cursorLeave}
          isVisible={offHomeScreen || isMobile} 
        />
      <div>
        <Landing 
          cursorEnter={cursorEnter}
          cursorLeave={cursorLeave}
          ref={ref}
        />
        <Introduction />
        <Skills />
        <Work />
        <Projects
          cursorEnter={cursorEnter}
          cursorLeave={cursorLeave}
        />
        <Contact />
      </div>
    </>
  )
}
