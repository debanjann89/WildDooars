import React, { useState } from 'react';
import { X, Image as ImageIcon, Check } from 'lucide-react';

interface MediaEntry {
  id: string;
  name: string;
  url: string;
  folder: string;
}

// Catalog of existing project images
const libraryPhotos: MediaEntry[] = [
  // Packages
  { id: 'p01', name: 'Rhino Safari Main', url: '/images/package_rhino_main.jpg', folder: 'Packages' },
  { id: 'p02', name: 'Rhino Gallery 1', url: '/images/package_rhino_gallery1.jpg', folder: 'Packages' },
  { id: 'p03', name: 'Rhino Gallery 2', url: '/images/package_rhino_gallery2.jpg', folder: 'Packages' },
  { id: 'p04', name: 'Buxa Main', url: '/images/package_buxa_main.jpg', folder: 'Packages' },
  { id: 'p05', name: 'Buxa Gallery 1', url: '/images/package_buxa_gallery1.jpg', folder: 'Packages' },
  { id: 'p06', name: 'Buxa Gallery 2', url: '/images/package_buxa_gallery2.jpg', folder: 'Packages' },
  { id: 'p07', name: 'Grand Tour Main', url: '/images/package_grand_main.jpg', folder: 'Packages' },
  { id: 'p08', name: 'Grand Gallery 1', url: '/images/package_grand_gallery1.jpg', folder: 'Packages' },
  { id: 'p09', name: 'Romantic Main', url: '/images/package_romantic_main.jpg', folder: 'Packages' },
  { id: 'p10', name: 'Family Main', url: '/images/package_family_main.jpg', folder: 'Packages' },
  { id: 'p11', name: 'Family Full', url: '/images/package_family_full.jpg', folder: 'Packages' },

  // Hotels
  { id: 'h01', name: 'Bamboo Cottage Interior', url: '/images/hotels/bamboo_cottage_interior.jpg', folder: 'Hotels' },
  { id: 'h02', name: 'Cottage Night Pond', url: '/images/hotels/bamboo_cottage_night_pond.jpg', folder: 'Hotels' },
  { id: 'h03', name: 'Cottage Day Garden', url: '/images/hotels/bamboo_cottage_day_garden.jpg', folder: 'Hotels' },
  { id: 'h04', name: 'Family Suite Master', url: '/images/hotels/family_suite_master.jpg', folder: 'Hotels' },
  { id: 'h05', name: 'Suite Cane Lounge', url: '/images/hotels/family_suite_cane_lounge.jpg', folder: 'Hotels' },
  { id: 'h06', name: 'Luxury Attached Bath', url: '/images/hotels/luxury_attached_bathroom.jpg', folder: 'Hotels' },
  { id: 'h07', name: 'Deluxe Nature Room', url: '/images/hotels/deluxe_nature_room.jpg', folder: 'Hotels' },
  { id: 'h08', name: 'Executive Double Room', url: '/images/hotels/executive_double_room.jpg', folder: 'Hotels' },
  { id: 'h09', name: 'Swimming Pool', url: '/images/hotels/resort_swimming_pool.jpg', folder: 'Hotels' },
  { id: 'h10', name: 'Resort Main Fountain', url: '/images/hotels/resort_main_fountain.jpg', folder: 'Hotels' },
  { id: 'h11', name: 'Resort Sprawling Lawn', url: '/images/hotels/resort_sprawling_lawn.jpg', folder: 'Hotels' },

  // Vehicles
  { id: 'v01', name: 'Toyota Innova', url: '/images/car_innova.jpg', folder: 'Vehicles' },
  { id: 'v02', name: 'Mahindra Bolero', url: '/images/car_bolero.jpg', folder: 'Vehicles' },
  { id: 'v03', name: 'Tata Sumo Gold', url: '/images/car_sumo.jpg', folder: 'Vehicles' },
  { id: 'v04', name: 'Maruti Ertiga', url: '/images/car_ertiga.jpg', folder: 'Vehicles' },
  { id: 'v05', name: 'Swift Dzire', url: '/images/car_dzire.jpg', folder: 'Vehicles' },
  { id: 'v06', name: 'Maruti WagonR', url: '/images/car_wagonr.jpg', folder: 'Vehicles' },

  // Destinations
  { id: 'd01', name: 'Jaldapara National Park', url: '/images/dest_jaldapara.jpg', folder: 'Destinations' },
  { id: 'd02', name: 'Buxa Tiger Reserve', url: '/images/dest_buxa.jpg', folder: 'Destinations' },
  { id: 'd03', name: 'Cooch Behar Heritage', url: '/images/dest_coochbehar.jpg', folder: 'Destinations' },
  { id: 'd04', name: 'Gorumara National Park', url: '/images/dest_gorumara.jpg', folder: 'Destinations' },
  { id: 'd05', name: 'Phuentsholing Bhutan', url: '/images/dest_phuentsholing.jpg', folder: 'Destinations' },
  { id: 'd06', name: 'Jaldapara Forest Gate', url: '/images/jaldapara_gate.jpg', folder: 'Destinations' },

  // Jhalong & Samsing
  { id: 'j01', name: 'Bindu Dam Main', url: '/images/jhalong/jhalong_bindu_dam_main.jpg', folder: 'Jhalong' },
  { id: 'j02', name: 'Samsing Viewpoint Sign', url: '/images/jhalong/samsing_viewpoint_sign.jpg', folder: 'Jhalong' },
  { id: 'j03', name: 'Suntalekhola Bridge', url: '/images/jhalong/suntalekhola_hanging_bridge.jpg', folder: 'Jhalong' },
  { id: 'j04', name: 'Rocky Island Pool', url: '/images/jhalong/rocky_island_natural_pool.jpg', folder: 'Jhalong' },
  { id: 'j05', name: 'Jhalong Arch Bridge', url: '/images/jhalong/jhalong_arch_bridge.jpg', folder: 'Jhalong' },
  { id: 'j06', name: 'Jaldhaka River Gorge', url: '/images/jhalong/jaldhaka_river_rapid_gorge.jpg', folder: 'Jhalong' },

  // Wildlife & Gallery
  { id: 'g01', name: 'Jayanti Riverbed', url: '/images/gallery/gallery_01.jpg', folder: 'Gallery' },
  { id: 'g04', name: 'Indian Bison (Gaur)', url: '/images/gallery/gallery_04.jpg', folder: 'Gallery' },
  { id: 'g05', name: 'One-Horned Rhinoceros', url: '/images/gallery/gallery_05.jpg', folder: 'Gallery' },
  { id: 'g06', name: 'Asian Elephant Herd', url: '/images/gallery/gallery_06.jpg', folder: 'Gallery' },
  { id: 'g07', name: 'Elephant Safari', url: '/images/gallery/gallery_07.jpg', folder: 'Gallery' },
  { id: 'g08', name: 'Wild Tusker Elephant', url: '/images/gallery/gallery_08.jpg', folder: 'Gallery' },
  { id: 'g09', name: 'Indian Leopard', url: '/images/gallery/gallery_09.jpg', folder: 'Gallery' },
  { id: 'g10', name: 'Jungle Jeep Safari', url: '/images/gallery/gallery_10.jpg', folder: 'Gallery' },
  { id: 'g11', name: 'Indian Gaur Bull', url: '/images/gallery/gallery_11.jpg', folder: 'Gallery' },
  { id: 'g14', name: 'Barking Deer', url: '/images/gallery/gallery_14.jpg', folder: 'Gallery' },
  { id: 'g15', name: 'Sambar Deer Stag', url: '/images/gallery/gallery_15.jpg', folder: 'Gallery' },
  { id: 'g17', name: 'Rhino Mother & Calf', url: '/images/gallery/gallery_17.jpg', folder: 'Gallery' },
  { id: 'g18', name: 'Indian Peacock', url: '/images/gallery/gallery_18.jpg', folder: 'Gallery' },
];

