import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Rocket, ArrowRight } from 'lucide-react';
import Moon3D from '../components/Moon3D'; // Import the new Moon3D component

// Helper to draw twinkling stars
function drawStars(ctx, width, height, stars) {
  ctx.clearRect(0, 0, width, height);
  stars.forEach(star => {
    ctx.save();
    ctx.globalAlpha = 0.7 + 0.3 * Math.sin(Date.now() / 500 + star.twinkleOffset);
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
    ctx.fillStyle = star.color;
    ctx.shadowColor = star.color;
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.restore();
  });
}

const LandingPage: React.FC = () => {
  const canvasRef = useRef(null);
  const moonRef = useRef(null);
  // Star and moon animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;
    // Generate stars
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      color: `rgba(255,255,255,${Math.random() * 0.7 + 0.3})`,
      twinkleOffset: Math.random() * Math.PI * 2
    }));
    // Animate
    let animationFrame;
    function animate() {
      drawStars(ctx, width, height, stars);
      // Animate moon
      if (moonRef.current) {
        const moon = moonRef.current;
        // Moon orbits in a circular path in the top right corner
        const t = Date.now() / 6000;
        const orbitRadius = 120;
        const moonX = width - orbitRadius * Math.cos(t) - 80;
        const moonY = orbitRadius * Math.sin(t) + 80;
        moon.style.left = `${moonX}px`;
        moon.style.top = `${moonY}px`;
        moon.style.transform = `rotate(${t * 40}deg)`;
      }
      animationFrame = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Dynamic Starfield */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" style={{display: 'block'}} />
      {/* Animated Moon (Photorealistic PNG) */}
      <Moon3D />
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center p-4">
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
        .group-hover\:animate-bounce:hover {
          animation: bounce 0.6s infinite alternate;
        }
        @keyframes bounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-12px); }
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
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
