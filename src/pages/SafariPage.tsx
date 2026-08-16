import React from 'react';
import { AlertTriangle, Send } from 'lucide-react';
import type { SafariInfo } from '../types';

interface SafariPageProps {
  safaris: SafariInfo[];
  onOpenEnquiry: (contextData?: { title?: string; tripType?: string }) => void;
}

export const SafariPage: React.FC<SafariPageProps> = ({ safaris, onOpenEnquiry }) => {
  return (
    <div className="pt-4 sm:pt-8 pb-20 font-sans bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="sec-title centered max-w-3xl mx-auto mb-10">
          <span className="section-tag">National Park Experiences</span>
          <h2>
            Wildlife & <span>Jungle Safaris</span>
          </h2>
          <div className="desc-text">
            Explore Jaldapara National Park, Gorumara, Chapramari, and Buxa Tiger Reserve through guided Jeep, Elephant, and Boat safaris.
          </div>
        </div>

        {/* Forest Department Mandatory Disclaimer */}
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-6 mb-12 max-w-4xl mx-auto flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-[#15803d] flex-shrink-0 mt-1" />
          <div className="text-xs text-slate-700 leading-relaxed font-medium">
            <strong className="block text-sm font-extrabold text-slate-900 mb-1">
              Forest Department Permit Guidelines & Disclaimer:
            </strong>
            Safari permits and elephant rides in West Bengal are strictly managed, issued, and controlled by the West Bengal Forest Department. Permit quotas are subject to daily forest limits and online/counter availability. Wild Dooars Tours & Travels provides vehicle assistance, timing guidance, and transfer support. We never guarantee instant permits or specific wildlife sightings.
          </div>
        </div>

        {/* Safari Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {safaris.map((s) => (
            <div key={s.id} className="bg-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="h-64 overflow-hidden relative">
                  <img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-[#15803d] text-white text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-400/30 uppercase tracking-wider">
                    {s.safariType}
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-xs font-extrabold text-[#15803d] uppercase tracking-wider block mb-1">
                    {s.location}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-3">{s.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{s.description}</p>
                  <p className="text-xs text-slate-800 bg-emerald-50/60 p-3.5 rounded-xl border border-emerald-100 font-medium">
                    <strong className="text-[#15803d]">Timing & Availability:</strong> {s.availabilityNote}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onOpenEnquiry({ title: s.name, tripType: 'Wildlife Tour' })}
                  className="btn-style-one w-full text-xs py-3.5 uppercase tracking-wider justify-center shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Enquire For {s.name}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
