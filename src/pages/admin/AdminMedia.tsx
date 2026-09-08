
interface MediaEntry {
  id: string;
  name: string;
  url: string;
  folder: string;
}

// Catalog of actual project images from /public/images/
const projectMedia: MediaEntry[] = [
  // Gallery
  { id: 'g01', name: 'Jayanti Riverbed', url: '/images/gallery/gallery_01.jpg', folder: 'Gallery' },
  { id: 'g02', name: 'River Trail', url: '/images/gallery/gallery_02.jpg', folder: 'Gallery' },
  { id: 'g03', name: 'Riverbed Stones', url: '/images/gallery/gallery_03.jpg', folder: 'Gallery' },
  { id: 'g04', name: 'Indian Bison', url: '/images/gallery/gallery_04.jpg', folder: 'Gallery' },
  { id: 'g05', name: 'Rhinoceros', url: '/images/gallery/gallery_05.jpg', folder: 'Gallery' },
  { id: 'g06', name: 'Elephant Herd', url: '/images/gallery/gallery_06.jpg', folder: 'Gallery' },
  { id: 'g07', name: 'Elephant Safari', url: '/images/gallery/gallery_07.jpg', folder: 'Gallery' },
  { id: 'g08', name: 'Wild Tusker', url: '/images/gallery/gallery_08.jpg', folder: 'Gallery' },
  { id: 'g09', name: 'Indian Leopard', url: '/images/gallery/gallery_09.jpg', folder: 'Gallery' },
  { id: 'g10', name: 'Jeep Safari', url: '/images/gallery/gallery_10.jpg', folder: 'Gallery' },
  { id: 'g11', name: 'Gaur Bull', url: '/images/gallery/gallery_11.jpg', folder: 'Gallery' },
  { id: 'g12', name: 'Aerial Canopy', url: '/images/gallery/gallery_12.jpg', folder: 'Gallery' },
  { id: 'g13', name: 'Morning Safari', url: '/images/gallery/gallery_13.jpg', folder: 'Gallery' },
  { id: 'g14', name: 'Barking Deer', url: '/images/gallery/gallery_14.jpg', folder: 'Gallery' },
  { id: 'g15', name: 'Sambar Deer Stag', url: '/images/gallery/gallery_15.jpg', folder: 'Gallery' },
  { id: 'g16', name: 'Sambar Deer Meadow', url: '/images/gallery/gallery_16.jpg', folder: 'Gallery' },
  { id: 'g17', name: 'Rhino Mother & Calf', url: '/images/gallery/gallery_17.jpg', folder: 'Gallery' },
  { id: 'g18', name: 'Indian Peacock', url: '/images/gallery/gallery_18.jpg', folder: 'Gallery' },

  // Hotels
  { id: 'h01', name: 'Bamboo Cottage Interior', url: '/images/hotels/bamboo_cottage_interior.jpg', folder: 'Hotels' },
  { id: 'h02', name: 'Cottage Night Pond', url: '/images/hotels/bamboo_cottage_night_pond.jpg', folder: 'Hotels' },
  { id: 'h03', name: 'Cottage Day Garden', url: '/images/hotels/bamboo_cottage_day_garden.jpg', folder: 'Hotels' },
  { id: 'h04', name: 'Cottage Veranda', url: '/images/hotels/bamboo_cottage_illuminated_veranda.jpg', folder: 'Hotels' },
  { id: 'h05', name: 'Garden Cottages Row', url: '/images/hotels/garden_cottages_row.jpg', folder: 'Hotels' },
  { id: 'h06', name: 'Family Suite Master', url: '/images/hotels/family_suite_master.jpg', folder: 'Hotels' },
  { id: 'h07', name: 'Suite Cane Lounge', url: '/images/hotels/family_suite_cane_lounge.jpg', folder: 'Hotels' },
  { id: 'h08', name: 'Suite Panoramic', url: '/images/hotels/family_suite_panoramic.jpg', folder: 'Hotels' },
  { id: 'h09', name: 'Luxury Bathroom', url: '/images/hotels/luxury_attached_bathroom.jpg', folder: 'Hotels' },
  { id: 'h10', name: 'Deluxe Nature Room', url: '/images/hotels/deluxe_nature_room.jpg', folder: 'Hotels' },
  { id: 'h11', name: 'Nature Balcony View', url: '/images/hotels/nature_balcony_river_view.jpg', folder: 'Hotels' },
  { id: 'h12', name: 'Executive Room', url: '/images/hotels/executive_double_room.jpg', folder: 'Hotels' },
  { id: 'h13', name: 'Swimming Pool', url: '/images/hotels/resort_swimming_pool.jpg', folder: 'Hotels' },
  { id: 'h14', name: 'Resort Aerial Forest', url: '/images/hotels/resort_aerial_dense_forest.jpg', folder: 'Hotels' },
  { id: 'h15', name: 'Resort Aerial River', url: '/images/hotels/resort_aerial_river_tea.jpg', folder: 'Hotels' },
  { id: 'h16', name: 'Resort Fountain', url: '/images/hotels/resort_main_fountain.jpg', folder: 'Hotels' },
  { id: 'h17', name: 'Resort Pathway', url: '/images/hotels/resort_pathway_walk.jpg', folder: 'Hotels' },
  { id: 'h18', name: 'Resort Lawn', url: '/images/hotels/resort_sprawling_lawn.jpg', folder: 'Hotels' },
  { id: 'h19', name: 'Statue Fountain', url: '/images/hotels/resort_statue_fountain.jpg', folder: 'Hotels' },
  { id: 'h20', name: 'Resort Villas', url: '/images/hotels/resort_villas_lawn.jpg', folder: 'Hotels' },

  // Vehicles
  { id: 'v01', name: 'Toyota Innova', url: '/images/car_innova.jpg', folder: 'Vehicles' },
  { id: 'v02', name: 'Mahindra Bolero', url: '/images/car_bolero.jpg', folder: 'Vehicles' },
  { id: 'v03', name: 'Tata Sumo', url: '/images/car_sumo.jpg', folder: 'Vehicles' },
  { id: 'v04', name: 'Maruti Ertiga', url: '/images/car_ertiga.jpg', folder: 'Vehicles' },
  { id: 'v05', name: 'Swift Dzire', url: '/images/car_dzire.jpg', folder: 'Vehicles' },
  { id: 'v06', name: 'WagonR', url: '/images/car_wagonr.jpg', folder: 'Vehicles' },

  // Packages
  { id: 'p01', name: 'Rhino Safari Main', url: '/images/package_rhino_main.jpg', folder: 'Packages' },
  { id: 'p02', name: 'Rhino Gallery 1', url: '/images/package_rhino_gallery1.jpg', folder: 'Packages' },
  { id: 'p03', name: 'Rhino Gallery 2', url: '/images/package_rhino_gallery2.jpg', folder: 'Packages' },
  { id: 'p04', name: 'Buxa Main', url: '/images/package_buxa_main.jpg', folder: 'Packages' },
  { id: 'p05', name: 'Buxa Gallery 1', url: '/images/package_buxa_gallery1.jpg', folder: 'Packages' },
  { id: 'p06', name: 'Buxa Gallery 2', url: '/images/package_buxa_gallery2.jpg', folder: 'Packages' },
  { id: 'p07', name: 'Grand Tour Main', url: '/images/package_grand_main.jpg', folder: 'Packages' },
  { id: 'p08', name: 'Grand Gallery 1', url: '/images/package_grand_gallery1.jpg', folder: 'Packages' },
  { id: 'p09', name: 'Grand Gallery 2', url: '/images/package_grand_gallery2.jpg', folder: 'Packages' },
  { id: 'p10', name: 'Romantic Main', url: '/images/package_romantic_main.jpg', folder: 'Packages' },
  { id: 'p11', name: 'Romantic Gallery 1', url: '/images/package_romantic_gallery1.jpg', folder: 'Packages' },
  { id: 'p12', name: 'Romantic Gallery 2', url: '/images/package_romantic_gallery2.jpg', folder: 'Packages' },
  { id: 'p13', name: 'Family Main', url: '/images/package_family_main.jpg', folder: 'Packages' },
  { id: 'p14', name: 'Family Full', url: '/images/package_family_full.jpg', folder: 'Packages' },
  { id: 'p15', name: 'Family Gallery 1', url: '/images/package_family_gallery1.jpg', folder: 'Packages' },
  { id: 'p16', name: 'Family Gallery 2', url: '/images/package_family_gallery2.jpg', folder: 'Packages' },

  // Jhalong
  { id: 'j01', name: 'Bindu Dam', url: '/images/jhalong/jhalong_bindu_dam_main.jpg', folder: 'Jhalong' },
  { id: 'j02', name: 'Samsing Viewpoint', url: '/images/jhalong/samsing_viewpoint_sign.jpg', folder: 'Jhalong' },
  { id: 'j03', name: 'Suntalekhola Bridge', url: '/images/jhalong/suntalekhola_hanging_bridge.jpg', folder: 'Jhalong' },
  { id: 'j04', name: 'Rocky Island Pool', url: '/images/jhalong/rocky_island_natural_pool.jpg', folder: 'Jhalong' },
  { id: 'j05', name: 'Rocky Island Cascade', url: '/images/jhalong/rocky_island_stream_cascade.jpg', folder: 'Jhalong' },
  { id: 'j06', name: 'Jhalong Arch Bridge', url: '/images/jhalong/jhalong_arch_bridge.jpg', folder: 'Jhalong' },
  { id: 'j07', name: 'Bindu Dam Wide', url: '/images/jhalong/bindu_dam_barrage_wide.jpg', folder: 'Jhalong' },
  { id: 'j08', name: 'Jaldhaka Gorge', url: '/images/jhalong/jaldhaka_river_rapid_gorge.jpg', folder: 'Jhalong' },
  { id: 'j09', name: 'Jaldhaka Crystal', url: '/images/jhalong/jaldhaka_river_crystal_blue.jpg', folder: 'Jhalong' },
  { id: 'j10', name: 'Samsing Canyon', url: '/images/jhalong/samsing_canyon_panoramic.jpg', folder: 'Jhalong' },
  { id: 'j11', name: 'Samsing Forest Road', url: '/images/jhalong/samsing_scenic_forest_road.jpg', folder: 'Jhalong' },
  { id: 'j12', name: 'Jhalong River Flags', url: '/images/jhalong/jhalong_river_viewpoint_flags.jpg', folder: 'Jhalong' },
  { id: 'j13', name: 'Jhalong Sunset', url: '/images/jhalong/jhalong_sunset_valley.jpg', folder: 'Jhalong' },

  // Wildlife
  { id: 'w01', name: 'Wildlife Rhino', url: '/images/wildlife/wildlife_rhino.jpg', folder: 'Wildlife' },
  { id: 'w02', name: 'Wildlife Elephant', url: '/images/wildlife/wildlife_elephant.jpg', folder: 'Wildlife' },
  { id: 'w03', name: 'Wildlife Gaur', url: '/images/wildlife/wildlife_gaur.jpg', folder: 'Wildlife' },
  { id: 'w04', name: 'Wildlife Deer', url: '/images/wildlife/wildlife_deer.jpg', folder: 'Wildlife' },
  { id: 'w05', name: 'Wildlife Peacock', url: '/images/wildlife/wildlife_peacock.jpg', folder: 'Wildlife' },
  { id: 'w06', name: 'Wildlife Hornbill', url: '/images/wildlife/wildlife_hornbill.jpg', folder: 'Wildlife' },
  { id: 'w07', name: 'Wildlife Butterfly', url: '/images/wildlife/wildlife_butterfly.jpg', folder: 'Wildlife' },
  { id: 'w08', name: 'Wildlife Insects', url: '/images/wildlife/wildlife_insects.jpg', folder: 'Wildlife' },

  // Destinations
  { id: 'd01', name: 'Dest Jaldapara', url: '/images/dest_jaldapara.jpg', folder: 'Destinations' },
  { id: 'd02', name: 'Dest Buxa', url: '/images/dest_buxa.jpg', folder: 'Destinations' },
  { id: 'd03', name: 'Dest Cooch Behar', url: '/images/dest_coochbehar.jpg', folder: 'Destinations' },
  { id: 'd04', name: 'Dest Gorumara', url: '/images/dest_gorumara.jpg', folder: 'Destinations' },
  { id: 'd05', name: 'Dest Phuentsholing', url: '/images/dest_phuentsholing.jpg', folder: 'Destinations' },
  { id: 'd06', name: 'Jaldapara Gate', url: '/images/jaldapara_gate.jpg', folder: 'Destinations' },

  // Misc
  { id: 'misc01', name: 'Wild Dooars Logo', url: '/images/logo.png', folder: 'Brand' },
];

