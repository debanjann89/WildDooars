import React, { useRef, useState } from 'react';
import { UploadCloud, FolderOpen, Image as ImageIcon, X, Loader2 } from 'lucide-react';
import { processMultipleImageFiles } from '../../utils/imageUpload';
import { MediaLibraryModal } from './MediaLibraryModal';

interface MultiPhotoUploaderProps {
  label?: string;
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
  description?: string;
}

export const MultiPhotoUploader: React.FC<MultiPhotoUploaderProps> = ({
  label = 'Photo Gallery',
  photos = [],
  onPhotosChange,
  description = 'Select one or more photos from your device gallery to add to this tour/stay gallery.'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setIsProcessing(true);
      const newPhotos = await processMultipleImageFiles(files);
      onPhotosChange([...photos, ...newPhotos]);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to process selected photos.');
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return;

    try {
      setIsProcessing(true);
      const newPhotos = await processMultipleImageFiles(e.dataTransfer.files);
      onPhotosChange([...photos, ...newPhotos]);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to process dropped photos.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemovePhoto = (index: number) => {
    const updated = [...photos];
    updated.splice(index, 1);
    onPhotosChange(updated);
  };

  return (
    <div className="space-y-3">
      {/* Label and Count */}
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
            {label}
          </label>
          {description && (
            <p className="text-[11px] text-stone-500 mt-0.5">{description}</p>
          )}
        </div>
        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
          {photos.length} {photos.length === 1 ? 'photo' : 'photos'}
        </span>
      </div>

      {/* Hidden multiple file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFilesChange}
        className="hidden"
      />

      {/* Upload action box */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`rounded-2xl border-2 border-dashed p-4 transition-all text-center ${
          dragOver
            ? 'border-[#15803d] bg-emerald-50/60'
            : 'border-stone-300 hover:border-emerald-400 bg-stone-50/50 hover:bg-emerald-50/20'
        }`}
      >
        {isProcessing ? (
          <div className="py-4 flex flex-col items-center justify-center">
            <Loader2 className="w-6 h-6 text-[#15803d] animate-spin mb-2" />
            <p className="text-xs font-bold text-slate-700">Processing & uploading photos...</p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#15803d] flex items-center justify-center flex-shrink-0">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Add Photos from Device</p>
                <p className="text-[10px] text-stone-500">Select one or multiple photos at once</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-2 bg-[#15803d] hover:bg-[#166534] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span>Select from Gallery</span>
              </button>

              <button
                type="button"
                onClick={() => setIsLibraryOpen(true)}
                className="px-3 py-2 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ImageIcon className="w-3.5 h-3.5 text-[#15803d]" />
                <span>Media Library</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Photo Grid of existing photos */}
      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pt-2">
          {photos.map((photo, idx) => (
            <div
              key={idx}
              className="relative group rounded-xl overflow-hidden border border-stone-200 bg-stone-100 aspect-4/3 shadow-2xs"
            >
              <img
                src={photo}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/package_rhino_main.jpg';
                }}
              />

              {/* Number Badge */}
              <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 bg-black/60 text-white rounded text-[9px] font-bold">
                #{idx + 1}
              </div>

              {/* Remove button */}
              <button
                type="button"
                onClick={() => handleRemovePhoto(idx)}
                className="absolute top-1.5 right-1.5 p-1 bg-red-600 hover:bg-red-700 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                title="Remove photo"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Media Library Picker Modal */}
      <MediaLibraryModal
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        onSelectPhoto={(url) => onPhotosChange([...photos, url])}
        title="Add from Website Images"
      />
    </div>
  );
};
