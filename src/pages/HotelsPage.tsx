import React, { useState, useEffect, useCallback } from 'react';
import {
  Hotel as HotelIcon,
  MapPin,
  Users,
  BedDouble,
  Sparkles,
  Wifi,
  ShowerHead,
  Wind,
  Coffee,
  Tv,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  Camera,
  CheckCircle2,
  Trees,
  Waves,
  ShieldCheck,
  CalendarCheck
} from 'lucide-react';
import type { Hotel } from '../types';
import { initialHotels } from '../services/mockData';

interface HotelsPageProps {
  hotels?: Hotel[];
  onOpenEnquiry: (contextData?: { hotelPreference?: string; tripType?: string; title?: string }) => void;
}

export const HotelsPage: React.FC<HotelsPageProps> = ({ hotels: propsHotels, onOpenEnquiry }) => {
  // Use passed hotels or fallback to initialHotels if empty
  const hotelsList = propsHotels && propsHotels.length > 0 ? propsHotels : initialHotels;

  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // Track selected image index per stay card for thumbnail previewing
  const [cardImageIndex, setCardImageIndex] = useState<Record<string, number>>({});

  // Lightbox Modal state
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [lightboxTitle, setLightboxTitle] = useState<string>('');

  const categories = [
    { label: 'All Stays & Rooms', value: 'All' },
    { label: 'Bamboo Eco Cottages', value: 'Cottage' },
    { label: 'Family Suites', value: 'Suite' },
    { label: 'Deluxe Nature Rooms', value: 'Deluxe Room' },
    { label: 'Executive Rooms', value: 'Executive Room' },
    { label: 'Resort Grounds & Facilities', value: 'Resort Grounds' }
  ];

  const filteredHotels = activeCategory === 'All'
    ? hotelsList
    : hotelsList.filter((h) => h.propertyType === activeCategory);

  const handleOpenLightbox = (images: string[], startIndex: number, title: string) => {
    setLightboxImages(images);
    setLightboxIndex(startIndex);
    setLightboxTitle(title);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
  };

  const handlePrevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : lightboxImages.length - 1));
  }, [lightboxImages.length]);

  const handleNextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev < lightboxImages.length - 1 ? prev + 1 : 0));
  }, [lightboxImages.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };

    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen, handlePrevImage, handleNextImage]);

  const getAmenityIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('wifi')) return <Wifi className="w-3.5 h-3.5" />;
    if (lower.includes('bath') || lower.includes('washroom') || lower.includes('geyser') || lower.includes('shower'))
      return <ShowerHead className="w-3.5 h-3.5" />;
    if (lower.includes('ac') || lower.includes('air conditioning') || lower.includes('air conditioned'))
      return <Wind className="w-3.5 h-3.5" />;
    if (lower.includes('kettle') || lower.includes('tea') || lower.includes('dining') || lower.includes('food') || lower.includes('restaurant'))
      return <Coffee className="w-3.5 h-3.5" />;
    if (lower.includes('tv') || lower.includes('led')) return <Tv className="w-3.5 h-3.5" />;
    if (lower.includes('pool') || lower.includes('water')) return <Waves className="w-3.5 h-3.5" />;
    if (lower.includes('forest') || lower.includes('veranda') || lower.includes('garden') || lower.includes('bamboo'))
      return <Trees className="w-3.5 h-3.5" />;
    return <CheckCircle2 className="w-3.5 h-3.5" />;
  };

  return (
    <div className="pt-4 sm:pt-8 pb-24 font-sans bg-stone-50">
      <div className="container">
        {/* Section Header */}
        <div className="sec-title centered max-w-3xl mx-auto mb-10 text-center">
          <span className="section-tag inline-block bg-emerald-100 text-[#15803d] text-xs font-black uppercase px-4 py-1.5 rounded-full tracking-wider mb-3">
            Handpicked Nature Accommodations
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Stay Close to Nature <span className="text-[#15803d]">in Wild Dooars</span>
          </h2>
          <div className="desc-text text-sm sm:text-base text-slate-600 leading-relaxed">
            Immerse yourself in tranquil forest sanctuaries, handcrafted bamboo cottages, and spacious wooden family suites across Dooars. Every stay features modern ensuite washrooms, hot water geysers, air conditioning, and authentic wilderness hospitality.
          </div>

          {/* Quick Trust Highlights Banner */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-3.5 rounded-xl border border-emerald-100 shadow-sm flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#15803d] flex items-center justify-center flex-shrink-0">
                <Trees className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">Forest & River Views</h4>
                <p className="text-[11px] text-slate-500">Unmatched serenity</p>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-emerald-100 shadow-sm flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#15803d] flex items-center justify-center flex-shrink-0">
                <ShowerHead className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">Attached Geyser Baths</h4>
                <p className="text-[11px] text-slate-500">24/7 instant hot water</p>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-emerald-100 shadow-sm flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#15803d] flex items-center justify-center flex-shrink-0">
                <Wind className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">Air Conditioned</h4>
                <p className="text-[11px] text-slate-500">Power backup enabled</p>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-emerald-100 shadow-sm flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#15803d] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">100% Verified Stays</h4>
                <p className="text-[11px] text-slate-500">Zero hidden fees</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2.5 text-xs font-extrabold rounded-full transition-all uppercase tracking-wider ${
                activeCategory === cat.value
                  ? 'bg-[#15803d] text-white shadow-md scale-105 border border-[#15803d]'
                  : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-[#15803d] border border-slate-200 shadow-xs'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accommodations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {filteredHotels.map((stay) => {
            const gallery = stay.gallery && stay.gallery.length > 0 ? stay.gallery : [stay.image];
            const currentImgIndex = cardImageIndex[stay.id] || 0;
            const activePhoto = gallery[currentImgIndex] || stay.image;

            return (
              <div
                key={stay.id}
                className="bg-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Image Display & Thumbnails Area */}
                  <div className="relative">
                    <div className="h-64 sm:h-72 w-full overflow-hidden relative bg-slate-900">
                      <img
                        src={activePhoto}
                        alt={stay.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                        onClick={() => handleOpenLightbox(gallery, currentImgIndex, stay.name)}
                      />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2 items-center">
                        <span className="bg-[#15803d] text-white text-[11px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                          {stay.propertyType}
                        </span>
                        {stay.badge && (
                          <span className="bg-amber-500 text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                            {stay.badge}
                          </span>
                        )}
                      </div>

                      {/* Photo Count / Lightbox Trigger Badge */}
                      <button
                        onClick={() => handleOpenLightbox(gallery, currentImgIndex, stay.name)}
                        className="absolute top-4 right-4 bg-slate-900/80 hover:bg-[#15803d] text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-xs flex items-center gap-1.5 transition-all shadow-md"
                        title="Open full photo gallery"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>{gallery.length} Photos</span>
                      </button>

                      {/* Image Navigation Arrows (on image) */}
                      {gallery.length > 1 && (
                        <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCardImageIndex((prev) => ({
                                ...prev,
                                [stay.id]: (currentImgIndex - 1 + gallery.length) % gallery.length
                              }));
                            }}
                            className="pointer-events-auto w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-transform hover:scale-110"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCardImageIndex((prev) => ({
                                ...prev,
                                [stay.id]: (currentImgIndex + 1) % gallery.length
                              }));
                            }}
                            className="pointer-events-auto w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-transform hover:scale-110"
                            aria-label="Next image"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {/* Expand Overlay Hint */}
                      <button
                        onClick={() => handleOpenLightbox(gallery, currentImgIndex, stay.name)}
                        className="absolute bottom-3 right-3 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-lg shadow-md transition-all opacity-0 group-hover:opacity-100"
                        title="View Fullscreen"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Thumbnail Strip (Quick Switcher) */}
                    {gallery.length > 1 && (
                      <div className="px-4 py-2.5 bg-slate-50 border-b border-emerald-50 flex items-center gap-2 overflow-x-auto">
                        {gallery.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() =>
                              setCardImageIndex((prev) => ({
                                ...prev,
                                [stay.id]: idx
                              }))
                            }
                            className={`w-14 h-10 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${
                              currentImgIndex === idx
                                ? 'border-[#15803d] scale-105 shadow-sm'
                                : 'border-transparent opacity-60 hover:opacity-100'
                            }`}
                          >
                            <img src={img} alt={`${stay.name} ${idx + 1}`} className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Location Tag */}
                    <div className="flex items-center gap-1.5 text-xs text-[#15803d] font-bold mb-2">
                      <MapPin className="w-3.5 h-3.5 text-[#15803d] flex-shrink-0" />
                      <span>{stay.location}</span>
                    </div>

                    {/* Stay / Room Title */}
                    <h3 className="text-xl font-extrabold text-slate-900 uppercase tracking-tight mb-3">
                      {stay.name}
                    </h3>

                    {/* Specification Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {stay.capacity && (
                        <div className="flex items-center gap-1.5 bg-emerald-50 text-[#15803d] text-xs font-bold px-3 py-1 rounded-lg border border-emerald-200">
                          <Users className="w-3.5 h-3.5" />
                          <span>{stay.capacity}</span>
                        </div>
                      )}
                      {stay.bedType && (
                        <div className="flex items-center gap-1.5 bg-stone-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-lg border border-stone-200">
                          <BedDouble className="w-3.5 h-3.5" />
                          <span>{stay.bedType}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 bg-stone-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-lg border border-stone-200">
                        <ShowerHead className="w-3.5 h-3.5" />
                        <span>Attached Geyser Bath</span>
                      </div>
                    </div>

                    {/* Room Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                      {stay.description}
                    </p>

                    {/* Amenities List */}
                    {stay.amenities && stay.amenities.length > 0 && (
                      <div className="space-y-2 pt-3 border-t border-emerald-100">
                        <span className="block text-[11px] font-extrabold uppercase text-slate-500 tracking-wider">
                          Key Amenities & Inclusions
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {stay.amenities.map((am, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 bg-emerald-50/70 text-slate-700 text-[11px] font-semibold px-2.5 py-1 rounded-md border border-emerald-100"
                            >
                              <span className="text-[#15803d]">{getAmenityIcon(am)}</span>
                              <span>{am}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-6 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() =>
                      handleOpenLightbox(gallery, currentImgIndex, stay.name)
                    }
                    className="w-full py-3 px-4 rounded-xl border border-emerald-600 text-[#15803d] hover:bg-emerald-50 text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    <span>View Photos ({gallery.length})</span>
                  </button>

                  <button
                    onClick={() =>
                      onOpenEnquiry({
                        hotelPreference: stay.name,
                        tripType: 'Hotel & Resort Booking',
                        title: stay.name
                      })
                    }
                    className="btn-style-one w-full text-xs py-3.5 uppercase tracking-wider shadow-md justify-center"
                  >
                    <HotelIcon className="w-4 h-4" />
                    <span>Check Availability</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Resort Experience & Amenities Feature Showcase */}
        <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-3xl p-6 sm:p-12 mb-16 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-4xl">
            <span className="inline-block bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-black uppercase px-4 py-1.5 rounded-full tracking-wider mb-4">
              Resort Ambiance & Grounds
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white">
              Lush Green Spaces, Outdoor Pool & River Panoramas
            </h3>
            <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed mb-8">
              Beyond comfortable rooms, our partner properties in Dooars feature sprawling lawns, refreshing night-lit swimming pools, illuminated evening fountains, and viewing decks opening directly into tea plantations and misty foothills.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-4 border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/30 text-emerald-300 flex items-center justify-center mb-2">
                  <Waves className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Night-Lit Swimming Pool</h4>
                <p className="text-xs text-emerald-100/70">Turquoise waters with deck seating & evening illumination.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-4 border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/30 text-emerald-300 flex items-center justify-center mb-2">
                  <Trees className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Sprawling Forest Lawns</h4>
                <p className="text-xs text-emerald-100/70">Manicured grass, gazebos, and natural lily ponds.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-4 border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/30 text-emerald-300 flex items-center justify-center mb-2">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Evening Bonfire & Fountains</h4>
                <p className="text-xs text-emerald-100/70">Color-lit fountains, campfire gatherings, and fresh snacks.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() =>
                  onOpenEnquiry({
                    hotelPreference: 'Jungle Resort Grounds & Recreation',
                    tripType: 'Hotel & Resort Booking'
                  })
                }
                className="btn-style-one text-xs py-3.5 px-8 uppercase tracking-wider shadow-lg"
              >
                <span>Plan Your Stay & Safari</span>
              </button>

              <button
                onClick={() => {
                  const grounds = hotelsList.find((h) => h.id === 'stay-resort-grounds-experience');
                  if (grounds && grounds.gallery) {
                    handleOpenLightbox(grounds.gallery, 0, grounds.name);
                  }
                }}
                className="py-3 px-6 rounded-xl border border-white/30 text-white hover:bg-white/10 text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                <span>View Resort Photos</span>
              </button>
            </div>
          </div>
        </div>

        {/* Why Book With Us Section */}
        <div className="sec-title centered max-w-2xl mx-auto mb-10 text-center">
          <span className="section-tag inline-block bg-emerald-100 text-[#15803d] text-xs font-black uppercase px-4 py-1.5 rounded-full tracking-wider mb-2">
            Peace of Mind
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Why Reserve Your Dooars Stay With Us?
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#15803d] flex items-center justify-center mb-4 shadow-xs">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <h4 className="text-base font-extrabold text-slate-900 mb-2">Real-Time Availability Check</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              We directly check live room availability across top forest and riverside sanctuaries to match your exact family size and dates.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#15803d] flex items-center justify-center mb-4 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-base font-extrabold text-slate-900 mb-2">Handpicked & Spotless Hygiene</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every room is personally vetted for clean linen, modern attached washrooms with hot water geysers, air conditioning, and power backup.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-sm text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#15803d] flex items-center justify-center mb-4 shadow-xs">
              <HotelIcon className="w-6 h-6" />
            </div>
            <h4 className="text-base font-extrabold text-slate-900 mb-2">Safari & Car Integration</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Combine your stay with seamless safari bookings in Jaldapara, Gorumara, Chilapata, plus private AC car pickup straight from your doorstep.
            </p>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col justify-between p-4 sm:p-6"
          onClick={handleCloseLightbox}
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between text-white pb-3 border-b border-white/10 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h4 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-emerald-400">
                {lightboxTitle}
              </h4>
              <p className="text-xs text-slate-400">
                Photo {lightboxIndex + 1} of {lightboxImages.length}
              </p>
            </div>

            <button
              onClick={handleCloseLightbox}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Large Image Display */}
          <div
            className="relative flex-1 flex items-center justify-center py-4 my-auto overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImages[lightboxIndex]}
              alt={`${lightboxTitle} photo ${lightboxIndex + 1}`}
              className="max-h-[70vh] sm:max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl transition-all duration-300 select-none"
            />

            {/* Prev Arrow */}
            {lightboxImages.length > 1 && (
              <button
                onClick={handlePrevImage}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-[#15803d] text-white flex items-center justify-center transition-all shadow-lg"
                title="Previous Photo (Left Arrow)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Next Arrow */}
            {lightboxImages.length > 1 && (
              <button
                onClick={handleNextImage}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-[#15803d] text-white flex items-center justify-center transition-all shadow-lg"
                title="Next Photo (Right Arrow)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnail Strip */}
          {lightboxImages.length > 1 && (
            <div
              className="pt-3 border-t border-white/10 flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto z-10 max-w-4xl mx-auto w-full px-2"
              onClick={(e) => e.stopPropagation()}
            >
              {lightboxImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className={`w-14 sm:w-16 h-10 sm:h-12 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${
                    lightboxIndex === idx
                      ? 'border-[#15803d] scale-105 shadow-md'
                      : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