import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, Image as ImageIcon, UploadCloud, Trash2, Loader2 } from 'lucide-react';
import { processMultipleImageFiles } from '../../utils/imageUpload';

const UPLOADED_MEDIA_KEY = 'wd_uploaded_media';

export const AdminMedia: React.FC = () => {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [activeFolder, setActiveFolder] = useState('All');
  const [uploadedMedia, setUploadedMedia] = useState<MediaEntry[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(UPLOADED_MEDIA_KEY);
      if (stored) {
        setUploadedMedia(JSON.parse(stored));
      }
    } catch {
      // Ignore
    }
  }, []);

  const allMedia = [...uploadedMedia, ...projectMedia];

  const folderTabs = ['All', 'Uploaded', 'Gallery', 'Hotels', 'Vehicles', 'Packages', 'Jhalong', 'Wildlife', 'Destinations', 'Brand'];

  const filteredMedia = activeFolder === 'All'
    ? allMedia
    : allMedia.filter(m => m.folder === activeFolder);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleUploadFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setIsProcessing(true);
      const dataUrls = await processMultipleImageFiles(files);
      const newEntries: MediaEntry[] = dataUrls.map((url, i) => ({
        id: 'up-' + Date.now() + '-' + i,
        name: files[i]?.name?.replace(/\.[^/.]+$/, '') || 'Uploaded Photo',
        url,
        folder: 'Uploaded'
      }));

      const updated = [...newEntries, ...uploadedMedia];
      setUploadedMedia(updated);
      localStorage.setItem(UPLOADED_MEDIA_KEY, JSON.stringify(updated));
      setActiveFolder('Uploaded');
    } catch (err) {
      alert('Failed to process image files.');
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDeleteUploaded = (id: string) => {
    if (window.confirm('Delete this uploaded photo from media library?')) {
      const updated = uploadedMedia.filter(m => m.id !== id);
      setUploadedMedia(updated);
      localStorage.setItem(UPLOADED_MEDIA_KEY, JSON.stringify(updated));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase text-slate-900 tracking-tight">Media Library</h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Browse all {allMedia.length} project images or upload new ones from your device gallery.
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleUploadFiles}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isProcessing}
          className="px-4 py-2.5 bg-[#15803d] hover:bg-[#166534] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
          <span>Upload from Device Gallery</span>
        </button>
      </div>

      {/* Folder Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {folderTabs.map((folder) => {
          const count = folder === 'All'
            ? projectMedia.length
            : projectMedia.filter(m => m.folder === folder).length;
          const isActive = activeFolder === folder;

          return (
            <button
              key={folder}
              onClick={() => setActiveFolder(folder)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                isActive
                  ? 'bg-[#15803d] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {folder} <span className="opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredMedia.map((m) => (
          <div key={m.id} className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden group">
            <div className="h-36 overflow-hidden relative bg-stone-100">
              <img
                src={m.url}
                alt={m.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute top-2 left-2">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-black/60 text-white backdrop-blur-sm">
                  {m.folder}
                </span>
              </div>
            </div>
            <div className="p-2.5 flex items-center justify-between">
              <div className="min-w-0 flex-1 mr-2">
                <span className="font-bold text-stone-900 block truncate text-xs">{m.name}</span>
                <span className="text-[10px] text-stone-400 font-mono truncate block">{m.url}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleCopy(m.url)}
                  className="p-1.5 bg-stone-100 hover:bg-emerald-100 text-stone-700 hover:text-emerald-900 rounded-lg flex items-center gap-1 flex-shrink-0 transition-colors cursor-pointer"
                  title="Copy image path"
                >
                  {copiedUrl === m.url ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                {m.folder === 'Uploaded' && (
                  <button
                    onClick={() => handleDeleteUploaded(m.id)}
                    className="p-1.5 bg-stone-100 hover:bg-red-100 text-stone-500 hover:text-red-700 rounded-lg transition-colors cursor-pointer"
                    title="Delete uploaded photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMedia.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200">
          <ImageIcon className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <p className="text-sm text-stone-500">No images in this folder.</p>
        </div>
      )}
    </div>
  );
};
