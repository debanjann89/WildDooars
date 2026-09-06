import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryPhotos, galleryCategories } from '../data/galleryData';
import type { GalleryPhoto } from '../data/galleryData';

interface GalleryPageProps {
  onOpenEnquiry: (contextData?: { title?: string; tripType?: string }) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onOpenEnquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Filter photos
  const filteredPhotos = selectedCategory === 'all'
    ? galleryPhotos
    : galleryPhotos.filter(photo => photo.category === selectedCategory);

  // Lightbox keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (activePhotoIndex === null) return;

    if (e.key === 'Escape') {
      setActivePhotoIndex(null);
    } else if (e.key === 'ArrowLeft') {
      setActivePhotoIndex(prev => (prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1));
    } else if (e.key === 'ArrowRight') {
      setActivePhotoIndex(prev => (prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0));
    }
  }, [activePhotoIndex, filteredPhotos.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (activePhotoIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activePhotoIndex]);

  const activePhoto: GalleryPhoto | null = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  return (
    <div className="min-h-screen bg-white font-sans py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Clean Section Header */}
        <div className="sec-title centered max-w-2xl mx-auto mb-8 text-center">
          <span className="section-tag">Visuals</span>
          <h2>
            Photo <span>Gallery</span>
          </h2>
          <div className="desc-text">
            Moments captured across the wildlife, lush forests, and safaris of Dooars.
          </div>
        </div>

        {/* Minimal Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {galleryCategories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = cat.id === 'all'
              ? galleryPhotos.length
              : galleryPhotos.filter(p => p.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setActivePhotoIndex(null);
                }}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#15803d] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{cat.label}</span>
                <span className="ml-1.5 opacity-70 text-[11px]">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Pure, Uncropped Masonry Photo Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => setActivePhotoIndex(idx)}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden bg-slate-100 cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                fetchPriority={idx < 2 ? 'high' : undefined}
                loading={idx < 2 ? undefined : 'lazy'}
                className="w-full h-auto object-cover group-hover:scale-104 transition-transform duration-500 ease-out block"
              />

              {/* Subtle Clean Hover Overlay with Zoom Icon */}
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-white/95 text-slate-900 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                  <Maximize2 className="w-4 h-4 text-[#15803d]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Clean Footer Booking CTA */}
        <div className="mt-16 text-center pt-8 border-t border-slate-100">
          <p className="text-sm text-slate-600 mb-4 font-medium">
            Planning a visit to Dooars? Let us organize your safaris, stays, and transfers.
          </p>
          <button
            onClick={() => onOpenEnquiry({ tripType: 'Custom Dooars Tour' })}
            className="btn-style-one text-xs uppercase py-3 px-8 shadow-md"
          >
            Enquire Now
          </button>
        </div>
      </div>

      {/* Clean Full-Screen Lightbox */}
      <AnimatePresence>
        {activePhoto && activePhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-xs flex flex-col justify-between p-4 sm:p-6"
            onClick={() => setActivePhotoIndex(null)}
          >
            {/* Top Bar: Counter & Close Button */}
            <div 
              className="flex items-center justify-between text-white max-w-6xl mx-auto w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-xs font-semibold text-slate-300">
                {activePhotoIndex + 1} / {filteredPhotos.length}
              </span>
              <button
                type="button"
                onClick={() => setActivePhotoIndex(null)}
                className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close photo"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Photo Preview with Minimal Prev/Next Controls */}
            <div 
              className="relative flex items-center justify-center flex-grow py-2 max-w-6xl mx-auto w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prev Button */}
              <button
                type="button"
                onClick={() => setActivePhotoIndex(prev => (prev !== null && prev > 0 ? prev - 1 : filteredPhotos.length - 1))}
                className="absolute left-0 sm:left-2 p-3 rounded-full text-white/75 hover:text-white hover:bg-white/15 transition-all cursor-pointer z-10"
                aria-label="Previous"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              {/* Photo */}
              <motion.img
                key={activePhoto.id}
                src={activePhoto.src}
                alt={activePhoto.alt}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="max-h-[84vh] max-w-[92vw] object-contain rounded-xl shadow-2xl"
              />

              {/* Next Button */}
              <button
                type="button"
                onClick={() => setActivePhotoIndex(prev => (prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : 0))}
                className="absolute right-0 sm:right-2 p-3 rounded-full text-white/75 hover:text-white hover:bg-white/15 transition-all cursor-pointer z-10"
                aria-label="Next"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            {/* Bottom Caption & Alt Name */}
            <div 
              className="text-center text-xs text-slate-300 py-1"
              onClick={(e) => e.stopPropagation()}
            >
              <span>{activePhoto.alt}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
