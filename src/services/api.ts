import type { Package, Destination, SafariInfo, Vehicle, Hotel, BusinessSettings, Enquiry } from '../types';
import { initialSettings, initialDestinations, initialPackages, initialSafaris, initialVehicles, initialHotels, initialEnquiries } from './mockData';

const STORAGE_KEYS = {
  SETTINGS: 'wd_settings',
  DESTINATIONS: 'wd_destinations',
  PACKAGES: 'wd_packages',
  SAFARIS: 'wd_safaris',
  VEHICLES: 'wd_vehicles',
  HOTELS: 'wd_hotels',
  ENQUIRIES: 'wd_enquiries',
  MEDIA: 'wd_media',
  AUTH: 'wd_admin_auth'
};

const DATA_VERSION_KEY = 'wd_data_version_v4';

// Force sync localStorage with exact dataset if version changes
function initializeLocalStorage() {
  if (localStorage.getItem(DATA_VERSION_KEY) !== 'synced') {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(initialSettings));
    localStorage.setItem(STORAGE_KEYS.DESTINATIONS, JSON.stringify(initialDestinations));
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(initialPackages));
    localStorage.setItem(STORAGE_KEYS.SAFARIS, JSON.stringify(initialSafaris));
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(initialVehicles));
    localStorage.setItem(STORAGE_KEYS.HOTELS, JSON.stringify(initialHotels));
    localStorage.setItem(DATA_VERSION_KEY, 'synced');
  }

  if (!localStorage.getItem(STORAGE_KEYS.ENQUIRIES)) {
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(initialEnquiries));
  }
}

initializeLocalStorage();

// Helper to make API requests with fallback to localStorage
async function fetchWithFallback<T>(url: string, storageKey: string, defaultData: T): Promise<T> {
  try {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data && data.success) {
        return data.data as T;
      }
    }
  } catch {
    // API backend server is offline or proxy not running, use local storage fallback
  }

  const stored = localStorage.getItem(storageKey);
  return stored ? JSON.parse(stored) : defaultData;
}

