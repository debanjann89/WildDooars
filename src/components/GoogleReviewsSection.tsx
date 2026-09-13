import React, { useEffect, useState } from 'react';
import { Star, CheckCircle2, ExternalLink, MessageSquarePlus, PenLine, Sparkles, MapPin, Calendar } from 'lucide-react';
import type { BusinessSettings, Review } from '../types';
import { apiService } from '../services/api';
import { WriteReviewModal } from './WriteReviewModal';

interface GoogleReviewsSectionProps {
  settings?: BusinessSettings;
}

interface FallbackGoogleReview {
  id: string;
  name: string;
  location: string;
  avatarText: string;
  avatarBg: string;
  rating: number;
  timeAgo: string;
  tripType: string;
  reviewText: string;
}

const fallbackGoogleReviews: FallbackGoogleReview[] = [
  {
    id: 'g-rev-1',
    name: 'Subhashish Roy',
    location: 'Kolkata, WB',
    avatarText: 'SR',
    avatarBg: 'bg-emerald-700',
    rating: 5,
    timeAgo: '2 weeks ago',
    tripType: 'Jaldapara Safari & Family Tour',
    reviewText: 'Outstanding experience with Wild Dooars Tours & Travels! Our Jaldapara elephant and jeep safari permits were arranged smoothly without any hassle. The vehicle was clean, well-maintained, and our driver had great knowledge of forest routes and wildlife sightings.'
  },
  {
    id: 'g-rev-2',
    name: 'Tanmoy Sarkar',
    location: 'Siliguri, WB',
    avatarText: 'TS',
    avatarBg: 'bg-amber-600',
    rating: 5,
    timeAgo: '1 month ago',
    tripType: 'Samsing, Jhalong & Bindu Tour',
    reviewText: 'Booked the Samsing, Jhalong, and Bindu tour package. The pickup from Hasimara was right on time. The driver was extremely polite and showed us Rocky Island and the Suntalekhola hanging bridge. Best travel operator in Dooars!'
  },
  {
    id: 'g-rev-3',
    name: 'Rituja Banerjee',
    location: 'Durgapur, WB',
    avatarText: 'RB',
    avatarBg: 'bg-teal-700',
    rating: 5,
    timeAgo: '2 months ago',
    tripType: 'Buxa Tiger Reserve & Jayanti',
    reviewText: 'Very reliable and prompt service near Jaldapara. Excellent coordination for hotel booking and car rental. The resort arrangements were peaceful and close to nature. Highly recommend them for family vacations in Dooars.'
  },
  {
    id: 'g-rev-4',
    name: 'Amit Sengupta',
    location: 'Kolkata, WB',
    avatarText: 'AS',
    avatarBg: 'bg-blue-700',
    rating: 5,
    timeAgo: '3 months ago',
    tripType: '4-Day Dooars Wildlife Circuit',
    reviewText: 'Rented an Innova for 4 days covering Gorumara, Chilapata, and Jaldapara. Car was in top-notch condition and driver behavior was commendable. Very honest and professional team.'
  }
];

