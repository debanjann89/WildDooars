import React from 'react';
import { Car, Users, ShieldCheck } from 'lucide-react';
import type { Vehicle } from '../types';

interface CarRentalPageProps {
  vehicles: Vehicle[];
  onOpenEnquiry: (contextData?: { vehiclePreference?: string; tripType?: string }) => void;
}

export const CarRentalPage: React.FC<CarRentalPageProps> = ({ vehicles, onOpenEnquiry }) => {
  return (
    <div className="pt-4 sm:pt-8 pb-20 font-sans bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="sec-title centered max-w-3xl mx-auto mb-12">
          <span className="section-tag">Transport Services</span>
          <h2>
            Travel Comfortably Through <span>Dooars & Bhutan</span>
          </h2>
          <div className="desc-text">
            Explore Dooars with dedicated, well-maintained commercial AC vehicles and courteous drivers familiar with forest routes, mountain terrain, and station transfers.
          </div>
        </div>

        {/* Vehicle Cards Grid (NO PRICES) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {vehicles.map((v) => (
            <div key={v.id} className="bg-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="h-56 overflow-hidden relative bg-emerald-50">
                  <img src={v.image} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-[#15803d] text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {v.acType}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">{v.name}</h3>

                  <div className="flex items-center gap-2 text-xs font-extrabold text-[#15803d] mb-4 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                    <Users className="w-4 h-4 text-[#15803d]" />
                    <span>Seating Capacity: {v.seatingCapacity}</span>
                  </div>

                  <div className="space-y-2 mb-6">
                    <span className="block text-[11px] font-extrabold uppercase text-slate-500 tracking-wider">
                      Vehicle Features
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {v.features.map((feat, idx) => (
                        <span key={idx} className="bg-emerald-50 text-[#15803d] text-xs font-bold px-2.5 py-1 rounded-md border border-emerald-200">
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onOpenEnquiry({ vehiclePreference: v.name, tripType: 'Car Rental' })}
                  className="btn-style-one w-full text-xs py-3.5 uppercase tracking-wider shadow-md justify-center"
                >
                  <Car className="w-4 h-4" />
                  <span>Check Availability</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Why Book Car Rental With Us */}
        <div className="bg-[#15803d] text-white rounded-2xl p-8 md:p-12 shadow-xl border border-emerald-600">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-6 text-center">
            Why Rent a Car With Wild Dooars?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-emerald-100">
            <div className="p-5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
              <ShieldCheck className="w-6 h-6 text-emerald-200 mb-2" />
              <h4 className="text-sm font-extrabold text-white mb-1 uppercase">Experienced Drivers</h4>
              <p className="leading-relaxed">Our drivers have years of experience navigating forest roads, hill terrains, and Bhutan border checks.</p>
            </div>
            <div className="p-5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
              <ShieldCheck className="w-6 h-6 text-emerald-200 mb-2" />
              <h4 className="text-sm font-extrabold text-white mb-1 uppercase">Punctual Station Pickups</h4>
              <p className="leading-relaxed">Timely pickups from Bagdogra Airport, NJP, Hasimara, Mal Junction, and New Alipurduar stations.</p>
            </div>
            <div className="p-5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
              <ShieldCheck className="w-6 h-6 text-emerald-200 mb-2" />
              <h4 className="text-sm font-extrabold text-white mb-1 uppercase">Clean & Disinfected Fleet</h4>
              <p className="leading-relaxed">All cars undergo thorough cleaning, air conditioning servicing, and safety checks before every tour.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
