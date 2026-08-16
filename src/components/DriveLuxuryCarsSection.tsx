import React from 'react';
import { Car, ClipboardList, ShieldCheck, Smile } from 'lucide-react';

export const DriveLuxuryCarsSection: React.FC = () => {
  const steps = [
    {
      icon: ClipboardList,
      title: 'Book Your Car',
      desc: 'Select your preferred vehicle and travel dates. Our travel team verifies availability instantly.'
    },
    {
      icon: ShieldCheck,
      title: 'Confirm & Relax',
      desc: 'Get confirmation for your station pickup, driver details, and itinerary arrangements.'
    },
    {
      icon: Smile,
      title: 'Ride the Car',
      desc: 'Enjoy a smooth, comfortable journey through Dooars forests, tea gardens, and Bhutan hills.'
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-stone-200">
      <div className="container">
        <div className="sec-title centered">
          <div className="icon-box">
            <Car className="w-10 h-10 mx-auto text-amber-500" />
          </div>
          <h2>
            Drive a Luxury Car <span>Everyday</span>
          </h2>
          <div className="desc-text">
            Simple 3-step process to arrange reliable transport across Dooars and North Bengal.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div
                key={i}
                className="bg-[#f8f9fa] p-8 rounded-2xl border border-stone-200 text-center hover:border-amber-400 hover:shadow-lg transition-all group"
              >
                <div className="w-16 h-16 rounded-full bg-[#1c1e21] text-amber-400 flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-500 group-hover:text-[#1c1e21] transition-colors shadow-md">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold text-[#1c1e21] mb-2">{st.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{st.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
