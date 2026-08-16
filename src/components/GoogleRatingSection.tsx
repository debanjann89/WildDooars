import React from 'react';
import { Star, MapPin, ExternalLink, ThumbsUp } from 'lucide-react';
import type { BusinessSettings } from '../types';

interface GoogleRatingSectionProps {
  settings: BusinessSettings;
}

export const GoogleRatingSection: React.FC<GoogleRatingSectionProps> = ({ settings }) => {
  return (
    <section className="py-16 bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-900 text-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d49b35_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/15 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Rating Badge */}
          <div className="text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Verified Google Business</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white mb-2">
              Loved by Travelers Exploring Dooars
            </h2>

            <p className="text-stone-300 text-sm max-w-lg mb-4">
              Visitors appreciate our well-organized trips, smooth transportation, local area knowledge, and helpful guidance near Jaldapara National Park.
            </p>

            <div className="flex items-center gap-2 text-xs text-stone-300">
              <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{settings.address} ({settings.plusCode})</span>
            </div>
          </div>

          {/* Score Box */}
          <div className="bg-stone-900/90 border border-amber-500/40 rounded-2xl p-6 text-center min-w-[260px] shadow-xl">
            <div className="text-5xl font-extrabold text-amber-400 mb-1 flex items-center justify-center gap-2">
              <span>4.8</span>
              <div className="flex text-amber-400 text-2xl">
                {'★'.repeat(5)}
              </div>
            </div>

            <div className="text-sm font-bold text-white mb-1">
              Google Maps Rating
            </div>

            <div className="text-xs text-stone-400 mb-4">
              Based on {settings.reviewsCount}
            </div>

            {settings.googleMapsUrl && (
              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent text-xs py-2 px-4 w-full justify-center"
              >
                View Us on Google
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
