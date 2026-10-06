import { MotionConfig } from 'framer-motion'
import { Toaster } from 'sonner'
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
        <Toaster
          theme="dark"
          position="bottom-right"
          richColors
          toastOptions={{
            style: {
              background: 'var(--surface-container-high)',
              color: 'var(--on-surface)',
              border: '1px solid rgba(70, 69, 84, 0.2)',
              fontFamily: 'var(--font-body)',
            },
          }}
        />
      </div>
    </MotionConfig>
  )
}

export default App;