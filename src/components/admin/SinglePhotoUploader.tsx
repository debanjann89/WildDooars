import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, Trash2, RefreshCw, FolderOpen, Loader2 } from 'lucide-react';
import { processImageFile } from '../../utils/imageUpload';
import { MediaLibraryModal } from './MediaLibraryModal';

interface SinglePhotoUploaderProps {
  label?: string;
  currentImage?: string;
  onImageSelected: (imageDataOrUrl: string) => void;
  onRemove?: () => void;
  required?: boolean;
  aspectHint?: string; // e.g. "Landscape (16:9 recommended)"
  className?: string;
}

export const SinglePhotoUploader: React.FC<SinglePhotoUploaderProps> = ({
  label = 'Select Photo',
  currentImage,
  onImageSelected,
  onRemove,
  required = false,
  aspectHint,
  className = ''
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setIsProcessing(true);
      const dataUrl = await processImageFile(files[0]);
      onImageSelected(dataUrl);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to process selected image.');
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
      const dataUrl = await processImageFile(e.dataTransfer.files[0]);
      onImageSelected(dataUrl);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to process dropped image.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label and optional aspect ratio hint */}
      <div className="flex items-center justify-between">
        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {aspectHint && (
          <span className="text-[10px] text-stone-400 font-medium">{aspectHint}</span>
        )}
      </div>

      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Current Image Preview & Action Controls */}
      {currentImage ? (
        <div className="relative rounded-2xl overflow-hidden border border-emerald-200 bg-emerald-50/30 p-2 shadow-xs group">
          <div className="h-48 sm:h-56 w-full rounded-xl overflow-hidden bg-stone-100 relative">
            <img
              src={currentImage}
              alt="Selected Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/package_rhino_main.jpg';
              }}
            />

            {/* Hover overlay with action buttons */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing}
                className="px-3.5 py-2 bg-white text-slate-900 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg hover:bg-emerald-50 transition-colors"
              >
                {isProcessing ? <Loader2 className="w-4 h-4 animate-spin text-[#15803d]" /> : <RefreshCw className="w-3.5 h-3.5 text-[#15803d]" />}
                <span>Change from Device</span>
              </button>

              <button
                type="button"
                onClick={() => setIsLibraryOpen(true)}
                className="px-3.5 py-2 bg-white text-slate-900 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg hover:bg-emerald-50 transition-colors"
              >
                <FolderOpen className="w-3.5 h-3.5 text-[#15803d]" />
                <span>Media Library</span>
              </button>

              {onRemove && (
                <button
                  type="button"
                  onClick={onRemove}
                  className="p-2 bg-red-600 text-white rounded-xl shadow-lg hover:bg-red-700 transition-colors"
                  title="Remove image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Quick bar below preview */}
          <div className="mt-2 flex items-center justify-between px-1 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
              <ImageIcon className="w-3.5 h-3.5 text-[#15803d]" />
              <span className="text-[11px] truncate max-w-[200px]">Photo selected</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-bold text-[#15803d] hover:underline px-2 py-1"
              >
                Replace
              </button>
              {onRemove && (
                <button
                  type="button"
                  onClick={onRemove}
                  className="text-xs font-bold text-red-500 hover:underline px-2 py-1"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Empty State: Select from Device or Library */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`rounded-2xl border-2 border-dashed p-6 transition-all text-center ${
            dragOver
              ? 'border-[#15803d] bg-emerald-50/60'
              : 'border-stone-300 hover:border-emerald-400 bg-stone-50/50 hover:bg-emerald-50/20'
          }`}
        >
          {isProcessing ? (
            <div className="py-6 flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-[#15803d] animate-spin mb-2" />
              <p className="text-xs font-bold text-slate-700">Optimizing & uploading photo...</p>
            </div>
          ) : (
            <div className="py-2 flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#15803d] flex items-center justify-center mb-3 shadow-xs">
                <UploadCloud className="w-6 h-6" />
              </div>

              <p className="text-xs font-bold text-slate-800 mb-1">
                Upload Photo from Device Gallery
              </p>
              <p className="text-[11px] text-stone-500 mb-4 max-w-xs">
                Tap the button below to pick an image from your computer or phone gallery.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2.5 bg-[#15803d] hover:bg-[#166534] text-white rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
                >
                  <FolderOpen className="w-4 h-4" />
                  <span>Select from Gallery</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsLibraryOpen(true)}
                  className="px-3.5 py-2.5 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ImageIcon className="w-4 h-4 text-[#15803d]" />
                  <span>Choose from Library</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Media Library Picker Modal */}
      <MediaLibraryModal
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        onSelectPhoto={(url) => onImageSelected(url)}
        title="Select from Website Images"
      />
    </div>
  );
};
