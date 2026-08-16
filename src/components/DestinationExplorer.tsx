import React from 'react';
import type { Destination } from '../types';
import { DestinationCard } from './DestinationCard';

interface DestinationExplorerProps {
  destinations: Destination[];
  onOpenEnquiry: (contextData?: { destination?: string }) => void;
}

export const DestinationExplorer: React.FC<DestinationExplorerProps> = ({
  destinations,
  onOpenEnquiry,
}) => {
  return (
    <section className="py-20 bg-white border-b border-emerald-100 font-sans">
      <div className="container">
        {/* Section Header */}
        <div className="sec-title centered">
          <span className="section-tag">Explore The Region</span>
          <h2>Discover <span>Dooars & Bhutan</span></h2>
          <div className="desc-text">
            From wild tiger reserves and rhino grasslands to royal palaces and Bhutan border towns — explore the prime destinations of Dooars.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} onOpenEnquiry={onOpenEnquiry} />
          ))}
        </div>
      </div>
    </section>
  );
};
