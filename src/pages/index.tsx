'use client'

import Image from 'next/image'
import LandingImage from '../assets/Landing.png'
import Link from 'next/link'
import Landing from '@/sections/Landing'
import Introduction from '@/sections/Introduction'
import Work from '@/sections/Work'
import Skills from '@/sections/Skills'
import Projects from '@/sections/Projects'
import Contact from '@/sections/Contact'

export default function Home() {
  return (
    <div>
      <Landing />
      <Introduction />
      <Skills />
      <Work />
      <Projects />
      <Contact />
    </div>
  )
}
