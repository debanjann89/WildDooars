import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  Send,
  MessageCircle,
  Info,
  ShieldCheck,
  Star,
  PenLine,
  Sparkles,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { apiService } from '../services/api';
import type { Package, BusinessSettings, Review } from '../types';
import { WriteReviewModal } from '../components/WriteReviewModal';

interface PackageDetailPageProps {
  settings?: BusinessSettings | null;
  onOpenEnquiry: (contextData?: { title?: string; destination?: string; tripType?: string }) => void;
}

export const PackageDetailPage: React.FC<PackageDetailPageProps> = ({ settings, onOpenEnquiry }) => {
  const { slug } = useParams<{ slug: string }>();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    async function loadPackage() {
      if (slug) {
        const found = await apiService.getPackageBySlug(slug);
        setPkg(found);
        if (found) {
          const pkgRevs = await apiService.getReviews({
            packageId: found.id,
            status: 'Approved',
          });
          setReviews(pkgRevs);
        }
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

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '5.0';

  const handleReviewSubmitted = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const whatsappPackageUrl = `https://wa.me/${settings?.whatsapp || '918116442729'}?text=${encodeURIComponent(
    `Hello Wild Dooars Tours & Travels, I am interested in [${pkg.name}]. Please share availability and details.`
  )}`;

  return (
    <div className="pt-0 pb-16 font-sans bg-white">
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
              <a
                href="#package-reviews"
                className="flex items-center gap-1.5 text-xs text-amber-300 bg-black/60 border border-amber-400/40 px-3 py-1 rounded-full font-bold hover:bg-black/80 transition"
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{averageRating} ({reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'})</span>
              </a>
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

              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
              >
                <PenLine className="w-4 h-4 text-amber-300" />
                <span>Write a Review</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column (2 cols) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview Section */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-emerald-100 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-black uppercase text-slate-900 tracking-tight mb-4">
                Tour Overview
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {pkg.fullDescription || pkg.shortDescription}
              </p>

              {/* Highlights */}
              {pkg.highlights && pkg.highlights.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-sm font-extrabold uppercase text-[#15803d] tracking-wider mb-4">
                    Tour Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {pkg.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 font-semibold bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/60">
                        <CheckCircle2 className="w-4 h-4 text-[#15803d] flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Day-wise Itinerary */}
            {pkg.itinerary && pkg.itinerary.length > 0 && (
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-emerald-100 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-black uppercase text-slate-900 tracking-tight mb-6">
                  Day-Wise Detailed Itinerary
                </h2>
                <div className="space-y-6">
                  {pkg.itinerary.map((day) => (
                    <div key={day.dayNumber} className="border-l-2 border-[#15803d] pl-5 sm:pl-6 relative">
                      <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-[#15803d] text-white flex items-center justify-center text-[10px] font-black">
                        {day.dayNumber}
                      </div>
                      <div className="bg-stone-50 p-5 rounded-xl border border-stone-200">
                        <span className="text-[11px] font-extrabold uppercase text-[#15803d] tracking-wider block mb-1">
                          Day {day.dayNumber}
                        </span>
                        <h3 className="text-base font-extrabold text-slate-900 mb-2">
                          {day.title}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed mb-3">
                          {day.description}
                        </p>
                        {day.activities && day.activities.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-200">
                            {day.activities.map((act, idx) => (
                              <span key={idx} className="bg-white border border-stone-300 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-md">
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

            {/* Inclusions and Exclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {pkg.inclusions && (
                <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm">
                  <h3 className="text-lg font-extrabold uppercase text-slate-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#15803d]" />
                    Inclusions
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-600">
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

            {/* Dedicated Package Reviews Section */}
            <div id="package-reviews" className="bg-white p-6 sm:p-8 rounded-2xl border border-emerald-100 shadow-sm scroll-mt-24">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-stone-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#15803d] uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Traveler Feedback</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black uppercase text-slate-900 tracking-tight">
                    Reviews for {pkg.name}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#15803d] hover:bg-[#166534] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm hover:shadow transition"
                >
                  <PenLine className="w-4 h-4 text-emerald-200" />
                  <span>Write a Review</span>
                </button>
              </div>

              {/* Package Rating Summary Card */}
              <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-center sm:text-left">
                  <div className="text-4xl font-black text-slate-900">
                    {averageRating}
                  </div>
                  <div>
                    <div className="flex text-amber-400 justify-center sm:justify-start">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs font-semibold text-slate-600 mt-1">
                      Based on {reviews.length} traveler {reviews.length === 1 ? 'review' : 'reviews'} for this package
                    </p>
                  </div>
                </div>
                <div className="text-xs text-[#15803d] font-bold bg-white px-3.5 py-1.5 rounded-full border border-emerald-200">
                  ✓ 100% Verified Guests
                </div>
              </div>

              {/* Reviews List */}
              {reviews.length === 0 ? (
                <div className="text-center py-10 px-4 bg-stone-50 rounded-2xl border border-stone-200">
                  <MessageSquare className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-slate-800 mb-1">
                    Be the First to Review This Package!
                  </h3>
                  <p className="text-xs text-stone-500 max-w-md mx-auto mb-5">
                    Have you experienced {pkg.name}? Share your wildlife sightings, hotel stay, and tour guide experience with future travelers.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#15803d] hover:bg-[#166534] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-sm"
                  >
                    <PenLine className="w-4 h-4 text-emerald-200" />
                    <span>Write First Review</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {reviews.map((rev) => {
                    const initials = rev.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase();

                    return (
                      <div
                        key={rev.id}
                        className="bg-stone-50/70 rounded-2xl p-5 border border-stone-200 transition-all hover:bg-stone-50"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2.5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#15803d] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                              {initials}
                            </div>
                            <div>
                              <h4 className="text-sm font-extrabold text-slate-900 leading-tight">
                                {rev.name}
                              </h4>
                              <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                                {rev.location && (
                                  <span className="flex items-center gap-0.5">
                                    <MapPin className="w-3 h-3 text-emerald-600" />
                                    {rev.location}
                                  </span>
                                )}
                                {rev.travelDate && (
                                  <span className="flex items-center gap-0.5">
                                    <Calendar className="w-3 h-3 text-stone-400" />
                                    {rev.travelDate}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <span className="inline-flex items-center gap-1 bg-emerald-50 text-[#15803d] border border-emerald-200 text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0">
                            <CheckCircle2 className="w-3 h-3 text-[#15803d]" />
                            Verified
                          </span>
                        </div>

                        {/* Rating Stars */}
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                          <span className="text-xs font-bold text-slate-700 ml-1">
                            {rev.rating}.0
                          </span>
                        </div>

                        {/* Title & Comment */}
                        {rev.title && (
                          <h5 className="font-bold text-slate-900 text-xs sm:text-sm mb-1">
                            "{rev.title}"
                          </h5>
                        )}
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {rev.comment}
                        </p>

                        <div className="pt-2.5 mt-3 border-t border-stone-200/60 text-[10px] text-stone-400 flex items-center justify-between">
                          <span>Tour Package Review</span>
                          <span>{new Date(rev.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
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

                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="w-full py-3 px-4 bg-emerald-50 hover:bg-emerald-100 text-[#15803d] border border-emerald-200 rounded-xl text-xs font-extrabold uppercase tracking-wider transition flex items-center justify-center gap-2"
                >
                  <PenLine className="w-4 h-4" />
                  <span>Review This Package</span>
                </button>
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

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        defaultPackageId={pkg.id}
        defaultPackageName={pkg.name}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </div>
  );
};
