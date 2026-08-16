import React, { useState, useEffect } from 'react';
import type { Package } from '../types';
import { PackageCard } from './PackageCard';

interface PackageGridProps {
  packages: Package[];
  onOpenEnquiry: (contextData?: { title?: string; destination?: string; tripType?: string }) => void;
  showFilters?: boolean;
  initialCategory?: string;
}

export const PackageGrid: React.FC<PackageGridProps> = ({
  packages,
  onOpenEnquiry,
  showFilters = true,
  initialCategory = 'All'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const categories = ['All', 'Bhutan', 'Dooars', 'Wildlife', 'Family', 'Honeymoon', 'Adventure', 'Package Tours'];

  const filteredPackages =
    selectedCategory === 'All'
      ? packages
      : packages.filter((p) => {
          if (selectedCategory === 'Bhutan') {
            return p.destination.toLowerCase().includes('bhutan') || p.name.toLowerCase().includes('bhutan') || p.category.toLowerCase().includes('bhutan');
          }
          if (selectedCategory === 'Dooars') {
            return p.destination.toLowerCase().includes('dooars') || p.name.toLowerCase().includes('dooars') || p.category.toLowerCase().includes('dooars');
          }
          return p.category.toLowerCase() === selectedCategory.toLowerCase();
        });

  return (
    <div className="w-full font-sans">
      {/* Filters */}
      {showFilters && (
        <div className="flex items-center justify-center flex-wrap gap-2.5 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 text-xs font-extrabold rounded-full transition-all uppercase tracking-wider ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-[#15803d] text-white shadow-md scale-105 border border-[#15803d]'
                  : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      {filteredPackages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.id} packageData={pkg} onOpenEnquiry={onOpenEnquiry} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-emerald-100 p-8 max-w-md mx-auto shadow-sm">
          <p className="text-slate-600 mb-4 font-semibold text-sm">No packages found for "{selectedCategory}".</p>
          <button
            onClick={() => setSelectedCategory('All')}
            className="btn-style-three text-xs py-2.5 px-6"
          >
            Show All Packages
          </button>
        </div>
      )}
    </div>
  );
};
