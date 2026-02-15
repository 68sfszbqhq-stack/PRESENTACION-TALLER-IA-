import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import { SLIDES } from './constants';
import { SlideRenderer } from './components/SlideRenderer';

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < SLIDES.length - 1 ? prev + 1 : prev));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const progress = ((currentSlide + 1) / SLIDES.length) * 100;

  return (
    <div className="w-full h-screen bg-brand-dark overflow-hidden flex flex-col relative font-sans text-slate-100">
      
      {/* Main Stage */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <SlideRenderer key={currentSlide} data={SLIDES[currentSlide]} />
        </AnimatePresence>
      </div>

      {/* Controls Overlay (Always Visible on Hover or Fixed at bottom) */}
      <div className="absolute bottom-0 left-0 w-full z-50 p-6 pointer-events-none flex justify-between items-end bg-gradient-to-t from-black/80 to-transparent h-32">
        
        {/* Slide Counter */}
        <div className="text-gray-400 font-mono text-sm pointer-events-auto">
          {currentSlide + 1} / {SLIDES.length}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center space-x-4 pointer-events-auto">
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-3 rounded-full bg-slate-800/80 hover:bg-brand-primary text-white transition-colors disabled:opacity-30 backdrop-blur-sm"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            disabled={currentSlide === SLIDES.length - 1}
            className="p-3 rounded-full bg-slate-800/80 hover:bg-brand-primary text-white transition-colors disabled:opacity-30 backdrop-blur-sm"
          >
            <ChevronRight size={24} />
          </button>

           <button 
            onClick={toggleFullscreen}
            className="p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-colors ml-4 backdrop-blur-sm"
          >
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-slate-800 w-full z-50">
        <div 
          className="h-full bg-brand-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

    </div>
  );
};

export default App;