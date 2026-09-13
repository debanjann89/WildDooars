import React, { useEffect, useState } from 'react';
import {
  Star,
  EyeOff,
  Trash2,
  Edit,
  Plus,
  Search,
  MapPin,
  Calendar,
  MessageSquare,
  X,
  Save,
  Check
} from 'lucide-react';
import { apiService } from '../../services/api';
import type { Review, Package } from '../../types';

const EXPERIENCE_OPTIONS = [
  'Jeep Safari & Wildlife Experience',
  'Car Rental & Chauffeur Service',
  'Eco-Resort & Homestay Stay',
  'Dooars Sightseeing & Permits',
  'Customized Tour & Hospitality',
];

export const AdminReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [statusFilter, setStatusFilter] = useState<'All' | 'Approved' | 'Pending' | 'Hidden'>('All');
  const [typeFilter, setTypeFilter] = useState<'All' | 'Package' | 'Experience'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Edit / Create Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Partial<Review> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [revs, pkgs] = await Promise.all([
        apiService.getReviews(),
        apiService.getPackages(),
      ]);
      setReviews(revs);
      setPackages(pkgs);
    } catch (err) {
      console.error('Failed to load reviews data:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleStatusChange = async (id: string, newStatus: 'Approved' | 'Pending' | 'Hidden') => {
    const target = reviews.find((r) => r.id === id);
    if (!target) return;
    const updated = { ...target, status: newStatus };
    await apiService.saveReview(updated);
    setReviews((prev) => prev.map((r) => (r.id === id ? updated : r)));
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to permanently delete this review?')) {
      await apiService.deleteReview(id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const handleOpenCreateModal = () => {
    setEditingReview({
      id: 'rev-' + Date.now(),
      name: '',
      email: '',
      location: 'Kolkata, WB',
      rating: 5,
      reviewType: 'Package',
      packageId: packages[0]?.id || '',
      packageName: packages[0]?.name || '',
      title: '',
      comment: '',
      travelDate: '',
      source: 'Website',
      status: 'Approved',
      createdAt: new Date().toISOString(),
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (review: Review) => {
    setEditingReview({ ...review });
    setIsModalOpen(true);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview || !editingReview.name?.trim() || !editingReview.comment?.trim()) {
      alert('Name and review comments are required.');
      return;
    }

    setIsSaving(true);
    try {
      const reviewToSave = editingReview as Review;
      await apiService.saveReview(reviewToSave);
      setReviews((prev) => {
        const idx = prev.findIndex((r) => r.id === reviewToSave.id);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = reviewToSave;
          return next;
        } else {
          return [reviewToSave, ...prev];
        }
      });
      setIsModalOpen(false);
      setEditingReview(null);
    } catch (err) {
      console.error('Failed to save review:', err);
      alert('Failed to save review. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Metrics
  const totalReviews = reviews.length;
  const approvedCount = reviews.filter((r) => r.status === 'Approved').length;
  const pendingCount = reviews.filter((r) => r.status === 'Pending').length;
  const hiddenCount = reviews.filter((r) => r.status === 'Hidden').length;
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '5.0';

  // Filtered List
  const filteredReviews = reviews.filter((r) => {
    if (statusFilter !== 'All' && r.status !== statusFilter) return false;
    if (typeFilter !== 'All' && r.reviewType !== typeFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = r.name?.toLowerCase().includes(q);
      const matchTitle = r.title?.toLowerCase().includes(q);
      const matchComment = r.comment?.toLowerCase().includes(q);
      const matchPkg = r.packageName?.toLowerCase().includes(q);
      const matchLoc = r.location?.toLowerCase().includes(q);
      if (!matchName && !matchTitle && !matchComment && !matchPkg && !matchLoc) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-emerald-950">
            Traveler Reviews Moderation
          </h1>
          <p className="text-xs text-stone-600">
            Manage, approve, edit, and moderate reviews submitted across packages and Dooars experiences.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Review</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
            Total Reviews
          </span>
          <div className="text-2xl font-black text-slate-900">{totalReviews}</div>
          <span className="text-[10px] text-stone-400 mt-1 block">Live on website & archive</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
            Average Rating
          </span>
          <div className="text-2xl font-black text-amber-500 flex items-center gap-1.5">
            <span>{avgRating}</span>
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          </div>
          <span className="text-[10px] text-stone-400 mt-1 block">Out of 5.0 stars</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
            Approved
          </span>
          <div className="text-2xl font-black text-emerald-600">{approvedCount}</div>
          <span className="text-[10px] text-stone-400 mt-1 block">Visible to all travelers</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
            Pending / Hidden
          </span>
          <div className="text-2xl font-black text-amber-600">
            {pendingCount + hiddenCount}
          </div>
          <span className="text-[10px] text-stone-400 mt-1 block">Needs review or hidden</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by name, package, or comment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
            {(['All', 'Approved', 'Pending', 'Hidden'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  statusFilter === st
                    ? 'bg-white text-emerald-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
            {(['All', 'Package', 'Experience'] as const).map((tp) => (
              <button
                key={tp}
                onClick={() => setTypeFilter(tp)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  typeFilter === tp
                    ? 'bg-white text-emerald-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {tp === 'Package' ? '🎁 Packages' : tp === 'Experience' ? '🌿 Experiences' : 'All Types'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      {loading ? (
        <div className="text-center py-16">
          <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-stone-500 font-semibold">Loading reviews...</p>
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-stone-200 text-center">
          <MessageSquare className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-1">No reviews found</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
            Try adjusting your search or filters, or add a new traveler review manually.
          </p>
          <button
            onClick={handleOpenCreateModal}
            className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition"
          >
            + Add New Review
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:border-emerald-200 transition flex flex-col justify-between"
            >
              <div>
                {/* Header: Name, Avatar, Status Badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-sm text-slate-900">{rev.name}</h3>
                      {rev.email && (
                        <span className="text-[11px] text-stone-400">({rev.email})</span>
                      )}
                    </div>
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

                  {/* Status Badge */}
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                      rev.status === 'Approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : rev.status === 'Pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {rev.status}
                  </span>
                </div>

                {/* Stars & Category Tag */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {rev.reviewType === 'Package' ? (
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded truncate max-w-[200px]">
                      🎁 {rev.packageName || 'Package Tour'}
                    </span>
                  ) : (
                    <span className="bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded truncate max-w-[200px]">
                      🌿 {rev.experienceType || 'Experience'}
                    </span>
                  )}
                </div>

                {/* Title & Comment */}
                {rev.title && (
                  <h4 className="font-bold text-xs text-slate-800 mb-1">
                    "{rev.title}"
                  </h4>
                )}
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {rev.comment}
                </p>
              </div>

              {/* Actions Footer */}
              <div className="pt-3 mt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-[10px] text-stone-400">
                  {new Date(rev.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>

                <div className="flex items-center gap-1.5">
                  {rev.status !== 'Approved' && (
                    <button
                      onClick={() => handleStatusChange(rev.id, 'Approved')}
                      title="Approve Review"
                      className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}

                  {rev.status !== 'Hidden' && (
                    <button
                      onClick={() => handleStatusChange(rev.id, 'Hidden')}
                      title="Hide Review"
                      className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 transition"
                    >
                      <EyeOff className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => handleOpenEditModal(rev)}
                    title="Edit Review"
                    className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(rev.id)}
                    title="Delete Review"
                    className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Create Modal */}
      {isModalOpen && editingReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-5">
              <h3 className="text-lg font-bold text-slate-900 font-serif">
                {reviews.some((r) => r.id === editingReview.id) ? 'Edit Review' : 'Add New Review'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              {/* Review Type */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setEditingReview((prev) =>
                      prev ? { ...prev, reviewType: 'Package' } : null
                    )
                  }
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                    editingReview.reviewType === 'Package'
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-900'
                      : 'border-stone-200 text-stone-600'
                  }`}
                >
                  🎁 Tour Package
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setEditingReview((prev) =>
                      prev ? { ...prev, reviewType: 'Experience' } : null
                    )
                  }
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                    editingReview.reviewType === 'Experience'
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-900'
                      : 'border-stone-200 text-stone-600'
                  }`}
                >
                  🌿 Dooars Experience
                </button>
              </div>

              {/* Package Select or Experience Select */}
              {editingReview.reviewType === 'Package' ? (
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Select Tour Package
                  </label>
                  <select
                    value={editingReview.packageId || ''}
                    onChange={(e) => {
                      const selId = e.target.value;
                      const found = packages.find((p) => p.id === selId);
                      setEditingReview((prev) =>
                        prev
                          ? {
                              ...prev,
                              packageId: selId,
                              packageName: found?.name || '',
                            }
                          : null
                      );
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-emerald-600"
                  >
                    {packages.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Select Experience Category
                  </label>
                  <select
                    value={editingReview.experienceType || EXPERIENCE_OPTIONS[0]}
                    onChange={(e) =>
                      setEditingReview((prev) =>
                        prev ? { ...prev, experienceType: e.target.value } : null
                      )
                    }
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-emerald-600"
                  >
                    {EXPERIENCE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Rating & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Star Rating (1 to 5)
                  </label>
                  <select
                    value={editingReview.rating || 5}
                    onChange={(e) =>
                      setEditingReview((prev) =>
                        prev ? { ...prev, rating: parseInt(e.target.value) } : null
                      )
                    }
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ 5 Stars (Exceptional)</option>
                    <option value={4}>⭐⭐⭐⭐ 4 Stars (Very Good)</option>
                    <option value={3}>⭐⭐⭐ 3 Stars (Good)</option>
                    <option value={2}>⭐⭐ 2 Stars (Fair)</option>
                    <option value={1}>⭐ 1 Star (Poor)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Moderation Status
                  </label>
                  <select
                    value={editingReview.status || 'Approved'}
                    onChange={(e) =>
                      setEditingReview((prev) =>
                        prev
                          ? {
                              ...prev,
                              status: e.target.value as 'Approved' | 'Pending' | 'Hidden',
                            }
                          : null
                      )
                    }
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="Approved">Approved (Live)</option>
                    <option value="Pending">Pending Review</option>
                    <option value="Hidden">Hidden (Archived)</option>
                  </select>
                </div>
              </div>

              {/* Name & Location */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Traveler Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingReview.name || ''}
                    onChange={(e) =>
                      setEditingReview((prev) =>
                        prev ? { ...prev, name: e.target.value } : null
                      )
                    }
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    City / Location
                  </label>
                  <input
                    type="text"
                    value={editingReview.location || ''}
                    onChange={(e) =>
                      setEditingReview((prev) =>
                        prev ? { ...prev, location: e.target.value } : null
                      )
                    }
                    placeholder="e.g. Kolkata, WB"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              {/* Email & Travel Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={editingReview.email || ''}
                    onChange={(e) =>
                      setEditingReview((prev) =>
                        prev ? { ...prev, email: e.target.value } : null
                      )
                    }
                    placeholder="traveler@gmail.com"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Travel Date / Month
                  </label>
                  <input
                    type="text"
                    value={editingReview.travelDate || ''}
                    onChange={(e) =>
                      setEditingReview((prev) =>
                        prev ? { ...prev, travelDate: e.target.value } : null
                      )
                    }
                    placeholder="e.g. Feb 2026"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Review Headline
                </label>
                <input
                  type="text"
                  value={editingReview.title || ''}
                  onChange={(e) =>
                    setEditingReview((prev) =>
                      prev ? { ...prev, title: e.target.value } : null
                    )
                  }
                  placeholder="e.g. Flawless Rhino Safari and warm hospitality!"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              {/* Comment */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Detailed Review Comment <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingReview.comment || ''}
                  onChange={(e) =>
                    setEditingReview((prev) =>
                      prev ? { ...prev, comment: e.target.value } : null
                    )
                  }
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition flex items-center gap-2"
                >
                  {isSaving ? (
                    <span>Saving...</span>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Review</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
