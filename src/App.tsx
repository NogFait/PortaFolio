import './App.css'
import About from './components/About.tsx'
import ContactFormSection from './components/ContactFormSection.tsx'
import Footer from './components/Footer.tsx'
import Hero from './components/Hero.tsx'
import Projects from './components/Projects.tsx'

function App() {
  return (
    <div style={{
      backgroundColor: '#0b1326',
      color: '#dae2fd',
      minHeight: '100vh',
      fontFamily: '"Inter", sans-serif',
      maxWidth: '100%',
      overflowX: 'hidden'
    }}>
      <Hero/>
      <Projects/>
      <About/>
      <ContactFormSection/>
      <Footer/>
    </div>
  )
}

export default App;