const folders = ['All', 'Packages', 'Hotels', 'Vehicles', 'Destinations', 'Jhalong', 'Gallery'];

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPhoto: (url: string) => void;
  title?: string;
}

export const MediaLibraryModal: React.FC<MediaLibraryModalProps> = ({
  isOpen,
  onClose,
  onSelectPhoto,
  title = 'Select Photo from Media Library'
}) => {
  const [activeFolder, setActiveFolder] = useState('All');

  if (!isOpen) return null;

  const filtered = activeFolder === 'All'
    ? libraryPhotos
    : libraryPhotos.filter(p => p.folder === activeFolder);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-stone-200">
        {/* Header */}
        <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#15803d]" />
            <h3 className="text-sm font-black uppercase text-slate-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Folder filter tabs */}
        <div className="p-3 bg-white border-b border-stone-100 flex flex-wrap gap-1.5">
          {folders.map(folder => (
            <button
              key={folder}
              onClick={() => setActiveFolder(folder)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeFolder === folder
                  ? 'bg-[#15803d] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {folder}
            </button>
          ))}
        </div>

        {/* Photos Grid */}
        <div className="p-4 overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filtered.map(photo => (
            <div
              key={photo.id}
              onClick={() => {
                onSelectPhoto(photo.url);
                onClose();
              }}
              className="group relative rounded-xl overflow-hidden border border-stone-200 bg-stone-50 cursor-pointer hover:border-[#15803d] hover:shadow-md transition-all flex flex-col"
            >
              <div className="h-28 overflow-hidden bg-stone-100 relative">
                <img
                  src={photo.url}
                  alt={photo.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <div className="w-8 h-8 rounded-full bg-[#15803d] flex items-center justify-center shadow-lg">
                    <Check className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <div className="p-2 bg-white flex-1">
                <p className="text-[11px] font-bold text-slate-800 truncate">{photo.name}</p>
                <span className="text-[9px] text-stone-400 uppercase font-semibold">{photo.folder}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-stone-200 bg-stone-50 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-stone-600 hover:text-stone-900 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
