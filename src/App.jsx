import { useEffect } from 'react';
import Navbar from './components/Navbar';
import QuickActionBar from './components/QuickActionBar';
import Hero from './sections/Hero';
import Journey from './sections/Journey';
import Missions from './sections/Missions';
import Arsenal from './sections/Arsenal';
import Certifications from './sections/Certifications';
import LabReports from './sections/LabReports';
import Contact from './sections/Contact';
import TerminalModal from './components/TerminalModal';
import GithubHighlights from './sections/GithubHighlights';
import LearningNow from './sections/LearningNow';

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
      <TerminalModal />
      <div className="scanline" />
      <div className="fixed inset-0 pointer-events-none z-50 border-[20px] border-black/10 mix-blend-overlay" />
      <Navbar />
      <Hero />
      <QuickActionBar />
      
      <main className="relative">
        <Journey />
        <Missions />
        <LabReports />
        <Arsenal />
        <GithubHighlights />
        <LearningNow />
        <Certifications />
        <Contact />
      </main>
      <footer className="py-12 border-t border-white/5 bg-cyber-darker text-center text-slate-500 font-mono text-xs">
        <p>© 2024 SECURITY_OPERATIONS_CENTER // PRAJWAL_V</p>
      </footer>
    </div>
  );
}

export default App;
