import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Rocket, ArrowRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#1c1c1c] text-white overflow-hidden">
      {/* Animated Particle/Starfield Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-full h-full animate-twinkle opacity-40" style={{background: 'radial-gradient(circle, #3a8fff 1px, transparent 1px)'}} />
        <div className="absolute w-full h-full animate-twinkle-slow opacity-20" style={{background: 'radial-gradient(circle, #00ffb2 1px, transparent 1px)'}} />
        <div className="absolute w-full h-full animate-twinkle-fast opacity-10" style={{background: 'radial-gradient(circle, #fff 1px, transparent 1px)'}} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center p-4">
        <header className="mb-8">
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-600 animate-fade-in-down drop-shadow-[0_0_32px_rgba(80,200,255,0.3)]">
            Astro BioSync
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto animate-fade-in-up backdrop-blur-sm">
            The next generation dashboard for space bioscience. Explore, analyze, and visualize data from the frontiers of research.
          </p>
        </header>

        <main className="animate-fade-in-up animation-delay-500">
          <Link to="/dashboard">
            <Button size="lg" className="group bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-700 text-white font-bold tracking-wide shadow-[0_0_32px_rgba(80,200,255,0.4)] px-8 py-4 rounded-full text-2xl flex items-center gap-3 transform hover:scale-105 transition-transform duration-300">
              Enter Dashboard <Rocket className="h-7 w-7 group-hover:animate-bounce" /> <ArrowRight className="h-6 w-6" />
            </Button>
          </Link>
        </main>

        <footer className="absolute bottom-4 text-white/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Astro BioSync. All rights reserved.</p>
        </footer>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes twinkle {
          0% { background-position: 0 0; }
          100% { background-position: -10000px 5000px; }
        }
        @keyframes twinkle-slow {
          0% { background-position: 0 0; }
          100% { background-position: -8000px 4000px; }
        }
        @keyframes twinkle-fast {
          0% { background-position: 0 0; }
          100% { background-position: -12000px 6000px; }
        }
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 1s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        .group-hover\:animate-bounce:hover {
          animation: bounce 0.6s infinite alternate;
        }
        @keyframes bounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
