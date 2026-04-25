import { useEffect } from 'react';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import QuickActionBar from './components/QuickActionBar';
import Hero from './sections/Hero';
import Journey from './sections/Journey';
import Missions from './sections/Missions';
import Arsenal from './sections/Arsenal';
import Travel from './sections/Travel';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';
import TerminalModal from './components/TerminalModal';
import CursorGlow from './components/CursorGlow';

function App() {
  // Smooth scroll behavior for anchor links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="relative bg-cyber-dark min-h-screen text-slate-300 font-sans selection:bg-neon-purple/30 selection:text-white overflow-x-hidden">
      <CursorGlow />
      <TerminalModal />
      <ParticleBackground />
      <Navbar />
      <QuickActionBar />
      
      <main className="relative z-10">
        <Hero />
        <Journey />
        <Missions />
        <Arsenal />
        <Travel />
        <Certifications />
        <Contact />
      </main>
    </div>
  );
}

export default App;