export const apiService = {
  // SETTINGS
  async getSettings(): Promise<BusinessSettings> {
    return fetchWithFallback<BusinessSettings>('/api/settings/get.php', STORAGE_KEYS.SETTINGS, initialSettings);
  },

  async updateSettings(settings: BusinessSettings): Promise<boolean> {
    try {
      const res = await fetch('/api/settings/update.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) return true;
      }
    } catch {
      // Fallback
    }
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    return true;
  },

  // PACKAGES
  async getPackages(): Promise<Package[]> {
    return fetchWithFallback<Package[]>('/api/packages/index.php', STORAGE_KEYS.PACKAGES, initialPackages);
  },

  async getPackageBySlug(slug: string): Promise<Package | null> {
    const packages = await this.getPackages();
    return packages.find(p => p.slug === slug) || null;
  },

  async savePackage(pkg: Package): Promise<boolean> {
    const packages = await this.getPackages();
    const existingIndex = packages.findIndex(p => p.id === pkg.id);
    if (existingIndex >= 0) {
      packages[existingIndex] = pkg;
    } else {
      packages.unshift(pkg);
    }
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));
    return true;
  },

  async deletePackage(id: string): Promise<boolean> {
    const packages = await this.getPackages();
    const filtered = packages.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(filtered));
    return true;
  },

  // DESTINATIONS
  async getDestinations(): Promise<Destination[]> {
    return fetchWithFallback<Destination[]>('/api/destinations/index.php', STORAGE_KEYS.DESTINATIONS, initialDestinations);
  },

  async getDestinationBySlug(slug: string): Promise<Destination | null> {
    const destinations = await this.getDestinations();
    return destinations.find(d => d.slug === slug) || null;
  },

  async saveDestination(dest: Destination): Promise<boolean> {
    const destinations = await this.getDestinations();
    const index = destinations.findIndex(d => d.id === dest.id);
    if (index >= 0) {
      destinations[index] = dest;
    } else {
      destinations.unshift(dest);
    }
    localStorage.setItem(STORAGE_KEYS.DESTINATIONS, JSON.stringify(destinations));
    return true;
  },

  async deleteDestination(id: string): Promise<boolean> {
    const destinations = await this.getDestinations();
    const filtered = destinations.filter(d => d.id !== id);
    localStorage.setItem(STORAGE_KEYS.DESTINATIONS, JSON.stringify(filtered));
    return true;
  },

  // SAFARIS
  async getSafaris(): Promise<SafariInfo[]> {
    return fetchWithFallback<SafariInfo[]>('/api/safaris/index.php', STORAGE_KEYS.SAFARIS, initialSafaris);
  },

  async saveSafari(safari: SafariInfo): Promise<boolean> {
    const safaris = await this.getSafaris();
    const index = safaris.findIndex(s => s.id === safari.id);
    if (index >= 0) {
      safaris[index] = safari;
    } else {
      safaris.unshift(safari);
    }
    localStorage.setItem(STORAGE_KEYS.SAFARIS, JSON.stringify(safaris));
    return true;
  },

  async deleteSafari(id: string): Promise<boolean> {
    const safaris = await this.getSafaris();
    const filtered = safaris.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.SAFARIS, JSON.stringify(filtered));
    return true;
  },

  // VEHICLES
  async getVehicles(): Promise<Vehicle[]> {
    return fetchWithFallback<Vehicle[]>('/api/vehicles/index.php', STORAGE_KEYS.VEHICLES, initialVehicles);
  },

  async saveVehicle(vehicle: Vehicle): Promise<boolean> {
    const vehicles = await this.getVehicles();
    const index = vehicles.findIndex(v => v.id === vehicle.id);
    if (index >= 0) {
      vehicles[index] = vehicle;
    } else {
      vehicles.unshift(vehicle);
    }
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(vehicles));
    return true;
  },

  async deleteVehicle(id: string): Promise<boolean> {
    const vehicles = await this.getVehicles();
    const filtered = vehicles.filter(v => v.id !== id);
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(filtered));
    return true;
  },

  // HOTELS
  async getHotels(): Promise<Hotel[]> {
    return fetchWithFallback<Hotel[]>('/api/hotels/index.php', STORAGE_KEYS.HOTELS, initialHotels);
  },

  async saveHotel(hotel: Hotel): Promise<boolean> {
    const hotels = await this.getHotels();
    const index = hotels.findIndex(h => h.id === hotel.id);
    if (index >= 0) {
      hotels[index] = hotel;
    } else {
      hotels.unshift(hotel);
    }
    localStorage.setItem(STORAGE_KEYS.HOTELS, JSON.stringify(hotels));
    return true;
  },

  async deleteHotel(id: string): Promise<boolean> {
    const hotels = await this.getHotels();
    const filtered = hotels.filter(h => h.id !== id);
    localStorage.setItem(STORAGE_KEYS.HOTELS, JSON.stringify(filtered));
    return true;
  },

  // ENQUIRIES
  async getEnquiries(): Promise<Enquiry[]> {
    return fetchWithFallback<Enquiry[]>('/api/enquiries/index.php', STORAGE_KEYS.ENQUIRIES, initialEnquiries);
  },

  async submitEnquiry(enquiry: Omit<Enquiry, 'id' | 'status' | 'createdAt'>): Promise<{ success: boolean; message: string }> {
    const newEnquiry: Enquiry = {
      ...enquiry,
      id: 'enq-' + Date.now(),
      status: 'New',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };

    try {
      const res = await fetch('/api/enquiries/create.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEnquiry)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) return { success: true, message: 'Thank you! Your enquiry has been received. Our travel team will contact you shortly.' };
      }
    } catch {
      // Local storage fallback
    }

    const enquiries = await this.getEnquiries();
    enquiries.unshift(newEnquiry);
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));

    return {
      success: true,
      message: 'Thank you! Your enquiry has been received. Our travel team will contact you shortly.'
    };
  },

  async updateEnquiryStatus(id: string, status: Enquiry['status'], note?: string): Promise<boolean> {
    const enquiries = await this.getEnquiries();
    const enquiry = enquiries.find(e => e.id === id);
    if (enquiry) {
      enquiry.status = status;
      if (note) {
        if (!enquiry.internalNotes) enquiry.internalNotes = [];
        enquiry.internalNotes.push(`${new Date().toLocaleTimeString()} - ${note}`);
      }
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
      return true;
    }
    return false;
  },

  async deleteEnquiry(id: string): Promise<boolean> {
    const enquiries = await this.getEnquiries();
    const filtered = enquiries.filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(filtered));
    return true;
  },

  // AUTH
  isLoggedIn(): boolean {
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  },

  login(username: string, pass: string): boolean {
    if ((username === 'admin@wilddooars.com' || username === 'admin') && pass === 'WildDooars@2026') {
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      return true;
    }
    return false;
  },

  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  }
};
