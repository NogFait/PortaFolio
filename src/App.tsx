import { useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar.tsx'
import Hero from './components/Hero.tsx'
import Projects from './components/Projects.tsx'
import About from './components/About.tsx'
import ContactFormSection from './components/ContactFormSection.tsx'
import Footer from './components/Footer.tsx'
import { useLenis } from './hooks/useLenis'

function App() {
  useLenis()

  useEffect(() => {
    const buttons = document.querySelectorAll<HTMLElement>('.btn-magnetic')

    const onMove = (e: MouseEvent, btn: HTMLElement) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.05)`
    }

    const onLeave = (btn: HTMLElement) => {
      btn.style.transform = ''
    }

    const handlers = new Map<HTMLElement, { move: (e: MouseEvent) => void; leave: () => void }>()

    buttons.forEach(btn => {
      const move = (e: MouseEvent) => onMove(e, btn)
      const leave = () => onLeave(btn)
      btn.addEventListener('mousemove', move)
      btn.addEventListener('mouseleave', leave)
      handlers.set(btn, { move, leave })
    })

    return () => {
      handlers.forEach((h, btn) => {
        btn.removeEventListener('mousemove', h.move)
        btn.removeEventListener('mouseleave', h.leave)
      })
    }
  }, [])

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <ContactFormSection />
      <Footer />
    </div>
  )
}

export default App;