import React, { useState } from 'react';
import { Search, Calendar, Users, MapPin, Sparkles } from 'lucide-react';

interface HeroEnquiryWidgetProps {
  onOpenEnquiry: (contextData?: { destination?: string; tripType?: string }) => void;
}

export const HeroEnquiryWidget: React.FC<HeroEnquiryWidgetProps> = ({ onOpenEnquiry }) => {
  const [destination, setDestination] = useState('');
  const [tripType, setTripType] = useState('Family Trip');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenEnquiry({
      destination: destination || 'All Dooars',
      tripType: tripType,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto -mt-10 sm:-mt-14 relative z-20 px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-stone-200/80 p-4 sm:p-6 backdrop-blur-md">
        <div className="flex items-center gap-2 mb-3 text-emerald-900 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Quick Dooars Trip Planner</span>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
          {/* Destination */}
          <div>
            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
              Destination
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-emerald-700 absolute left-3 top-3" />
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              >
                <option value="">All Destinations</option>
                <option value="Jaldapara National Park">Jaldapara National Park</option>
                <option value="Buxa Tiger Reserve & Jayanti">Buxa Tiger Reserve & Jayanti</option>
                <option value="Gorumara National Park">Gorumara National Park</option>
                <option value="Phuentsholing (Bhutan Border)">Phuentsholing (Bhutan)</option>
                <option value="Cooch Behar">Cooch Behar</option>
              </select>
            </div>
          </div>

          {/* Trip Type */}
          <div>
            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
              Trip Category
            </label>
            <div className="relative">
              <Users className="w-4 h-4 text-emerald-700 absolute left-3 top-3" />
              <select
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              >
                <option value="Family Trip">Family Trip</option>
                <option value="Honeymoon Trip">Honeymoon Trip</option>
                <option value="Adventure Trip">Adventure Trip</option>
                <option value="Wildlife Tour">Wildlife Tour</option>
                <option value="Package Tour">Package Tour</option>
                <option value="Customized Trip">Customized Trip</option>
              </select>
            </div>
          </div>

          {/* Travel Date */}
          <div>
            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1">
              Travel Month / Date
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-emerald-700 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="e.g. October 2026"
                className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
            </div>
          </div>

          {/* Search CTA */}
          <div>
            <button
              type="submit"
              className="btn btn-primary w-full py-2.5 text-sm uppercase tracking-wider font-bold shadow-md hover:shadow-lg"
            >
              <Search className="w-4 h-4" />
              Plan My Trip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
