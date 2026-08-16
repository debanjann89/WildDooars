import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { PackageGrid } from '../components/PackageGrid';
import type { Package } from '../types';

interface PackagesPageProps {
  packages: Package[];
  onOpenEnquiry: (contextData?: { title?: string; destination?: string; tripType?: string }) => void;
}

export const PackagesPage: React.FC<PackagesPageProps> = ({ packages, onOpenEnquiry }) => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  return (
    <div className="pt-4 sm:pt-8 pb-20 font-sans bg-white">
      <div className="container">
        <div className="sec-title centered max-w-3xl mx-auto mb-12">
          <span className="section-tag">Curated Itineraries</span>
          <h2>
            Dooars & Bhutan <span>Packages</span>
          </h2>
          <div className="desc-text">
            Discover Wild Dooars and Bhutan through experiences designed around nature, wildlife, and local mountain culture. Choose from family vacations, honeymoon retreats, wildlife safaris, and custom itineraries.
          </div>
        </div>

        <PackageGrid
          packages={packages}
          onOpenEnquiry={onOpenEnquiry}
          showFilters={true}
          initialCategory={initialCategory}
        />
      </div>
    </div>
  );
};
