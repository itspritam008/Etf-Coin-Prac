// app/page.js
'use client'

import { useState, useEffect } from 'react'
// import { FloatingHeart } from './components/animations/FloatingHeart'
import { Hero } from './components/sections/Hero'
import { Phases } from './components/sections/Phases'
import { Tokenomics } from './components/features/Tokenomics'
import { Roadmap } from './components/sections/Roadmap'
import { Benefits } from './components/sections/Benefits'
import { Testimonials } from './components/sections/Testimonials'
import { Footer } from './components/sections/Footer'

const Home = () => {
  const [activePhase, setActivePhase] = useState('infatuation')
  // const [hearts, setHearts] = useState([])

  useEffect(() => {
    // const heartCount = 10
    // const newHearts = Array.from({ length: heartCount }, (_, i) => ({
    //   id: i,
    //   delay: i * 0.5
    // }))
    // setHearts(newHearts)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 text-gray-800 overflow-hidden relative">
      {/* Floating Hearts */}
      {/* {hearts.map(heart => (
        <FloatingHeart key={heart.id} delay={heart.delay} />
      ))} */}

      <Hero />
      <Phases activePhase={activePhase} setActivePhase={setActivePhase} />
      <Tokenomics />
      <Roadmap />
      <Benefits />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default Home