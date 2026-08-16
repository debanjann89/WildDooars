import React, { useState } from 'react';
import { Hotel as HotelIcon, MapPin, CheckCircle2, Send } from 'lucide-react';
import type { Hotel } from '../types';

interface HotelsPageProps {
  hotels: Hotel[];
  onOpenEnquiry: (contextData?: { hotelPreference?: string; tripType?: string }) => void;
}

export const HotelsPage: React.FC<HotelsPageProps> = ({ hotels, onOpenEnquiry }) => {
  const [filterType, setFilterType] = useState<string>('All');

  const propertyTypes = ['All', 'Hotel', 'Resort', 'Homestay'];

  const filteredHotels =
    filterType === 'All' ? hotels : hotels.filter((h) => h.propertyType === filterType);

  return (
    <div className="pt-4 sm:pt-8 pb-20 font-sans bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="sec-title centered max-w-3xl mx-auto mb-10">
          <span className="section-tag">Accommodations</span>
          <h2>
            Stay Your Way <span>in Dooars</span>
          </h2>
          <div className="desc-text">
            We partner with the finest jungle resorts, riverside lodges, and eco-homestays across Jaldapara, Lataguri, Murti, and Jayanti.
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 mb-10">
          {propertyTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-5 py-2 text-xs font-extrabold rounded-full transition-all uppercase tracking-wider ${
                filterType === type
                  ? 'bg-[#15803d] text-white shadow-md scale-105 border border-[#15803d]'
                  : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
              }`}
            >
              {type === 'All' ? 'All Accommodations' : `${type}s`}
            </button>
          ))}
        </div>

        {/* Property Grid (NO PRICES) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.map((h) => (
            <div key={h.id} className="bg-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="h-56 overflow-hidden relative">
                  <img src={h.image} alt={h.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-[#15803d] text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {h.propertyType}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs text-[#15803d] font-bold mb-2">
                    <MapPin className="w-3.5 h-3.5 text-[#15803d] flex-shrink-0" />
                    <span>{h.location}</span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 uppercase tracking-tight mb-3">{h.name}</h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{h.description}</p>

                  {/* Amenities Tags */}
                  {h.amenities && h.amenities.length > 0 && (
                    <div className="space-y-2 mb-4 pt-3 border-t border-emerald-100">
                      <span className="block text-[11px] font-extrabold uppercase text-slate-500 tracking-wider">
                        Key Amenities
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {h.amenities.map((am, idx) => (
                          <span key={idx} className="bg-emerald-50 text-[#15803d] text-[11px] font-bold px-2.5 py-0.5 rounded-md border border-emerald-200">
                            {am}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onOpenEnquiry({ hotelPreference: h.name, tripType: 'Hotel Booking' })}
                  className="btn-style-one w-full text-xs py-3.5 uppercase tracking-wider shadow-md justify-center"
                >
                  <HotelIcon className="w-4 h-4" />
                  <span>Check Availability</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
