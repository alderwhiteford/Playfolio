'use client'

import Landing from '@/sections/Landing'
import Introduction from '@/sections/Introduction'
import Work from '@/sections/Work'
import Skills from '@/sections/Skills'
import Projects from '@/sections/Projects'
import Contact from '@/sections/Contact'
import { useEffect, useState } from 'react'

export type SectionProps = {
  cursorEnter: () => void;
  cursorLeave: () => void;
}

export default function Home() {
  const [cursorOver, setCursorOver] = useState(false);
  const cursorEnter = () => setCursorOver(true);
  const cursorLeave = () => setCursorOver(false)

  // Handle circle cursor:
  useEffect(() => {
    const circleElement = document.getElementById('circle-cursor') as HTMLElement;

    const mouse = { x: 0, y: 0}
    const previousMouse = { x: 0, y: 0 }
    const circle = { x: 0, y: 0}
  
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });
  
    const speed = 0.17;
  
    const tick = () => {
      circle.x += (mouse.x - circle.x) * speed;
      circle.y += (mouse.y - circle.y) * speed;
  
      // Handle scaling:
      const deltaMouseX = mouse.x - previousMouse.x;
      const deltaMouseY = mouse.y - previousMouse.y;
      previousMouse.x = mouse.x
      previousMouse.y = mouse.y
  
      const mouseVelocity = Math.min(Math.sqrt(deltaMouseX**2 + deltaMouseY**2), 150) * 4;
      const scaleVelocity = (mouseVelocity / 150);

      // Handle the rotation angle of the mouse:
      const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;


      // Handle the transformations:
      const translateTransform = `translate(${circle.x}px, ${circle.y}px)`
      const scaleTransform = `scale(${1 + scaleVelocity}, ${1 - scaleVelocity})`
      const angleTransoform = `rotate(${angle}deg)`

      circleElement.style.transform = `${translateTransform} ${angleTransoform} ${scaleTransform}`
  
      window.requestAnimationFrame(tick)
    }
  
    tick();
  }, [])

  return (
    <>
      <div 
        id='circle-cursor'
        className={`fixed h-[40px] w-[40px] border-[1px] ${cursorOver ? 'border-[#FFAE42] border-2 shadow-md' : 'border-white'} rounded-full pointer-events-none z-10 -top-[20px] -left-[20px] transition-colors ease-in-out`}
      />
      <div>
        <Landing 
          cursorEnter={cursorEnter}
          cursorLeave={cursorLeave}
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
