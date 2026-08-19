export interface Package {
  id: string;
  name: string;
  slug: string;
  destination: string;
  category: 'Family' | 'Honeymoon' | 'Adventure' | 'Wildlife' | 'Package Tours' | 'Customized';
  duration: string;
  shortDescription: string;
  fullDescription: string;
  mainImage: string;
  gallery: string[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  importantNotes?: string[];
  faqs?: FAQItem[];
  isFeatured?: boolean;
  isPublished?: boolean;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  description: string;
  activities?: string[];
  image?: string;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  intro: string;
  description: string;
  mainImage: string;
  gallery: string[];
  attractions: string[];
  activities: string[];
  isFeatured?: boolean;
  isPublished?: boolean;
}

export interface SafariInfo {
  id: string;
  name: string;
  safariType: 'Jeep Safari' | 'Elephant Safari' | 'Wildlife Trail';
  location: string;
  description: string;
  image: string;
  availabilityNote: string;
  isPublished?: boolean;
}

export interface Vehicle {
  id: string;
  name: string;
  seatingCapacity: string;
  fuelType: string;
  acType: 'AC' | 'Non-AC' | 'Both Available' | 'Non-AC / AC';
  features: string[];
  image: string;
  isPublished?: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  propertyType: 'Hotel' | 'Resort' | 'Homestay';
  location: string;
  description: string;
  amenities: string[];
  image: string;
  gallery?: string[];
  isPublished?: boolean;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  travelDate?: string;
  travellersCount?: string;
  destination?: string;
  tripType?: string;
  vehiclePreference?: string;
  hotelPreference?: string;
  message?: string;
  status: 'New' | 'Contacted' | 'Follow-up' | 'Confirmed' | 'Closed';
  createdAt: string;
  internalNotes?: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BusinessSettings {
  businessName: string;
  bengaliName: string;
  phone: string;
  alternatePhone?: string;
  whatsapp: string;
  email: string;
  address: string;
  plusCode: string;
  googleRating: string;
  reviewsCount: string;
  googleMapsUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroImage: string;
  footerText: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: string;
}
