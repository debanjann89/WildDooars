import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Car, Compass, Trees } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { BusinessSettings } from '../types';

interface HeroProps {
  settings?: BusinessSettings;
  onOpenEnquiry: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEnquiry }) => {
  const slides = [
    {
      image: '/images/package_rhino_main.jpg',
      tag: 'No. 1 Car Rental & Tour Operator in Dooars',
      titleMain: 'EXPLORE WILD DOOARS',
      titleHighlight: 'Awesome Wildlife',
      titleSub: '& Bhutan Tour Packages',
      desc: 'Trusted AC & Non-AC car rentals, Jaldapara Jeep Safaris, resort stays, and customized family holiday tours with experienced local mountain chauffeurs.',
      cta: 'Rent a Car'
    },
    {
      image: '/images/package_buxa_main.jpg',
      tag: 'Jaldapara · Gorumara · Buxa · Phuentsholing',
      titleMain: 'UNFORGETTABLE JUNGLE',
      titleHighlight: 'Safaris & Nature',
      titleSub: 'Holiday Itineraries',
      desc: 'Experience 1-Horned Rhinoceros safaris, lush tea garden homestays, Bhutan border trips, and seamless airport & station transfers.',
      cta: 'Explore Packages'
    },
    {
      image: '/images/car_innova.jpg',
      tag: 'Station & Airport Transfers',
      titleMain: 'RELIABLE CAR HIRE',
      titleHighlight: 'Innova & Bolero',
      titleSub: 'Mountain Fleet',
      desc: 'Hassle-free pickups from Bagdogra Airport (IXB), NJP Railway Station, Hasimara & New Alipurduar directly to your resort.',
      cta: 'Bookings'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const active = slides[currentSlide];

  return (
    <section className="relative h-[520px] sm:h-[620px] lg:h-[680px] w-full bg-slate-950 overflow-hidden font-sans">
      {/* Background Image Carousel with Crisp Visibility */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-10"
        >
          <img
            src={active.image}
            alt={active.titleMain}
            className="w-full h-full object-cover brightness-85 sm:brightness-90 scale-102 transition-transform duration-7000"
          />
          {/* Subtle Gradient Overlay for Text Legibility without darkening photo */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/25" />
        </motion.div>
      </AnimatePresence>

      {/* Slide Text Content Overlay - PERFECT MOBILE & DESKTOP CENTERING */}
      <div className="container relative z-20 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          {/* Subtitle Tag */}
          <motion.div
            key={`tag-${currentSlide}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-flex items-center gap-1.5 uppercase tracking-wider font-extrabold text-white text-[11px] sm:text-xs md:text-sm bg-[#15803d] px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-emerald-400/40 mb-3 sm:mb-5 shadow-lg"
          >
            <Trees className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-200 flex-shrink-0" />
            <span className="truncate max-w-[280px] sm:max-w-none">{active.tag}</span>
          </motion.div>

          {/* Main Title - Mobile Responsive Scaled Text */}
          <motion.h1
            key={`title-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-2xl sm:text-4xl lg:text-6xl font-extrabold uppercase tracking-tight text-white mb-2 sm:mb-3 leading-tight drop-shadow-lg text-center"
          >
            <span className="block text-white">{active.titleMain}</span>
            <span className="block text-emerald-300 font-extrabold text-2xl sm:text-4xl lg:text-5xl my-0.5 sm:my-1">
              {active.titleHighlight}
            </span>
            <span className="block text-slate-100 font-extrabold text-xl sm:text-3xl lg:text-4xl">
              {active.titleSub}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            key={`desc-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-slate-100 text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-8 max-w-xl font-normal drop-shadow-md text-center px-2 line-clamp-3 sm:line-clamp-none"
          >
            {active.desc}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            key={`btn-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto px-4 sm:px-0"
          >
            <button
              onClick={onOpenEnquiry}
              className="btn-style-one w-full sm:w-auto text-xs uppercase tracking-wider py-3 px-6 shadow-xl justify-center"
            >
              <Car className="w-4 h-4" />
              <span>{active.cta}</span>
            </button>
            <Link
              to="/packages"
              className="btn-style-three w-full sm:w-auto text-xs uppercase tracking-wider py-3 px-6 shadow-xl justify-center"
            >
              <Compass className="w-4 h-4" />
              <span>View Tour Packages</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="hidden sm:flex absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 hover:bg-[#15803d] text-white items-center justify-center transition-colors border border-white/20 backdrop-blur-sm shadow-md"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden sm:flex absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 hover:bg-[#15803d] text-white items-center justify-center transition-colors border border-white/20 backdrop-blur-sm shadow-md"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-2 rounded-full transition-all ${
              i === currentSlide ? 'bg-emerald-400 w-7' : 'bg-white/40 w-2 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
