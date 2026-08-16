import React from 'react';
import { DestinationExplorer } from '../components/DestinationExplorer';
import type { Destination } from '../types';

interface DestinationsPageProps {
  destinations: Destination[];
  onOpenEnquiry: (contextData?: { destination?: string }) => void;
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({ destinations, onOpenEnquiry }) => {
  return (
    <div className="pt-4 sm:pt-8 pb-20 font-sans bg-white">
      <div className="container">
        <div className="sec-title centered max-w-3xl mx-auto mb-12">
          <span className="section-tag">Explore North Bengal</span>
          <h2>
            Dooars & Bhutan <span>Destinations</span>
          </h2>
          <div className="desc-text">
            Explore national parks, tiger reserves, riverfronts, historical palaces, and cross-border towns across Eastern and Western Dooars.
          </div>
        </div>

        <DestinationExplorer destinations={destinations} onOpenEnquiry={onOpenEnquiry} />
      </div>
    </div>
  );
};
