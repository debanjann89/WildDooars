import React, { useState, useEffect } from 'react';
import { X, Star, CheckCircle2, ShieldCheck, Sparkles, MapPin, Calendar, User, Mail, HeartHandshake } from 'lucide-react';
import { apiService } from '../services/api';
import type { Review, Package } from '../types';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPackageId?: string;
  defaultPackageName?: string;
  onReviewSubmitted?: (review: Review) => void;
}

const EXPERIENCE_OPTIONS = [
  'Jeep Safari & Wildlife Experience',
  'Car Rental & Chauffeur Service',
  'Eco-Resort & Homestay Stay',
  'Dooars Sightseeing & Permits',
  'Customized Tour & Hospitality',
];

const RATING_LABELS = [
  '',
  'Poor (1/5)',
  'Fair (2/5)',
  'Good (3/5)',
  'Very Good (4/5)',
  'Exceptional & Unforgettable (5/5)',
];

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  defaultPackageId,
  defaultPackageName,
  onReviewSubmitted,
}) => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [reviewType, setReviewType] = useState<'Package' | 'Experience'>(
    defaultPackageId ? 'Package' : 'Package'
  );
  const [selectedPackageId, setSelectedPackageId] = useState<string>(defaultPackageId || '');
  const [selectedPackageName, setSelectedPackageName] = useState<string>(defaultPackageName || '');
  const [experienceType, setExperienceType] = useState<string>(EXPERIENCE_OPTIONS[0]);

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      apiService.getPackages().then((pkgs) => {
        setPackages(pkgs);
        if (defaultPackageId) {
          setSelectedPackageId(defaultPackageId);
          const found = pkgs.find((p) => p.id === defaultPackageId);
          if (found) {
            setSelectedPackageName(found.name);
          } else if (defaultPackageName) {
            setSelectedPackageName(defaultPackageName);
          }
        } else if (pkgs.length > 0 && !selectedPackageId) {
          setSelectedPackageId(pkgs[0].id);
          setSelectedPackageName(pkgs[0].name);
        }
      });
    }
  }, [isOpen, defaultPackageId, defaultPackageName]);

  if (!isOpen) return null;

  const handlePackageSelect = (pkgId: string) => {
    setSelectedPackageId(pkgId);
    const found = packages.find((p) => p.id === pkgId);
    if (found) setSelectedPackageName(found.name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please provide your name.');
      return;
    }
    if (!comment.trim()) {
      setErrorMessage('Please write your review feedback.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: Omit<Review, 'id' | 'createdAt' | 'status' | 'source'> = {
        name: name.trim(),
        email: email.trim() || undefined,
        location: location.trim() || 'Verified Traveler',
        rating,
        reviewType,
        packageId: reviewType === 'Package' ? selectedPackageId : undefined,
        packageName: reviewType === 'Package' ? selectedPackageName : undefined,
        experienceType: reviewType === 'Experience' ? experienceType : undefined,
        title: title.trim() || `${rating} Star Dooars Trip Experience`,
        comment: comment.trim(),
        travelDate: travelDate.trim() || undefined,
      };

      const result = await apiService.submitReview(payload);
      if (result.success && result.review) {
        setIsSuccess(true);
        if (onReviewSubmitted) {
          onReviewSubmitted(result.review);
        }
      } else {
        setErrorMessage(result.message || 'Unable to submit review right now. Please try again.');
      }
    } catch {
      setErrorMessage('Failed to save review. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setErrorMessage('');
    setName('');
    setLocation('');
    setEmail('');
    setTitle('');
    setComment('');
    setTravelDate('');
    setRating(5);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/75 backdrop-blur-sm transition-opacity"
        onClick={handleResetAndClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-8 border border-stone-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 px-6 py-6 text-white relative">
          <button
            type="button"
            onClick={handleResetAndClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-2 bg-emerald-900/60 border border-emerald-400/30 text-emerald-200 text-xs font-semibold px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Traveler Feedback
          </div>
          <h3 className="text-2xl font-serif font-bold text-white tracking-tight">
            Share Your Dooars Experience
          </h3>
          <p className="text-emerald-100/90 text-sm mt-1">
            Your review helps fellow travelers plan authentic journeys with Wild Dooars.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[78vh] overflow-y-auto">
          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-serif font-bold text-stone-900">
                Thank You for Your Review!
              </h4>
              <p className="text-stone-600 max-w-md mx-auto text-sm leading-relaxed">
                Your thoughtful review has been posted successfully. We are honored to be a part of your Dooars wilderness memories!
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-8 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-full transition shadow-md hover:shadow-lg"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl">
                  {errorMessage}
                </div>
              )}

              {/* Review Type Tabs */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                  What are you reviewing?
                </label>
                <div className="grid grid-cols-2 gap-3 p-1.5 bg-stone-100 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setReviewType('Package')}
                    className={`py-2.5 px-4 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                      reviewType === 'Package'
                        ? 'bg-white text-emerald-800 shadow-sm font-semibold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <span>🎁 Tour Package</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewType('Experience')}
                    className={`py-2.5 px-4 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                      reviewType === 'Experience'
                        ? 'bg-white text-emerald-800 shadow-sm font-semibold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <span>🌿 Dooars Experience</span>
                  </button>
                </div>
              </div>

              {/* Package Selector or Experience Selector */}
              {reviewType === 'Package' ? (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Select Tour Package <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={selectedPackageId}
                    onChange={(e) => handlePackageSelect(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                    required
                  >
                    {packages.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.duration})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Select Experience Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={experienceType}
                    onChange={(e) => setExperienceType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                    required
                  >
                    {EXPERIENCE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Star Rating */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 text-center">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                  Your Overall Rating <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((starVal) => {
                    const activeVal = hoverRating || rating;
                    const isFilled = starVal <= activeVal;
                    return (
                      <button
                        type="button"
                        key={starVal}
                        onMouseEnter={() => setHoverRating(starVal)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(starVal)}
                        className="p-1 transition-transform hover:scale-125 focus:outline-none"
                        aria-label={`${starVal} stars`}
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            isFilled
                              ? 'text-amber-400 fill-amber-400 drop-shadow-sm'
                              : 'text-stone-300'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                <div className="text-xs font-semibold text-emerald-800 mt-2">
                  {RATING_LABELS[hoverRating || rating]}
                </div>
              </div>

              {/* Review Title & Feedback */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Review Title / Headline
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Flawless Rhino Safari & very courteous driver!"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent placeholder:text-stone-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Detailed Review & Experience <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share what made your trip special: the safari sighting, driver punctuality, resort quality, food, or communication..."
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent placeholder:text-stone-400"
                    required
                  />
                </div>
              </div>

              {/* Traveler Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sourav Banerjee"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent placeholder:text-stone-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Your City / Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Kolkata, West Bengal"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent placeholder:text-stone-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Travel Date / Month (Optional)
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      placeholder="e.g. February 2026"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent placeholder:text-stone-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Your Email (Private & Confidential)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@gmail.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent placeholder:text-stone-400"
                    />
                  </div>
                </div>
              </div>

              {/* Assurance note */}
              <div className="flex items-center gap-2 text-xs text-stone-500 bg-stone-50 p-3 rounded-xl border border-stone-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Your email is strictly confidential. Your review will be featured publicly on Wild Dooars website.</span>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-5 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-sm font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-7 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Publishing...</span>
                    </>
                  ) : (
                    <>
                      <HeartHandshake className="w-4 h-4" />
                      <span>Submit Review</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
