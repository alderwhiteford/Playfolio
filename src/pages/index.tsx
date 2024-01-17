'use client'

import Image from 'next/image'
import LandingImage from '../assets/Landing.png'
import Link from 'next/link'
import Landing from '@/sections/Landing'
import Introduction from '@/sections/Introduction'
import Work from '@/sections/Work'

export default function Home() {
  return (
    <div>
      <Landing />
      <Introduction />
      <Work />
    </div>
  )
}
