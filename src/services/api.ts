import type { Package, Destination, SafariInfo, Vehicle, Hotel, BusinessSettings, Enquiry } from '../types';
import { initialSettings, initialDestinations, initialPackages, initialSafaris, initialVehicles, initialHotels, initialEnquiries } from './mockData';

// Gallery types
export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  category: 'forest' | 'animals' | 'safaris';
}

const STORAGE_KEYS = {
  SETTINGS: 'wd_settings',
  DESTINATIONS: 'wd_destinations',
  PACKAGES: 'wd_packages',
  SAFARIS: 'wd_safaris',
  VEHICLES: 'wd_vehicles',
  HOTELS: 'wd_hotels',
  ENQUIRIES: 'wd_enquiries',
  MEDIA: 'wd_media',
  GALLERY: 'wd_gallery',
  AUTH: 'wd_admin_auth',
  AUTH_TIMESTAMP: 'wd_admin_auth_ts',
  LOGIN_ATTEMPTS: 'wd_login_attempts',
  LOCKOUT_UNTIL: 'wd_lockout_until'
};

const DATA_VERSION_KEY = 'wd_data_version_v20';

// Session timeout: 8 hours in milliseconds
const SESSION_TIMEOUT_MS = 8 * 60 * 60 * 1000;

// Brute force protection
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

// SHA-256 hash of the admin password — actual password NEVER appears in source code
const ADMIN_PASSWORD_HASH = 'cebd6ea57963c133284d784e6d84537ce7ec927621cab720bd04d84e5cdf9d50';
const ADMIN_USERNAMES = ['admin', 'wilddooarstoursandtravels@gmail.com', 'admin@wilddooarstoursandtravels.in', 'admin@wilddooars.com'];

// Default gallery photos (migrated from galleryData.ts)
const initialGalleryPhotos: GalleryPhoto[] = [
  { id: '1', src: '/images/gallery/gallery_01.jpg', alt: 'Jayanti Riverbed and Bhutan Hills', category: 'forest' },
  { id: '2', src: '/images/gallery/gallery_02.jpg', alt: 'Jayanti River Trail', category: 'forest' },
  { id: '3', src: '/images/gallery/gallery_03.jpg', alt: 'Mountain Riverbed Stones', category: 'forest' },
  { id: '4', src: '/images/gallery/gallery_04.jpg', alt: 'Indian Bison (Gaur)', category: 'animals' },
  { id: '5', src: '/images/gallery/gallery_05.jpg', alt: 'One-Horned Rhinoceros', category: 'animals' },
  { id: '6', src: '/images/gallery/gallery_06.jpg', alt: 'Asian Elephant Herd', category: 'animals' },
  { id: '7', src: '/images/gallery/gallery_07.jpg', alt: 'Elephant Safari in Dooars', category: 'safaris' },
  { id: '8', src: '/images/gallery/gallery_08.jpg', alt: 'Wild Tusker Elephant', category: 'animals' },
  { id: '9', src: '/images/gallery/gallery_09.jpg', alt: 'Indian Leopard', category: 'animals' },
  { id: '10', src: '/images/gallery/gallery_10.jpg', alt: 'Jungle Jeep Safari', category: 'safaris' },
  { id: '11', src: '/images/gallery/gallery_11.jpg', alt: 'Indian Gaur Bull', category: 'animals' },
  { id: '12', src: '/images/gallery/gallery_12.jpg', alt: 'Aerial Forest Canopy and River', category: 'forest' },
  { id: '13', src: '/images/gallery/gallery_13.jpg', alt: 'Morning Elephant Safari', category: 'safaris' },
  { id: '14', src: '/images/gallery/gallery_14.jpg', alt: 'Barking Deer', category: 'animals' },
  { id: '15', src: '/images/gallery/gallery_15.jpg', alt: 'Sambar Deer Stag', category: 'animals' },
  { id: '16', src: '/images/gallery/gallery_16.jpg', alt: 'Sambar Deer in Meadow', category: 'animals' },
  { id: '17', src: '/images/gallery/gallery_17.jpg', alt: 'Rhino Mother and Calf', category: 'animals' },
  { id: '18', src: '/images/gallery/gallery_18.jpg', alt: 'Indian Peacock', category: 'animals' }
];

// Force sync localStorage with exact dataset if version changes
function initializeLocalStorage() {
  if (localStorage.getItem(DATA_VERSION_KEY) !== 'synced') {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(initialSettings));
    localStorage.setItem(STORAGE_KEYS.DESTINATIONS, JSON.stringify(initialDestinations));
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(initialPackages));
    localStorage.setItem(STORAGE_KEYS.SAFARIS, JSON.stringify(initialSafaris));
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(initialVehicles));
    localStorage.setItem(STORAGE_KEYS.HOTELS, JSON.stringify(initialHotels));
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(initialGalleryPhotos));
    localStorage.setItem(DATA_VERSION_KEY, 'synced');
  }

  if (!localStorage.getItem(STORAGE_KEYS.ENQUIRIES)) {
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(initialEnquiries));
  }

  if (!localStorage.getItem(STORAGE_KEYS.GALLERY)) {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(initialGalleryPhotos));
  }
}

