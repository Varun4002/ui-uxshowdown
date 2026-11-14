import { useCallback, useEffect, useState } from 'react'
import Community from './components/Community.jsx'
import Confetti from './components/Confetti.jsx'
import Contact from './components/Contact.jsx'
import DayTimeline from './components/DayTimeline.jsx'
import Enrol from './components/Enrol.jsx'
import Faq from './components/Faq.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Nav from './components/Nav.jsx'
import Programs from './components/Programs.jsx'
import Safety from './components/Safety.jsx'
import Testimonials from './components/Testimonials.jsx'
import Welcome from './components/Welcome.jsx'

/** How long the celebration is held after submit. */
const CELEBRATE_MS = 2600

// The owl's peekaboo/pointing hooks are retired with the owl itself; they come
// back wired to Benny in the next phase. No-ops keep the form contract stable.
const noop = () => {}

export default function App() {
  const [paused, setPaused] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmitted = useCallback(() => setSuccess(true), [])
  const toggleMotion = useCallback(() => setPaused((value) => !value), [])

  useEffect(() => {
    if (!success) return undefined
    const timer = window.setTimeout(() => setSuccess(false), CELEBRATE_MS)
    return () => window.clearTimeout(timer)
  }, [success])

  return (
    <>
      <Nav paused={paused} onToggleMotion={toggleMotion} />
      <Confetti show={success} />

      <main className={`site-main${paused ? ' is-motion-paused' : ''}`} id="top">
        <Hero />
        <Marquee />
        <Welcome />
        <Programs />
        <DayTimeline />
        <Safety />
        <Testimonials />
        <Community />
        <Faq />
        <Enrol
          onFieldFocus={noop}
          onFieldBlur={noop}
          onSubmitted={handleSubmitted}
          success={success}
        />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
