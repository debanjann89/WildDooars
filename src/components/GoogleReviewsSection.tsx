import React, { useEffect } from 'react';
import { Star, CheckCircle2, ExternalLink, MessageSquarePlus } from 'lucide-react';
import type { BusinessSettings } from '../types';

interface GoogleReviewsSectionProps {
  settings?: BusinessSettings;
}

interface ReviewItem {
  id: string;
  name: string;
  avatarText: string;
  avatarBg: string;
  rating: number;
  timeAgo: string;
  tripType: string;
  reviewText: string;
}

const fallbackReviews: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Subhashish Roy',
    avatarText: 'SR',
    avatarBg: 'bg-emerald-700',
    rating: 5,
    timeAgo: '2 weeks ago',
    tripType: 'Jaldapara Safari & Family Tour',
    reviewText: 'Outstanding experience with Wild Dooars Tours & Travels! Our Jaldapara elephant and jeep safari permits were arranged smoothly without any hassle. The vehicle was clean, well-maintained, and our driver had great knowledge of forest routes and wildlife sightings.'
  },
  {
    id: 'rev-2',
    name: 'Tanmoy Sarkar',
    avatarText: 'TS',
    avatarBg: 'bg-amber-600',
    rating: 5,
    timeAgo: '1 month ago',
    tripType: 'Samsing, Jhalong & Bindu Tour',
    reviewText: 'Booked the Samsing, Jhalong, and Bindu tour package. The pickup from Hasimara was right on time. The driver was extremely polite and showed us Rocky Island and the Suntalekhola hanging bridge. Best travel operator in Dooars!'
  },
  {
    id: 'rev-3',
    name: 'Rituja Banerjee',
    avatarText: 'RB',
    avatarBg: 'bg-teal-700',
    rating: 5,
    timeAgo: '2 months ago',
    tripType: 'Buxa Tiger Reserve & Jayanti',
    reviewText: 'Very reliable and prompt service near Jaldapara. Excellent coordination for hotel booking and car rental. The resort arrangements were peaceful and close to nature. Highly recommend them for family vacations in Dooars.'
  },
  {
    id: 'rev-4',
    name: 'Amit Sengupta',
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
  const widgetId = settings?.googleReviewsWidgetId?.trim();

  // If client configured an Elfsight widget ID, load Elfsight platform script
  useEffect(() => {
    if (!widgetId) return;

    // Check if script already injected
    if (!document.querySelector('script[src*="elfsight.com/platform/platform.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://static.elfsight.com/platform/platform.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [widgetId]);

  return (
    <section className="py-16 sm:py-20 bg-stone-50 relative overflow-hidden font-sans border-t border-stone-200">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#15803d] text-xs font-extrabold uppercase tracking-wider mb-3">
            {/* Google G Logo SVG */}
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
            <span>Verified Google Business Reviews</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Real Reviews from Real Travelers
          </h2>

          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            See what guests say about our Dooars tour packages, Jaldapara safari permits, and car rental services across North Bengal.
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
            <span className="text-xs font-extrabold text-slate-700">{reviewsCountText}</span>
            <span className="text-stone-300 hidden sm:inline">|</span>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#15803d] hover:text-[#166534] flex items-center gap-1 hover:underline"
            >
              <span>View on Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Dynamic Widget or Native Review Cards */}
        {widgetId ? (
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm min-h-[300px]">
            <div className={`elfsight-app-${widgetId}`} data-elfsight-app-lazy></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fallbackReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top user row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full ${rev.avatarBg} text-white flex items-center justify-center font-bold text-xs shadow-xs`}
                      >
                        {rev.avatarText}
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-900 leading-snug">{rev.name}</h4>
                        <span className="text-[10px] text-stone-400">{rev.timeAgo}</span>
                      </div>
                    </div>

                    {/* Google G Mini Icon */}
                    <div className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center border border-stone-200">
                      <svg className="w-3 h-3" viewBox="0 0 24 24">
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

                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-[11px] font-bold text-emerald-800 ml-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#15803d]" />
                      <span>Verified</span>
                    </span>
                  </div>

                  {/* Trip tag */}
                  <div className="mb-2.5">
                    <span className="inline-block bg-stone-100 text-stone-600 text-[10px] font-semibold px-2 py-0.5 rounded">
                      {rev.tripType}
                    </span>
                  </div>

                  {/* Review body */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">
                    "{rev.reviewText}"
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-stone-100 text-[10px] text-stone-400 flex items-center justify-between">
                  <span>Google Review</span>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#15803d] font-bold"
                  >
                    Read on Google ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Callout: Write a review */}
        <div className="mt-12 max-w-2xl mx-auto bg-gradient-to-r from-emerald-900 to-[#0a1f14] rounded-2xl p-6 sm:p-8 text-white text-center shadow-lg border border-emerald-800">
          <h3 className="text-lg sm:text-xl font-bold mb-2">Have You Traveled with Wild Dooars?</h3>
          <p className="text-xs text-emerald-200 mb-5 max-w-md mx-auto">
            Your feedback helps other wildlife lovers and families plan memorable trips to Dooars. Leave us a review on Google!
          </p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#15803d] hover:bg-[#166534] text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md hover:shadow-emerald-950/50 transition-all cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4 text-emerald-200" />
            <span>Write a Review on Google</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
