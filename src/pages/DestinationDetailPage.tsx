import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Compass, Send, CheckCircle2, ShieldCheck, ArrowLeft, Camera, Trees } from 'lucide-react';
import { apiService } from '../services/api';
import type { Destination, BusinessSettings } from '../types';

interface DestinationDetailPageProps {
  settings: BusinessSettings;
  onOpenEnquiry: (contextData?: { destination?: string; tripType?: string }) => void;
}

export const DestinationDetailPage: React.FC<DestinationDetailPageProps> = ({ settings, onOpenEnquiry }) => {
  const { slug } = useParams<{ slug: string }>();
  const [dest, setDest] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDestination() {
      if (slug) {
        const found = await apiService.getDestinationBySlug(slug);
        setDest(found);
      }
      setLoading(false);
    }
    loadDestination();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 text-center container font-sans">
        <div className="w-12 h-12 border-4 border-[#15803d] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-600 font-bold text-sm">Loading destination details...</p>
      </div>
    );
  }

  if (!dest) {
    return (
      <div className="pt-32 pb-20 text-center container font-sans">
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">Destination Not Found</h2>
        <Link to="/destinations" className="btn-style-three text-xs py-2.5 px-6 uppercase">
          Back to Destinations
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-0 pb-10 font-sans bg-white">
      {/* Breadcrumb */}
      <div className="bg-emerald-50/60 py-3 border-b border-emerald-100">
        <div className="container flex items-center gap-2 text-xs text-slate-600 font-semibold">
          <Link to="/" className="hover:text-[#15803d]">Home</Link>
          <span>/</span>
          <Link to="/destinations" className="hover:text-[#15803d]">Destinations</Link>
          <span>/</span>
          <span className="font-extrabold text-[#15803d] truncate">{dest.name}</span>
        </div>
      </div>

      {/* Destination Hero Banner */}
      <section className="relative bg-slate-950 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-85">
          <img src={dest.mainImage} alt={dest.name} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-black/50 to-black/30" />

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#15803d] text-white px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-4 border border-emerald-400/30">
              <Trees className="w-4 h-4 text-emerald-200" />
              <span>Prime Dooars Destination</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black uppercase text-white mb-4 leading-tight tracking-tight drop-shadow-lg">
              {dest.name}
            </h1>

            <p className="text-xs sm:text-base text-emerald-100 max-w-2xl leading-relaxed mb-6 font-medium">
              {dest.intro}
            </p>

            <button
              onClick={() => onOpenEnquiry({ destination: dest.name, tripType: 'Destination Tour' })}
              className="btn-style-one text-xs py-3.5 px-8 uppercase tracking-wider shadow-xl"
            >
              <Send className="w-4 h-4" />
              <span>Book Tour To {dest.name}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-emerald-100 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-black uppercase text-slate-900 tracking-tight mb-4">About {dest.name}</h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                {dest.description}
              </p>
            </div>

            {/* Top Attractions */}
            {dest.attractions && dest.attractions.length > 0 && (
              <div className="bg-emerald-50/60 p-6 sm:p-8 rounded-2xl border border-emerald-200/80">
                <h2 className="text-xl sm:text-2xl font-black uppercase text-slate-900 tracking-tight mb-4">Key Sightseeing Attractions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dest.attractions.map((att, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-semibold bg-white p-3.5 rounded-xl border border-emerald-100">
                      <ShieldCheck className="w-4 h-4 text-[#15803d] flex-shrink-0 mt-0.5" />
                      <span>{att}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Things To Do */}
            {dest.activities && dest.activities.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-emerald-100 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-black uppercase text-slate-900 tracking-tight mb-4">Things To Do & Experiences</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dest.activities.map((act, i) => (
                    <div key={i} className="flex items-center gap-3 bg-emerald-50/40 p-3.5 rounded-xl border border-emerald-100 text-xs sm:text-sm font-bold text-[#15803d]">
                      <Camera className="w-4 h-4 text-[#15803d]" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Photo Gallery */}
            {dest.gallery && dest.gallery.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-emerald-100 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-black uppercase text-slate-900 tracking-tight mb-4">Destination Photo Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {dest.gallery.map((img, i) => (
                    <div key={i} className="h-44 rounded-xl overflow-hidden shadow-sm border border-emerald-100">
                      <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column Sticky Card */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-xl sticky top-24">
              <span className="text-[#15803d] text-xs font-extrabold uppercase tracking-wider block mb-1">
                Local Travel Desk
              </span>
              <h3 className="text-2xl font-black uppercase text-slate-900 tracking-tight mb-3">
                Visit {dest.name}
              </h3>
              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                Contact our local desk near Jaldapara to book dedicated AC car rentals, resort homestays, and safari tickets for {dest.name}.
              </p>

              <button
                onClick={() => onOpenEnquiry({ destination: dest.name, tripType: 'Custom Destination Tour' })}
                className="btn-style-one w-full py-3.5 text-xs uppercase tracking-wider shadow-md justify-center mb-3"
              >
                <Send className="w-4 h-4" />
                <span>Enquire For This Destination</span>
              </button>

              <a
                href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
                  `Hello Wild Dooars Tours & Travels, I am interested in visiting [${dest.name}]. Please share travel details.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-style-three w-full py-3.5 text-xs uppercase tracking-wider shadow-md justify-center flex"
              >
                <span>WhatsApp Instant Inquiry</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