export const GoogleReviewsSection: React.FC<GoogleReviewsSectionProps> = ({ settings }) => {
  const mapsUrl = settings?.googleMapsUrl || 'https://maps.app.goo.gl/BKCtmveG53u8TuVn6';
  const ratingScore = settings?.googleRating ? settings.googleRating.replace(/[^0-9.]/g, '') : '4.8';
  const reviewsCountText = settings?.reviewsCount || '97+ Google Reviews';

  const [websiteReviews, setWebsiteReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<'All' | 'Package' | 'Experience' | 'Google'>('All');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  useEffect(() => {
    async function loadReviews() {
      try {
        const list = await apiService.getReviews({ status: 'Approved' });
        setWebsiteReviews(list);
      } catch (err) {
        console.error('Failed to load reviews:', err);
      }
    }
    loadReviews();
  }, []);

  const handleReviewAdded = (newReview: Review) => {
    setWebsiteReviews((prev) => [newReview, ...prev]);
  };

  // Filter reviews based on activeTab
  const filteredWebsiteReviews = websiteReviews.filter((r) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Package') return r.reviewType === 'Package';
    if (activeTab === 'Experience') return r.reviewType === 'Experience';
    return false;
  });

  const showGoogleReviews = activeTab === 'All' || activeTab === 'Google';
  const totalCount = websiteReviews.length + 97;

  return (
    <section className="py-16 sm:py-20 bg-stone-50 relative overflow-hidden font-sans border-t border-stone-200">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-[#15803d] text-xs font-extrabold uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Traveler Experiences & Google Reviews</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Real Stories from Real Travelers
          </h2>

          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Explore authentic guest reviews on our curated Dooars tour packages, Jaldapara jeep safaris, and car rental services.
          </p>

          {/* Rating Summary Bar */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 bg-white px-6 py-3.5 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-slate-900">{ratingScore}</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <span className="text-stone-300 hidden sm:inline">|</span>
            <span className="text-xs font-extrabold text-slate-700">{totalCount}+ Total Guest Reviews</span>
            <span className="text-stone-300 hidden sm:inline">|</span>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#15803d] hover:text-[#166534] flex items-center gap-1 hover:underline"
            >
              <span>{reviewsCountText} on Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Dual Action Buttons at Top */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#15803d] hover:bg-[#166534] text-white rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
            >
              <PenLine className="w-4 h-4 text-emerald-200" />
              <span>Write a Website Review</span>
            </button>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-stone-100 text-slate-800 border border-stone-300 rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-xs hover:shadow-sm transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Review on Google</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </a>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2">
          {(['All', 'Package', 'Experience', 'Google'] as const).map((tab) => {
            const labels = {
              All: 'All Reviews',
              Package: '🎁 Tour Packages',
              Experience: '🌿 Dooars Experiences',
              Google: 'Google Reviews',
            };
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#15803d] text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                {labels[tab]}
              </button>
            );
          })}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Website Reviews */}
          {activeTab !== 'Google' &&
            filteredWebsiteReviews.map((rev) => {
              const initials = rev.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase();

              return (
                <div
                  key={rev.id}
                  className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* User Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-black text-xs shadow-xs shrink-0">
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

                      {/* Verified Badge */}
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-[#15803d] border border-emerald-200 text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-[#15803d]" />
                        Verified
                      </span>
                    </div>

                    {/* Stars & Category Tag */}
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <div className="flex text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-slate-700 ml-1">
                        {rev.rating}.0
                      </span>
                    </div>

                    {/* Package or Experience Tag */}
                    <div className="mb-3">
                      {rev.reviewType === 'Package' ? (
                        <span className="inline-block bg-emerald-50 border border-emerald-100 text-[#15803d] text-[11px] font-bold px-2.5 py-1 rounded-lg">
                          🎁 {rev.packageName || 'Custom Package Tour'}
                        </span>
                      ) : (
                        <span className="inline-block bg-amber-50 border border-amber-100 text-amber-900 text-[11px] font-bold px-2.5 py-1 rounded-lg">
                          🌿 {rev.experienceType || 'Dooars Experience'}
                        </span>
                      )}
                    </div>

                    {/* Title & Comment */}
                    {rev.title && (
                      <h5 className="font-bold text-slate-900 text-sm mb-1.5">
                        "{rev.title}"
                      </h5>
                    )}
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>

                  <div className="pt-3 mt-4 border-t border-stone-100 text-[11px] text-stone-400 flex items-center justify-between">
                    <span className="font-medium text-emerald-800">Website Traveler Review</span>
                    <span>{new Date(rev.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
              );
            })}

          {/* Google Reviews */}
          {showGoogleReviews &&
            fallbackGoogleReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-full ${rev.avatarBg} text-white flex items-center justify-center font-black text-xs shadow-xs shrink-0`}
                      >
                        {rev.avatarText}
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900 leading-tight">
                          {rev.name}
                        </h4>
                        <div className="flex items-center gap-1 text-[11px] text-stone-500 mt-0.5">
                          <MapPin className="w-3 h-3 text-stone-400" />
                          <span>{rev.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Google Icon */}
                    <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center border border-stone-200 shrink-0">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 mb-2.5">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-700 ml-1">
                      {rev.rating}.0
                    </span>
                  </div>

                  <div className="mb-3">
                    <span className="inline-block bg-stone-100 text-stone-700 text-[11px] font-bold px-2.5 py-1 rounded-lg">
                      🗺️ {rev.tripType}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    "{rev.reviewText}"
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-stone-100 text-[11px] text-stone-400 flex items-center justify-between">
                  <span className="font-semibold text-slate-600">Google Review ({rev.timeAgo})</span>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#15803d] font-bold flex items-center gap-0.5"
                  >
                    <span>Read on Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 max-w-3xl mx-auto bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 rounded-3xl p-6 sm:p-10 text-white text-center shadow-xl border border-emerald-800/60">
          <div className="w-12 h-12 bg-emerald-800/60 border border-emerald-400/30 rounded-2xl flex items-center justify-center mx-auto mb-3 text-amber-300">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black mb-2 tracking-tight">
            Have You Traveled with Wild Dooars?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-200 mb-6 max-w-lg mx-auto leading-relaxed">
            Your honest feedback inspires new travelers and helps us make Dooars wildlife and forest journeys even better.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#15803d] hover:bg-[#166534] text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg hover:shadow-emerald-950/50 transition-all cursor-pointer"
            >
              <PenLine className="w-4 h-4 text-emerald-200" />
              <span>Write a Website Review</span>
            </button>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-stone-100 text-slate-900 rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4 text-emerald-700" />
              <span>Leave a Google Review</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
        onReviewSubmitted={handleReviewAdded}
      />
    </section>
  );
};
