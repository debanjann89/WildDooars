import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Which is the best time of year to visit Dooars?',
      a: 'October to May is the best time to visit Dooars. The climate is pleasant, and national parks are open for jungle safaris. All national parks (Jaldapara, Gorumara, Chapramari) remain closed during monsoon from 15th June to 16th September.'
    },
    {
      q: 'How can I book Jaldapara Jeep or Elephant Safaris?',
      a: 'Forest safaris are managed and operated strictly by the West Bengal Forest Department. Permits are issued directly at counter gates (Madarihat for Jaldapara, Lataguri for Gorumara) or online. We provide full guidance and vehicle arrangements to ensure you reach counter points on time.'
    },
    {
      q: 'Which railway station or airport is nearest to Jaldapara?',
      a: 'Hasimara Railway Station (12 km) and Falakata Railway Station (20 km) are the closest stations. NJP Railway Station and Bagdogra Airport (IXB) are approximately 125-135 km away with scenic 3-hour highway drives.'
    },
    {
      q: 'What types of vehicles do you provide for Dooars sightseeing?',
      a: 'We provide Toyota Innova, Mahindra Bolero, Tata Sumo, Maruti Ertiga, Swift Dzire, and WagonR with experienced drivers who know North Bengal roads and local destinations inside out.'
    },
    {
      q: 'Can you organize customized family or honeymoon packages?',
      a: 'Yes! We specialize in customized itineraries. Whether you want a 3-day short weekend trip, a 6-day complete Dooars circuit, or romantic riverfront stay, we tailor the itinerary around your preferences.'
    }
  ];

  return (
    <section className="py-20 bg-white border-t border-stone-200">
      <div className="container max-w-4xl mx-auto">
        <div className="section-header text-center">
          <span className="section-tag">Common Questions</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-desc">
            Everything you need to know about planning your Dooars travel experience.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-stone-200 rounded-xl overflow-hidden transition-all bg-stone-50/50"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-emerald-950 hover:text-emerald-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <span className="text-base">{faq.q}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-500 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-emerald-900' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-stone-600 border-t border-stone-200/60 leading-relaxed bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
