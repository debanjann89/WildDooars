import React from 'react';
import { PhoneCall, HelpCircle } from 'lucide-react';
import type { BusinessSettings } from '../types';

interface QuestionsSupportStripProps {
  settings?: BusinessSettings | null;
}

export const QuestionsSupportStrip: React.FC<QuestionsSupportStripProps> = ({ settings }) => {
  const phone = settings?.phone || '081164 42729';

  return (
    <section className="py-12 bg-[#15803d] text-white border-y border-emerald-700 font-sans">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-4xl mx-auto text-center">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-full bg-white text-[#15803d] flex items-center justify-center flex-shrink-0 shadow-md mx-auto sm:mx-0">
              <HelpCircle className="w-8 h-8" />
            </div>
            <div>
              <span className="block font-extrabold uppercase text-xl text-white">
                Have any Questions?
              </span>
              <span className="text-xs text-emerald-100">
                Call our travel desk anytime for assistance with car bookings & safaris
              </span>
            </div>
          </div>

          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="flex items-center justify-center gap-3 bg-[#0a1f14] text-white px-8 py-3.5 rounded-full font-black text-xl hover:bg-emerald-950 transition-all shadow-lg border-2 border-emerald-400"
          >
            <PhoneCall className="w-6 h-6 text-emerald-400" />
            <span>{phone}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
