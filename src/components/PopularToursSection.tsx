import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Star, Tag, Calendar, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Package } from '../types';

interface PopularToursSectionProps {
  packages: Package[];
  onOpenEnquiry: (contextData?: { title?: string; destination?: string; tripType?: string }) => void;
}

export const PopularToursSection: React.FC<PopularToursSectionProps> = ({ packages, onOpenEnquiry }) => {
  return (
    <section className="py-20 bg-white border-b border-slate-100 font-sans">
      <div className="container">
        {/* Section Header */}
        <div className="sec-title centered">
          <span className="section-tag">
            Customized Holiday Trips
          </span>
          <h2>
            Our Popular <span>Tours</span>
          </h2>
          <div className="desc-text">
            Our packages are well customized by travel experts so that you get the best possible trip to Dooars and Bhutan.
          </div>
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, idx) => {
            const packageId = `GC-08${idx + 1}`;
            const parts = pkg.duration.split('/');
            const nights = parts[1] ? parts[1].trim() : '3 NIGHTS';
            const days = parts[0] ? parts[0].trim() : '4 DAYS';

            return (
              <motion.div
                key={pkg.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-2xl transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* High-res Image with Pure Green / White Duration Badge */}
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    <img
                      src={pkg.mainImage}
                      alt={pkg.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3 bg-[#15803d] text-white px-3 py-1.5 rounded-lg text-center font-black text-xs shadow-lg uppercase border border-emerald-400/40">
                      <span className="block">{nights.toUpperCase()}</span>
                      <span className="block text-[10px] text-emerald-100 font-bold">{days.toUpperCase()}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-extrabold text-slate-900 mb-1 line-clamp-1 group-hover:text-[#15803d] transition-colors">
                      {pkg.name}
                    </h3>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1 text-amber-400 text-xs mb-3">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                    </div>

                    <div className="space-y-1.5 text-[11px] text-slate-700 mb-4 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
                      <div className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-[#15803d] flex-shrink-0" />
                        <strong>PACKAGE ID : </strong>
                        <span className="font-mono text-[#15803d] font-bold">{packageId}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#15803d] flex-shrink-0" />
                        <strong>DURATION : </strong> {pkg.duration.toUpperCase()}
                      </div>
                      <div className="line-clamp-2">
                        <strong>PLACES COVERED : </strong> {pkg.destination.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="p-5 pt-0 flex gap-2">
                  <Link
                    to={`/packages/${pkg.slug}`}
                    className="btn-style-four flex-1 text-[11px] py-2 uppercase"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => onOpenEnquiry({ title: pkg.name, destination: pkg.destination, tripType: pkg.category })}
                    className="btn-style-one flex-1 text-[11px] py-2 uppercase shadow-md"
                  >
                    Bookings
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
