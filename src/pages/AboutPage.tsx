import React from 'react';
import { Compass, MapPin, Phone, ShieldCheck, Heart, Users, Car, Trees, Award, Star, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { BusinessSettings } from '../types';

interface AboutPageProps {
  settings: BusinessSettings;
  onOpenEnquiry: (contextData?: { tripType?: string }) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ settings, onOpenEnquiry }) => {
  const stats = [
    { value: '4.8 ★', label: 'Google Maps Rating', sub: '97+ Verified Reviews' },
    { value: '5,000+', label: 'Happy Travelers', sub: 'Guided Across Dooars' },
    { value: '10+ Yrs', label: 'Local Experience', sub: 'Based Near Jaldapara' },
    { value: '100%', label: 'Commercial Fleet', sub: 'Certified Mountain Drivers' },
  ];

  const coreValues = [
    {
      icon: Trees,
      title: 'Wildlife & Eco-Tourism Commitment',
      desc: 'We strictly adhere to Forest Department regulations, promoting responsible eco-tourism that respects the natural habitat of One-Horned Rhinoceros, elephants, and rare avian species.'
    },
    {
      icon: Users,
      title: 'Expert Mountain Chauffeurs',
      desc: 'Our drivers are local residents of Dooars who possess years of hill driving experience, fluency in regional routes, and deep knowledge of forest gates and tea estates.'
    },
    {
      icon: ShieldCheck,
      title: 'Transparent & Fair Service',
      desc: 'We believe in clear communication with zero hidden fees. Inquiries require no advance payment, and all trip details are explained transparently before booking.'
    },
    {
      icon: Heart,
      title: 'Personalized Hospitality',
      desc: 'From serene riverfront homestays along the Murti River to family-friendly resorts near Lataguri and Jaldapara, we curate stays tailored to your comfort and group needs.'
    }
  ];

  const specializationList = [
    'Jaldapara & Gorumara National Park Jeep Safari Permits',
    'Bagdogra Airport (IXB) & NJP Railway Station AC Car Transfers',
    'Hasimara, New Alipurduar & New Cooch Behar Station Pickups',
    'Phuentsholing & Cross-Border Bhutan Cultural Day Circuits',
    'Tea Estate Bungalow Stays & Riverside Homestay Reservations',
    'Customized Family Vacation & Honeymoon Special Packages'
  ];

  return (
    <div className="w-full font-sans bg-white">
      {/* 1. Hero Header Banner */}
      <section className="bg-[#15803d] text-white py-20 relative overflow-hidden border-b border-emerald-700">
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#166534] px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider mb-4 border border-emerald-400/40 text-emerald-200"
          >
            <Trees className="w-4 h-4 text-emerald-200" />
            <span>Local Dooars Experts Near Jaldapara</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4"
          >
            About {settings.businessName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm text-emerald-100 max-w-2xl mx-auto leading-relaxed"
          >
            Rooted near Jaldapara National Park, we are dedicated to crafting unforgettable journeys across the forests, tea gardens, rivers, and royal heritage of Dooars & Bhutan.
          </motion.p>
        </div>
      </section>

      {/* 2. Impact Stats Counter Strip */}
      <section className="py-10 bg-emerald-50/50 border-b border-emerald-100">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((st, i) => (
              <div key={i} className="p-4 bg-white rounded-2xl border border-emerald-100 shadow-sm">
                <span className="block text-2xl sm:text-3xl font-black text-[#15803d] mb-1">{st.value}</span>
                <span className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider">{st.label}</span>
                <span className="block text-[11px] text-slate-500 mt-0.5">{st.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Our Story & Heritage Narrative */}
      <section className="py-20">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="section-tag">Our Roots & Journey</span>
              <h2 className="text-3xl font-black uppercase text-slate-900 tracking-tight">
                Born in the Heart of <span>Wild Dooars</span>
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Situated at Badaitari near Jaldapara National Park, <strong>Wild Dooars Tours & Travels</strong> was founded with a single mission: to provide travelers with authentic, safe, and hassle-free access to the pristine wilderness of North Bengal.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                The Dooars region — derived from the word <em>'Dooars'</em> meaning <em>Doorways</em> to Bhutan — is a magical tapestry of dense monsoon forests, rushing riverbeds, tea plantations, and indigenous tribal culture. Operating locally allows us to manage every detail directly, from station pickups to safari permits.
              </p>
            </div>

            <div className="lg:col-span-6 bg-emerald-50/70 p-8 rounded-2xl border border-emerald-200/80 space-y-4">
              <h3 className="text-xl font-extrabold uppercase text-slate-900 mb-2">
                What Sets Us Apart?
              </h3>
              <div className="space-y-3 text-xs text-slate-700 font-semibold">
                <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-emerald-100">
                  <CheckCircle2 className="w-5 h-5 text-[#15803d] flex-shrink-0" />
                  <span>Direct physical desk near Jaldapara Core Gate (Madarihat)</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-emerald-100">
                  <CheckCircle2 className="w-5 h-5 text-[#15803d] flex-shrink-0" />
                  <span>Commercial AC fleet: Toyota Innova, Bolero, Ertiga, Swift Dzire</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-emerald-100">
                  <CheckCircle2 className="w-5 h-5 text-[#15803d] flex-shrink-0" />
                  <span>Licensed forest guide network for Jaldapara & Gorumara</span>
                </div>
                <div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-emerald-100">
                  <CheckCircle2 className="w-5 h-5 text-[#15803d] flex-shrink-0" />
                  <span>Customized itineraries for families, couples & photography groups</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values Grid */}
      <section className="py-20 bg-emerald-50/40 border-y border-emerald-100">
        <div className="container">
          <div className="sec-title centered max-w-3xl mx-auto">
            <span className="section-tag">Our Guiding Principles</span>
            <h2>Our Core <span>Values & Philosophy</span></h2>
            <div className="desc-text">
              Every trip we organize is guided by our commitment to traveler satisfaction, local community support, and wildlife preservation.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm hover:border-[#15803d] hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#15803d] flex items-center justify-center mb-4 border border-emerald-200">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 mb-2">{val.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Our Specializations Checklist */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-emerald-200 shadow-xl">
            <h2 className="text-2xl font-black uppercase text-slate-900 mb-2 text-center">
              Our Core Services & Specializations
            </h2>
            <p className="text-xs text-slate-600 text-center max-w-xl mx-auto mb-8">
              We offer end-to-end travel solutions across North Bengal & Bhutan, ensuring seamless coordination from your arrival to departure.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {specializationList.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                  <ShieldCheck className="w-5 h-5 text-[#15803d] flex-shrink-0" />
                  <span className="text-xs font-bold text-slate-800">{item}</span>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => onOpenEnquiry()}
                className="btn-style-one text-xs uppercase py-3.5 px-8 shadow-md"
              >
                <span>Plan Your Trip With Our Desk</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
