import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, MapPin, CheckCircle2, XCircle, Send, MessageCircle, Info, ShieldCheck, ArrowLeft, Trees } from 'lucide-react';
import { apiService } from '../services/api';
import type { Package, BusinessSettings } from '../types';

interface PackageDetailPageProps {
  settings: BusinessSettings;
  onOpenEnquiry: (contextData?: { title?: string; destination?: string; tripType?: string }) => void;
}

export const PackageDetailPage: React.FC<PackageDetailPageProps> = ({ settings, onOpenEnquiry }) => {
  const { slug } = useParams<{ slug: string }>();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPackage() {
      if (slug) {
        const found = await apiService.getPackageBySlug(slug);
        setPkg(found);
      }
      setLoading(false);
    }
    loadPackage();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 text-center container font-sans">
        <div className="w-12 h-12 border-4 border-[#15803d] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-600 font-bold text-sm">Loading package details...</p>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="pt-32 pb-20 text-center container font-sans">
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">Package Not Found</h2>
        <Link to="/packages" className="btn-style-three text-xs py-2.5 px-6 uppercase">
          Back to Packages
        </Link>
      </div>
    );
  }

  const whatsappPackageUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(
    `Hello Wild Dooars Tours & Travels, I am interested in [${pkg.name}]. Please share availability and details.`
  )}`;

  return (
    <div className="pt-0 pb-10 font-sans bg-white">
      {/* Top Breadcrumb */}
      <div className="bg-emerald-50/60 py-3 border-b border-emerald-100">
        <div className="container flex items-center gap-2 text-xs text-slate-600 font-semibold">
          <Link to="/" className="hover:text-[#15803d]">Home</Link>
          <span>/</span>
          <Link to="/packages" className="hover:text-[#15803d]">Packages</Link>
          <span>/</span>
          <span className="font-extrabold text-[#15803d] truncate">{pkg.name}</span>
        </div>
      </div>

      {/* Package Hero Banner */}
      <section className="relative bg-slate-950 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-85">
          <img src={pkg.mainImage} alt={pkg.name} className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-black/50 to-black/30" />

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="bg-[#15803d] text-white text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-400/30">
                {pkg.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-emerald-200 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-full font-bold">
                <Clock className="w-3.5 h-3.5 text-emerald-300" />
                <span>{pkg.duration}</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase text-white mb-4 leading-tight tracking-tight drop-shadow-lg">
              {pkg.name}
            </h1>

            <div className="flex items-center gap-2 text-emerald-200 text-xs sm:text-sm font-semibold mb-6">
              <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{pkg.destination}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() =>
                  onOpenEnquiry({
                    title: pkg.name,
                    destination: pkg.destination,
                    tripType: pkg.category,
                  })
                }
                className="btn-style-one text-xs py-3.5 px-7 uppercase tracking-wider shadow-xl"
              >
                <Send className="w-4 h-4" />
                <span>Enquire For Booking</span>
              </button>

              <a
                href={whatsappPackageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-style-three text-xs py-3.5 px-7 uppercase tracking-wider shadow-xl"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Quote</span>
              </a>
            </div>
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
              <h2 className="text-xl sm:text-2xl font-black uppercase text-slate-900 tracking-tight mb-4">Overview</h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                {pkg.fullDescription}
              </p>
            </div>

            {/* Tour Highlights */}
            {pkg.highlights && pkg.highlights.length > 0 && (
              <div className="bg-emerald-50/60 p-6 sm:p-8 rounded-2xl border border-emerald-200/80">
                <h2 className="text-xl sm:text-2xl font-black uppercase text-slate-900 tracking-tight mb-4">Tour Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pkg.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-semibold bg-white p-3 rounded-xl border border-emerald-100">
                      <ShieldCheck className="w-4 h-4 text-[#15803d] flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vertical Timeline Itinerary */}
            {pkg.itinerary && pkg.itinerary.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-emerald-100 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-black uppercase text-slate-900 tracking-tight mb-6">Day by Day Itinerary</h2>

                <div className="space-y-6 sm:space-y-8 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-emerald-200">
                  {pkg.itinerary.map((day) => (
                    <div key={day.dayNumber} className="relative pl-10">
                      {/* Day Number Node */}
                      <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-[#15803d] text-white font-black text-xs flex items-center justify-center border-2 border-white shadow-md">
                        {day.dayNumber}
                      </div>

                      <div className="bg-emerald-50/40 p-5 rounded-2xl border border-emerald-100">
                        <span className="text-[11px] font-extrabold text-[#15803d] uppercase tracking-wider block mb-1">
                          Day {day.dayNumber}
                        </span>
                        <h3 className="text-lg font-extrabold text-slate-900 mb-2">{day.title}</h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">{day.description}</p>

                        {day.activities && day.activities.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-emerald-100">
                            {day.activities.map((act, ai) => (
                              <span key={ai} className="bg-white text-[#15803d] text-[11px] font-extrabold px-2.5 py-1 rounded-md border border-emerald-200">
                                {act}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pkg.inclusions && (
                <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm">
                  <h3 className="text-lg font-extrabold uppercase text-slate-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#15803d]" />
                    Inclusions
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700 font-medium">
                    {pkg.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#15803d] font-bold">•</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {pkg.exclusions && (
                <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm">
                  <h3 className="text-lg font-extrabold uppercase text-slate-900 mb-4 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-600" />
                    Exclusions
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {pkg.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-500 font-bold">•</span>
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Image Gallery */}
            {pkg.gallery && pkg.gallery.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-emerald-100 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-black uppercase text-slate-900 tracking-tight mb-4">Tour Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {pkg.gallery.map((img, i) => (
                    <div key={i} className="h-44 rounded-xl overflow-hidden shadow-sm border border-emerald-100">
                      <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Important Information Notice Box */}
            {pkg.importantNotes && pkg.importantNotes.length > 0 && (
              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200 text-slate-800 text-xs leading-relaxed font-medium">
                <h4 className="font-extrabold text-sm mb-2 flex items-center gap-2 text-[#15803d]">
                  <Info className="w-4 h-4 text-[#15803d]" />
                  Important Information
                </h4>
                <ul className="space-y-1.5 list-disc list-inside">
                  {pkg.importantNotes.map((note, i) => (
                    <li key={i}>{note}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column Sticky Card */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-xl sticky top-24">
              <span className="text-[#15803d] text-xs font-extrabold uppercase tracking-wider block mb-1">
                Customized Booking
              </span>
              <h3 className="text-2xl font-black uppercase text-slate-900 tracking-tight mb-3">
                Plan This Trip
              </h3>
              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                Share your travel dates and group size. We will customize this itinerary and arrange accommodations & transport for your dates.
              </p>

              <div className="space-y-3">
                <button
                  onClick={() =>
                    onOpenEnquiry({
                      title: pkg.name,
                      destination: pkg.destination,
                      tripType: pkg.category,
                    })
                  }
                  className="btn-style-one w-full py-3.5 text-xs uppercase tracking-wider shadow-md justify-center"
                >
                  <Send className="w-4 h-4" />
                  <span>Enquire For This Package</span>
                </button>

                <a
                  href={whatsappPackageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-style-three w-full py-3.5 text-xs uppercase tracking-wider shadow-md justify-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Instant Quote</span>
                </a>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-100 space-y-2 text-xs text-slate-600 font-semibold">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#15803d]" />
                  <span>Zero advance payment for enquiry</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#15803d]" />
                  <span>100% customizable itinerary</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#15803d]" />
                  <span>Local desk assistance near Jaldapara</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
