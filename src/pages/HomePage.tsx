import React from 'react';
import { Hero } from '../components/Hero';
import { ServicesSection } from '../components/ServicesSection';
import { PopularToursSection } from '../components/PopularToursSection';
import { WildlifeSection } from '../components/WildlifeSection';
import { DestinationExplorer } from '../components/DestinationExplorer';
import { PickupDropSection } from '../components/PickupDropSection';
import { LatestVehiclesSection } from '../components/LatestVehiclesSection';
import { AboutBookingSection } from '../components/AboutBookingSection';
import { QuestionsSupportStrip } from '../components/QuestionsSupportStrip';
import { FAQSection } from '../components/FAQSection';
import type { Package, Destination, Vehicle, Hotel, SafariInfo, BusinessSettings } from '../types';

interface HomePageProps {
  settings: BusinessSettings;
  packages: Package[];
  destinations: Destination[];
  vehicles: Vehicle[];
  hotels: Hotel[];
  safaris: SafariInfo[];
  onOpenEnquiry: (contextData?: { title?: string; destination?: string; tripType?: string; vehiclePreference?: string; hotelPreference?: string }) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  settings,
  packages,
  destinations,
  vehicles,
  hotels,
  safaris,
  onOpenEnquiry,
}) => {
  return (
    <div className="w-full font-sans">
      {/* 1. Main Slider Hero Banner */}
      <Hero settings={settings} onOpenEnquiry={() => onOpenEnquiry()} />

      {/* 2. Our Awesome Services */}
      <ServicesSection onOpenEnquiry={onOpenEnquiry} />

      {/* 3. Our Popular Tour Packages */}
      <PopularToursSection packages={packages} onOpenEnquiry={onOpenEnquiry} />

      {/* 4. Wildlife & Safari Section */}
      <WildlifeSection />

      {/* 5. Regional Destination Explorer */}
      <DestinationExplorer destinations={destinations} onOpenEnquiry={onOpenEnquiry} />

      {/* 6. Airport & Station Transfers */}
      <PickupDropSection onOpenEnquiry={onOpenEnquiry} />

      {/* 7. Our Cars & Fleet (Placed Right Above About Us) */}
      <LatestVehiclesSection vehicles={vehicles} onOpenEnquiry={onOpenEnquiry} />

      {/* 8. About Wild Dooars & Quick Booking Widget */}
      <AboutBookingSection settings={settings} onOpenEnquiry={onOpenEnquiry} />

      {/* 9. Questions Support Strip */}
      <QuestionsSupportStrip settings={settings} />

      {/* 10. Frequently Asked Questions */}
      <FAQSection />
    </div>
  );
};
