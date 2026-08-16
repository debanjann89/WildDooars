import React from 'react';
import { Car, Star, Users } from 'lucide-react';
import type { Vehicle } from '../types';

interface LatestVehiclesSectionProps {
  vehicles: Vehicle[];
  onOpenEnquiry: (contextData?: { vehiclePreference?: string; tripType?: string }) => void;
}

export const LatestVehiclesSection: React.FC<LatestVehiclesSectionProps> = ({ vehicles, onOpenEnquiry }) => {
  return (
    <section className="py-20 bg-white border-b border-slate-100 font-sans">
      <div className="container">
        {/* Section Title matching bhutandooars.com */}
        <div className="sec-title centered">
          <div className="icon-box">
            <Car className="w-10 h-10 mx-auto text-[#15803d]" />
          </div>
          <h2>
            Our Latest <span>Vehicles</span>
          </h2>
          <div className="desc-text">
            Clean, well-maintained SUVs, MUVs, and sedans driven by expert mountain chauffeurs.
          </div>
        </div>

        {/* Vehicle Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicles.map((veh) => (
            <div
              key={veh.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all p-5 flex flex-col justify-between text-center group"
            >
              <div>
                {/* Vehicle Image */}
                <div className="h-44 flex items-center justify-center overflow-hidden mb-4 bg-emerald-50/50 rounded-lg p-2">
                  <img
                    src={veh.image}
                    alt={veh.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Vehicle Name */}
                <h3 className="text-xl font-extrabold text-slate-900 mb-1">{veh.name}</h3>

                {/* Rating Stars matching reference website */}
                <div className="flex items-center justify-center gap-1 text-amber-400 text-xs mb-3">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>

                {/* Specs Pill (NO PRICES) */}
                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 mb-4 bg-emerald-50 p-2 rounded border border-emerald-100">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#15803d]" />
                    {veh.seatingCapacity}
                  </span>
                  <span>·</span>
                  <span className="text-[#15803d]">{veh.acType}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onOpenEnquiry({ vehiclePreference: veh.name, tripType: 'Car Rental' })}
                className="btn-style-four w-full text-xs uppercase py-2.5"
              >
                Rent a Car
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