initializeLocalStorage();

// SHA-256 hashing utility using Web Crypto API
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

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
    const s = await fetchWithFallback<BusinessSettings>('/api/settings/get.php', STORAGE_KEYS.SETTINGS, initialSettings);
    return {
      ...initialSettings,
      ...s,
      email: s?.email || initialSettings.email,
      facebookUrl: s?.facebookUrl || initialSettings.facebookUrl,
      instagramUrl: s?.instagramUrl || initialSettings.instagramUrl,
    };
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

  // GALLERY
  async getGallery(): Promise<GalleryPhoto[]> {
    const stored = localStorage.getItem(STORAGE_KEYS.GALLERY);
    return stored ? JSON.parse(stored) : initialGalleryPhotos;
  },

  async saveGalleryPhoto(photo: GalleryPhoto): Promise<boolean> {
    const photos = await this.getGallery();
    const index = photos.findIndex(p => p.id === photo.id);
    if (index >= 0) {
      photos[index] = photo;
    } else {
      photos.push(photo);
    }
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(photos));
    return true;
  },

  async deleteGalleryPhoto(id: string): Promise<boolean> {
    const photos = await this.getGallery();
    const filtered = photos.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(filtered));
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

  // AUTH — Secure SHA-256 hashed authentication with brute-force protection
  isLoggedIn(): boolean {
    const authFlag = localStorage.getItem(STORAGE_KEYS.AUTH);
    if (authFlag !== 'true') return false;

    // Check session timeout
    const authTimestamp = localStorage.getItem(STORAGE_KEYS.AUTH_TIMESTAMP);
    if (authTimestamp) {
      const elapsed = Date.now() - parseInt(authTimestamp, 10);
      if (elapsed > SESSION_TIMEOUT_MS) {
        this.logout();
        return false;
      }
    }

    return true;
  },

  isLockedOut(): boolean {
    const lockoutUntil = localStorage.getItem(STORAGE_KEYS.LOCKOUT_UNTIL);
    if (!lockoutUntil) return false;
    if (Date.now() < parseInt(lockoutUntil, 10)) return true;
    // Lockout expired, clear it
    localStorage.removeItem(STORAGE_KEYS.LOCKOUT_UNTIL);
    localStorage.removeItem(STORAGE_KEYS.LOGIN_ATTEMPTS);
    return false;
  },

  getLockoutRemainingSeconds(): number {
    const lockoutUntil = localStorage.getItem(STORAGE_KEYS.LOCKOUT_UNTIL);
    if (!lockoutUntil) return 0;
    const remaining = parseInt(lockoutUntil, 10) - Date.now();
    return remaining > 0 ? Math.ceil(remaining / 1000) : 0;
  },

  getLoginAttempts(): number {
    const attempts = localStorage.getItem(STORAGE_KEYS.LOGIN_ATTEMPTS);
    return attempts ? parseInt(attempts, 10) : 0;
  },

  async login(username: string, pass: string): Promise<boolean> {
    // Check lockout first
    if (this.isLockedOut()) return false;

    // Verify username
    const normalizedUsername = username.trim().toLowerCase();
    if (!ADMIN_USERNAMES.includes(normalizedUsername)) {
      this._recordFailedAttempt();
      return false;
    }

    // Hash the entered password and compare with stored hash
    const enteredHash = await sha256(pass);
    if (enteredHash !== ADMIN_PASSWORD_HASH) {
      this._recordFailedAttempt();
      return false;
    }

    // Success — clear attempts and set auth
    localStorage.removeItem(STORAGE_KEYS.LOGIN_ATTEMPTS);
    localStorage.removeItem(STORAGE_KEYS.LOCKOUT_UNTIL);
    localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
    localStorage.setItem(STORAGE_KEYS.AUTH_TIMESTAMP, Date.now().toString());
    return true;
  },

  _recordFailedAttempt(): void {
    const attempts = this.getLoginAttempts() + 1;
    localStorage.setItem(STORAGE_KEYS.LOGIN_ATTEMPTS, attempts.toString());
    if (attempts >= MAX_LOGIN_ATTEMPTS) {
      localStorage.setItem(STORAGE_KEYS.LOCKOUT_UNTIL, (Date.now() + LOCKOUT_DURATION_MS).toString());
    }
  },

  refreshSession(): void {
    if (this.isLoggedIn()) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TIMESTAMP, Date.now().toString());
    }
  },

  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TIMESTAMP);
  }
};
