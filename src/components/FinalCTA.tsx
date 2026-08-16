import React from 'react';
import { MessageCircle, Compass } from 'lucide-react';
import type { BusinessSettings } from '../types';

interface FinalCTAProps {
  settings: BusinessSettings;
  onOpenEnquiry: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ settings, onOpenEnquiry }) => {
  const whatsappUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    'Hello Wild Dooars Tours & Travels, I would like to plan a trip to Dooars. Please assist me.'
  )}`;

  return (
    <section className="py-20 bg-emerald-950 text-white relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d49b35_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="container relative z-10 text-center max-w-3xl mx-auto px-4">
        <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-3">
          Start Your Journey Today
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-white mb-6">
          Your Dooars Adventure Starts Here
        </h2>
        <p className="text-stone-300 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
          Tell us where you want to go, what you want to experience, and when you want to travel. We’ll help you plan the journey.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenEnquiry}
            className="btn btn-accent w-full sm:w-auto text-base py-3.5 px-8 font-bold uppercase tracking-wider"
          >
            <Compass className="w-5 h-5" />
            Plan My Trip
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp w-full sm:w-auto text-base py-3.5 px-8 font-bold"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
};
