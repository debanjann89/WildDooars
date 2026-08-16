import React from 'react';
import { Plane, Train, Car, ArrowRight } from 'lucide-react';

interface PickupDropSectionProps {
  onOpenEnquiry: (contextData?: { vehiclePreference?: string; tripType?: string }) => void;
}

export const PickupDropSection: React.FC<PickupDropSectionProps> = ({ onOpenEnquiry }) => {
  const hubs = [
    { type: 'Airport', name: 'Bagdogra Airport (IXB)', note: 'Gateway for flight travelers' },
    { type: 'Station', name: 'NJP Railway Station (Siliguri)', note: 'Main rail junction for North Bengal' },
    { type: 'Station', name: 'Hasimara Railway Station', note: 'Closest station for Jaldapara & Bhutan' },
    { type: 'Station', name: 'Mal Junction', note: 'Ideal for Western Dooars & Gorumara' },
    { type: 'Station', name: 'Falakata Railway Station', note: 'Convenient station near Madarihat' },
    { type: 'Station', name: 'New Alipurduar Junction', note: 'Closest for Buxa & Jayanti tours' },
    { type: 'Station', name: 'New Cooch Behar Station', note: 'Direct route to royal heritage sites' },
    { type: 'City', name: 'Siliguri City Hub', note: 'Hotel pickups & central transfers' },
  ];

  return (
    <section className="py-20 bg-white border-t border-emerald-100 font-sans">
      <div className="container">
        {/* Section Header */}
        <div className="sec-title centered">
          <span className="section-tag">Smooth Transfers</span>
          <h2>Airport & Railway <span>Pickup & Drop</span></h2>
          <div className="desc-text">
            Punctual, comfortable pickup and drop services across all major transit hubs in North Bengal directly to your Dooars resort.
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {hubs.map((hub, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 hover:border-[#15803d] hover:bg-emerald-50 transition-all flex items-start gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#15803d] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                {hub.type === 'Airport' ? <Plane className="w-5 h-5" /> : <Train className="w-5 h-5" />}
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-slate-900">{hub.name}</h4>
                <p className="text-xs text-slate-600 mt-0.5">{hub.note}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Card with Pure White Text */}
        <div className="bg-[#15803d] text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-emerald-600">
          <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
            <div className="w-14 h-14 rounded-2xl bg-white text-[#15803d] flex items-center justify-center flex-shrink-0 shadow-md">
              <Car className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold !text-white uppercase tracking-tight">Need a Dedicated Pickup Vehicle?</h3>
              <p className="text-emerald-100 text-xs sm:text-sm mt-1">
                Book Innova, Bolero, Ertiga, or Dzire for seamless station and airport pickup with experienced mountain drivers.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenEnquiry({ tripType: 'Car Rental', vehiclePreference: 'Station/Airport Pickup' })}
            className="bg-white text-[#15803d] hover:bg-emerald-50 px-8 py-3.5 rounded-lg font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex-shrink-0 flex items-center gap-2"
          >
            <span>Arrange My Pickup</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
