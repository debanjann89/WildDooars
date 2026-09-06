import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  ChevronRight, 
  Sparkles, 
  MapPin, 
  Layers, 
  Footprints, 
  Compass, 
  Mountain, 
  Maximize2, 
  X, 
  ChevronLeft, 
  Send,
  Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryItems, galleryCategories } from '../data/galleryData';
import type { GalleryItem } from '../data/galleryData';

interface GalleryPageProps {
  onOpenEnquiry: (contextData?: { title?: string; tripType?: string; destination?: string }) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onOpenEnquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  // Filter items
  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  // Lightbox keyboard controls (Escape, Left, Right)
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (activeLightboxIndex === null) return;

    if (e.key === 'Escape') {
      setActiveLightboxIndex(null);
    } else if (e.key === 'ArrowLeft') {
      setActiveLightboxIndex(prev => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === 'ArrowRight') {
      setActiveLightboxIndex(prev => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
    }
  }, [activeLightboxIndex, filteredItems.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when modal open
  useEffect(() => {
    if (activeLightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeLightboxIndex]);

  const activeItem: GalleryItem | null = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'wildlife':
        return Footprints;
      case 'safaris':
        return Compass;
      case 'landscapes':
        return Mountain;
      default:
        return Layers;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* 1. Page Header & Breadcrumb Banner */}
      <section className="relative bg-gradient-to-b from-emerald-950 via-emerald-900 to-[#15803d] text-white py-16 sm:py-20 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="container relative z-10 text-center max-w-4xl mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-200 mb-4">
            <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-emerald-400" />
            <span className="text-white font-extrabold">Photo Gallery</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-emerald-200 mb-4 shadow-sm">
            <Camera className="w-3.5 h-3.5 text-amber-300" />
            <span>Wild Dooars Visual Showcase</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase mb-4 drop-shadow-sm">
            Wild Dooars <span className="text-amber-300">Photo Gallery</span>
          </h1>

          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl mx-auto font-medium">
            Immerse yourself in authentic moments captured across Jaldapara, Buxa Tiger Reserve, Gorumara, and the Himalayan foothills of Bhutan.
          </p>
        </div>
      </section>

      {/* 2. Main Gallery Content Area */}
      <section className="py-12 sm:py-16">
        <div className="container px-4 sm:px-6">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
            {galleryCategories.map((cat) => {
              const Icon = getCategoryIcon(cat.id);
              const isSelected = selectedCategory === cat.id;
              const count = cat.id === 'all' 
                ? galleryItems.length 
                : galleryItems.filter(i => i.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setActiveLightboxIndex(null);
                  }}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#15803d] text-white shadow-lg shadow-emerald-700/20 scale-105'
                      : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-[#15803d] border border-slate-200 shadow-xs'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-emerald-100 text-[#15803d]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Photo Gallery Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence>
              {filteredItems.map((item, idx) => {
                // Determine heights based on aspect ratio for visual hierarchy
                const isPortrait = item.aspect === 'portrait';

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -6 }}
                    className={`bg-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden group relative flex flex-col justify-between ${
                      isPortrait ? 'sm:row-span-2' : ''
                    }`}
                  >
                    {/* Image Box */}
                    <div 
                      className={`relative overflow-hidden bg-slate-900 cursor-pointer ${
                        isPortrait ? 'h-[420px] sm:h-full min-h-[380px]' : 'h-64 sm:h-72'
                      }`}
                      onClick={() => setActiveLightboxIndex(idx)}
                    >
                      <img
                        src={item.src}
                        alt={item.title}
                        fetchPriority={idx < 2 ? 'high' : undefined}
                        loading={idx < 2 ? undefined : 'lazy'}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                        <div className="inline-flex items-center gap-1.5 bg-[#15803d]/90 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                          <MapPin className="w-3 h-3 text-amber-300" />
                          <span>{item.location}</span>
                        </div>
                        <div className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-md text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          <Sparkles className="w-3 h-3 text-amber-300" />
                          <span>{item.tag}</span>
                        </div>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white z-10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-md border border-emerald-500/30">
                            {item.category}
                          </span>
                          <span className="w-9 h-9 rounded-full bg-[#15803d] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                            <Maximize2 className="w-4 h-4" />
                          </span>
                        </div>
                        <h3 className="text-lg font-black leading-snug uppercase tracking-tight text-white mb-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Permanent Bottom Content for Clear Readability */}
                    <div className="p-4 sm:p-5 bg-white border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-[#15803d] transition-colors line-clamp-1">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {item.description}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveLightboxIndex(idx);
                        }}
                        className="ml-3 p-2 rounded-xl bg-emerald-50 hover:bg-[#15803d] text-[#15803d] hover:text-white transition-colors flex-shrink-0 cursor-pointer"
                        title="View Fullscreen"
                        aria-label={`View ${item.title} fullscreen`}
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 3. Full-Screen Interactive Lightbox Modal */}
      <AnimatePresence>
        {activeItem && activeLightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 select-none"
            onClick={() => setActiveLightboxIndex(null)}
          >
            {/* Top Toolbar */}
            <div 
              className="flex items-center justify-between text-white w-full max-w-6xl mx-auto z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-black uppercase tracking-widest bg-white/10 px-3 py-1.5 rounded-full border border-white/20 text-emerald-300">
                  Photo {activeLightboxIndex + 1} of {filteredItems.length}
                </span>
                <span className="hidden sm:inline text-xs text-slate-300 font-semibold">
                  Use arrow keys to browse
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveLightboxIndex(null)}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Close photo preview"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Middle Main Preview */}
            <div 
              className="relative flex items-center justify-center flex-grow py-4 max-w-6xl mx-auto w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Previous Button */}
              <button
                type="button"
                onClick={() => setActiveLightboxIndex(prev => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1))}
                className="absolute left-2 sm:left-4 z-20 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-[#15803d] text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-xl hover:scale-110 active:scale-95"
                aria-label="Previous photograph"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Photo */}
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="max-h-[75vh] sm:max-h-[80vh] flex items-center justify-center"
              >
                <img
                  src={activeItem.src}
                  alt={activeItem.title}
                  className="max-h-[75vh] sm:max-h-[80vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
                />
              </motion.div>

              {/* Next Button */}
              <button
                type="button"
                onClick={() => setActiveLightboxIndex(prev => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0))}
                className="absolute right-2 sm:right-4 z-20 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-[#15803d] text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-xl hover:scale-110 active:scale-95"
                aria-label="Next photograph"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Info Bar & Call to Action */}
            <div 
              className="w-full max-w-4xl mx-auto bg-slate-900/90 backdrop-blur-lg border border-white/10 rounded-2xl p-4 sm:p-5 text-white z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-[#15803d] bg-emerald-50 px-2.5 py-0.5 rounded-md">
                    <MapPin className="w-3 h-3" />
                    {activeItem.location}
                  </span>
                  <span className="text-[11px] font-bold text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded-md">
                    {activeItem.tag}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-white">
                  {activeItem.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xl mt-0.5">
                  {activeItem.description}
                </p>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setActiveLightboxIndex(null);
                    onOpenEnquiry({
                      title: activeItem.title,
                      tripType: 'Safari & Tour Planning',
                      destination: activeItem.location
                    });
                  }}
                  className="btn-style-one text-xs uppercase py-2.5 px-5 shadow-lg flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enquire For This Tour</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Bottom Inspiration Strip */}
      <section className="bg-emerald-900 text-white py-14 border-t border-emerald-800">
        <div className="container text-center max-w-3xl mx-auto px-4">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-300 block mb-2">
            Plan Your Journey With Us
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-4">
            Inspired by these wild encounters?
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-8 max-w-xl mx-auto">
            Book your customizable Dooars wildlife safari, tea estate tour, or Bhutan cultural circuit today. Our team arranges verified permits, jungle gypsies, and scenic transport.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onOpenEnquiry({ tripType: 'Custom Safari Tour' })}
              className="btn-style-one text-xs uppercase py-3 px-7 shadow-xl flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Book Your Safari Tour</span>
            </button>
            <Link
              to="/packages"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-extrabold uppercase tracking-wider py-3 px-7 rounded-xl transition-all"
            >
              View Tour Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
