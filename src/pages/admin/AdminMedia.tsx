import React, { useState } from 'react';
import { Image as ImageIcon, Upload, Trash2, Copy, Check } from 'lucide-react';

export const AdminMedia: React.FC = () => {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const sampleMedia = [
    {
      id: 'm-1',
      name: 'Jaldapara Rhino Safari',
      url: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1000&q=80',
      size: '1.2 MB'
    },
    {
      id: 'm-2',
      name: 'Asian Elephant Herd',
      url: 'https://images.unsplash.com/photo-1547970810-dc0eac25ee85?auto=format&fit=crop&w=1000&q=80',
      size: '1.8 MB'
    },
    {
      id: 'm-3',
      name: 'Buxa Tiger Reserve Riverbed',
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
      size: '1.5 MB'
    },
    {
      id: 'm-4',
      name: 'Cooch Behar Royal Palace',
      url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80',
      size: '2.1 MB'
    },
    {
      id: 'm-5',
      name: 'Gorumara Tea Estate Valley',
      url: 'https://images.unsplash.com/photo-1511497584788-8767611136f6?auto=format&fit=crop&w=1000&q=80',
      size: '1.4 MB'
    }
  ];

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif text-emerald-950">Media Library</h1>
          <p className="text-xs text-stone-600">Upload and manage image assets for packages, destinations, vehicles & hotels.</p>
        </div>
        <button className="btn btn-primary text-xs py-2 px-4">
          <Upload className="w-4 h-4" />
          Upload Image
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sampleMedia.map((m) => (
          <div key={m.id} className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden group">
            <div className="h-44 overflow-hidden relative">
              <img src={m.url} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="p-3 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-stone-900 block truncate max-w-[140px]">{m.name}</span>
                <span className="text-[10px] text-stone-400">{m.size}</span>
              </div>
              <button
                onClick={() => handleCopy(m.url)}
                className="p-1.5 bg-stone-100 hover:bg-emerald-100 text-stone-700 hover:text-emerald-900 rounded-lg flex items-center gap-1"
                title="Copy Image URL"
              >
                {copiedUrl === m.url ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
