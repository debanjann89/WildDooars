import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Compass, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Package } from '../types';

interface PackageCardProps {
  packageData: Package;
  onOpenEnquiry: (contextData?: { title?: string; destination?: string; tripType?: string }) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({ packageData, onOpenEnquiry }) => {
  const parts = packageData.duration.split('/');
  const days = parts[0] ? parts[0].trim() : packageData.duration;
  const nights = parts[1] ? parts[1].trim() : '';

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-2xl transition-all overflow-hidden flex flex-col justify-between group font-sans"
    >
      <div>
        {/* Image with Pure Green / White Duration Badge */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={packageData.mainImage}
            alt={packageData.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-3 right-3 bg-[#15803d] text-white px-3.5 py-1.5 rounded-lg font-black text-xs shadow-lg uppercase border border-emerald-400/40">
            <span>{days}</span>
            {nights && <span className="block text-[10px] text-emerald-100 font-bold">{nights}</span>}
          </div>
          <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider">
            {packageData.category}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <h3 className="text-xl font-extrabold text-slate-900 mb-2 line-clamp-1 group-hover:text-[#15803d] transition-colors">
            {packageData.name}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-[#15803d] font-bold mb-3">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="line-clamp-1">{packageData.destination}</span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed mb-5 line-clamp-2">
            {packageData.shortDescription}
          </p>

          {/* Highlights bullet points */}
          <div className="space-y-1.5 text-[11px] text-slate-700 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 mb-2">
            {packageData.highlights.slice(0, 2).map((hl, i) => (
              <div key={i} className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#15803d] flex-shrink-0" />
                <span className="line-clamp-1">{hl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="p-6 pt-0 flex gap-2.5">
        <Link
          to={`/packages/${packageData.slug}`}
          className="btn-style-four flex-1 text-xs py-2.5 uppercase"
        >
          Details
        </Link>
        <button
          onClick={() => onOpenEnquiry({ title: packageData.name, destination: packageData.destination, tripType: packageData.category })}
          className="btn-style-one flex-1 text-xs py-2.5 uppercase shadow-md"
        >
          Bookings
        </button>
      </div>
    </motion.div>
  );
};
