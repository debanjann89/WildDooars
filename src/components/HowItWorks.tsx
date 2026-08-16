import React from 'react';
import { MessageSquare, CalendarCheck, ShieldCheck, Compass } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Tell Us Your Plan',
      desc: 'Share your preferred travel dates, destination ideas, group size, and vehicle preferences.',
      icon: MessageSquare
    },
    {
      num: '02',
      title: 'We Plan Your Journey',
      desc: 'Our local team near Jaldapara designs a customized itinerary suited to your dates.',
      icon: CalendarCheck
    },
    {
      num: '03',
      title: 'Confirm Your Arrangements',
      desc: 'We coordinate your resort stays, car rental, and safari permits guidance.',
      icon: ShieldCheck
    },
    {
      num: '04',
      title: 'Explore Dooars',
      desc: 'Arrive at the airport or railway station and enjoy a smooth, unforgettable vacation.',
      icon: Compass
    }
  ];

  return (
    <section className="py-20 bg-stone-100 border-t border-stone-200">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Simple Process</span>
          <h2 className="section-title">How It Works</h2>
          <p className="section-desc">
            Planning your trip to Dooars is quick and stress-free in four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm relative group hover:shadow-lg transition-all"
              >
                <div className="text-4xl font-extrabold text-amber-500/30 font-serif mb-4 group-hover:text-amber-500 transition-colors">
                  {step.num}
                </div>
                <div className="w-10 h-10 rounded-lg bg-emerald-900 text-amber-400 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-emerald-950 mb-2">{step.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
