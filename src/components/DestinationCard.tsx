import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Destination } from '../types';

interface DestinationCardProps {
  destination: Destination;
  onOpenEnquiry: (contextData?: { destination?: string; tripType?: string }) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination, onOpenEnquiry }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-2xl transition-all overflow-hidden flex flex-col justify-between group font-sans"
    >
      <div>
        {/* Photo Container */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={destination.mainImage}
            alt={destination.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-3 left-3 bg-[#15803d] text-white px-3 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider shadow-md">
            Popular Destination
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <h3 className="text-xl font-extrabold text-slate-900 mb-2 line-clamp-1 group-hover:text-[#15803d] transition-colors">
            {destination.name}
          </h3>

          <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
            {destination.intro}
          </p>

          <div className="space-y-1.5 text-[11px] text-slate-700 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 mb-2">
            <strong className="block text-[#15803d] uppercase font-extrabold mb-1">Key Attractions:</strong>
            {destination.attractions.slice(0, 3).map((att, i) => (
              <div key={i} className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#15803d] flex-shrink-0" />
                <span className="line-clamp-1">{att}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="p-6 pt-0 flex gap-2.5">
        <Link
          to={`/destinations/${destination.slug}`}
          className="btn-style-four flex-1 text-xs py-2.5 uppercase"
        >
          Explore
        </Link>
        <button
          onClick={() => onOpenEnquiry({ destination: destination.name, tripType: 'Custom Tour' })}
          className="btn-style-one flex-1 text-xs py-2.5 uppercase shadow-md"
        >
          Bookings
        </button>
      </div>
    </motion.div>
  );
};
