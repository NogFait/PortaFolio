import { MotionConfig } from 'framer-motion'
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

  return (
    <MotionConfig reducedMotion="user">
      <div className="app">
        <Navbar />
        <main>
          <Hero />
          <Projects />
          <About />
          <ContactFormSection />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}

export default App;