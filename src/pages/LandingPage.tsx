import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LandingPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Background stars */}
      <div className="absolute inset-0 z-0">
        <div id="stars1" className="absolute w-full h-full animate-twinkle"></div>
        <div id="stars2" className="absolute w-full h-full animate-twinkle-slow"></div>
        <div id="stars3" className="absolute w-full h-full animate-twinkle-fast"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center p-4">
        <header className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 animate-fade-in-down">
            Astro BioSync
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in-up">
            Your portal to the cosmos of biological research. Explore, analyze, and visualize data from the frontiers of space.
          </p>
        </header>

        <main className="animate-fade-in-up animation-delay-500">
          <Link to="/dashboard">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold tracking-wide shadow-lg transform hover:scale-105 transition-transform duration-300">
              Enter Dashboard
            </Button>
          </Link>
        </main>

        <footer className="absolute bottom-4 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Astro BioSync. All rights reserved.</p>
        </footer>
      </div>

      {/* CSS for animations and stars */}
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

        .animate-twinkle {
          background-image: url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiIHZpZXdCb3g9IjAgMCA2IDYiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDYgNiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTMsMCBDMS4zLDAsMCwxLjMsMCwzIEMwLDQuNywxLjMsNiwzLDYgQzQuNyw2LDYsNC43LDYsMyBDNiwxLjMsNC43LDAsMywwIE0zLDUgQzEuOSw1LDMSw0LjEsMSwzIEMxLDEuOSwxLjksMSwzLDEgQzQuMSwxLDUsMS45LDUsMyBDNSw0LjEsNC4xLDUsMyw1IFoiLz48L3N2Zz4=');
          animation: twinkle 200s linear infinite;
        }
        .animate-twinkle-slow {
          background-image: url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiIHZpZXdCb3g9IjAgMCA2IDYiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDYgNiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTMsMCBDMS4zLDAsMCwxLjMsMCwzIEMwLDQuNywxLjMsNiwzLDYgQzQuNyw2LDYsNC43LDYsMyBDNiwxLjMsNC43LDAsMywwIE0zLDUgQzEuOSw1LDMSw0LjEsMSwzIEMxLDEuOSwxLjksMSwzLDEgQzQuMSwxLDUsMS45LDUsMyBDNSw0LjEsNC4xLDUsMyw1IFoiLz48L3N2Zz4=');
          animation: twinkle-slow 300s linear infinite;
        }
        .animate-twinkle-fast {
          background-image: url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiIHZpZXdCb3g9IjAgMCA2IDYiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDYgNiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTMsMCBDMS4zLDAsMCwxLjMsMCwzIEMwLDQuNywxLjMsNiwzLDYgQzQuNyw2LDYsNC43LDYsMyBDNiwxLjMsNC43LDAsMywwIE0zLDUgQzEuOSw1LDMSw0LjEsMSwzIEMxLDEuOSwxLjksMSwzLDEgQzQuMSwxLDUsMS45LDUsMyBDNSw0LjEsNC4xLDUsMyw1IFoiLz48L3N2Zz4=');
          animation: twinkle-fast 150s linear infinite;
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
      `}</style>
    </div>
  );
};

export default LandingPage;
