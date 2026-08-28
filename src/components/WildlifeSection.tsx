import React, { useState } from 'react';
import { ShieldCheck, Sparkles, Bug, Bird, Footprints, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const WildlifeSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Mammals' | 'Birds' | 'Insects'>('All');

  const wildlifeList = [
    {
      name: 'One-Horned Rhinoceros',
      scientific: 'Rhinoceros unicornis',
      park: 'Jaldapara & Gorumara Core',
      category: 'Mammals' as const,
      image: '/images/wildlife/wildlife_rhino.jpg?v=species_v3',
      desc: 'The star attraction of Jaldapara grasslands. Best spotted during early morning jeep and elephant safaris.'
    },
    {
      name: 'Asian Elephant',
      scientific: 'Elephas maximus',
      park: 'Buxa Corridor & Jaldapara',
      category: 'Mammals' as const,
      image: '/images/wildlife/wildlife_elephant.jpg?v=species_v3',
      desc: 'Wild herds roam freely along forest corridors connecting North Bengal to Bhutan hills.'
    },
    {
      name: 'Indian Bison (Gaur)',
      scientific: 'Bos gaurus',
      park: 'Gorumara & Jaldapara',
      category: 'Mammals' as const,
      image: '/images/wildlife/wildlife_gaur.jpg?v=species_v3',
      desc: 'Massive herbivore with distinctive white stockinged legs often seen near riverbanks and salt licks.'
    },
    {
      name: 'Sambar Deer & Barking Deer',
      scientific: 'Rusa unicolor',
      park: 'Across All Dooars Forests',
      category: 'Mammals' as const,
      image: '/images/wildlife/wildlife_deer.jpg?v=species_v3',
      desc: 'Graceful forest deer that echo warning calls across the canopy when predators approach.'
    },
    {
      name: 'Peacock & Avian Life',
      scientific: 'Pavo cristatus',
      park: 'Jaldapara & Chapramari',
      category: 'Birds' as const,
      image: '/images/wildlife/wildlife_peacock.jpg?v=species_v3',
      desc: 'Dooars hosts over 350 species of resident and migratory birds including vibrant peacocks and hornbills.'
    },
    {
      name: 'Great Indian Hornbill',
      scientific: 'Buceros bicornis',
      park: 'Buxa Tiger Reserve Canopy',
      category: 'Birds' as const,
      image: '/images/wildlife/wildlife_hornbill.jpg?v=species_v3',
      desc: 'The king of canopy birds nesting in high ancient trees along the Bhutan border hills.'
    },
    {
      name: 'Paris Peacock & Rare Butterflies',
      scientific: 'Papilio paris / Troides aeacus',
      park: 'Rajabhatkhawa & Buxa Park',
      category: 'Insects' as const,
      image: '/images/wildlife/wildlife_butterfly.jpg?v=species_v3',
      desc: 'Home to over 300 rare butterfly species in Buxa Tiger Reserve and Rajabhatkhawa Butterfly Park, fluttering near rainforest streams.'
    },
    {
      name: 'Giant Atlas Moth & Forest Insects',
      scientific: 'Attacus atlas / Odonata',
      park: 'Chilapata & Buxa Rainforests',
      category: 'Insects' as const,
      image: '/images/wildlife/wildlife_insects.jpg?v=species_v3',
      desc: 'One of the world’s largest moths with a 25cm wingspan and vibrant insect biodiversity inhabiting Dooars ancient sal canopies.'
    }
  ];

  const categories = [
    { id: 'All', label: 'All Wildlife', icon: Layers, count: wildlifeList.length },
    { id: 'Mammals', label: 'Mammals & Mega-Fauna', icon: Footprints, count: wildlifeList.filter(w => w.category === 'Mammals').length },
    { id: 'Birds', label: 'Avian Birds', icon: Bird, count: wildlifeList.filter(w => w.category === 'Birds').length },
    { id: 'Insects', label: 'Insects & Butterflies', icon: Bug, count: wildlifeList.filter(w => w.category === 'Insects').length }
  ] as const;

  const filteredList = activeCategory === 'All'
    ? wildlifeList
    : wildlifeList.filter(animal => animal.category === activeCategory);

  return (
    <section className="py-20 bg-white border-b border-emerald-100 font-sans">
      <div className="container">
        {/* Section Header */}
        <div className="sec-title centered">
          <span className="section-tag">
            Wild Dooars Fauna & Insects
          </span>
          <h2>
            Meet the Wild <span>Side of Dooars</span>
          </h2>
          <div className="desc-text">
            Dooars is home to India’s most magnificent mammals, rare bird species, and vibrant rainforest butterflies & insects. Experience them in their natural protected habitats.
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#15803d] text-white shadow-md scale-105'
                    : 'bg-emerald-50 text-slate-700 hover:bg-emerald-100 hover:text-[#15803d] border border-emerald-200/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-emerald-200/60 text-[#15803d]'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Species Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredList.map((animal) => (
              <motion.div
                key={animal.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-2xl transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* High-definition Photo */}
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-emerald-950">
                    <img
                      src={animal.image}
                      alt={animal.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                    />
                    <div className="absolute top-3 left-3 bg-[#15803d] text-white px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                      {animal.park}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-emerald-300 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>{animal.category}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-extrabold text-slate-900 mb-1 group-hover:text-[#15803d] transition-colors line-clamp-1">
                      {animal.name}
                    </h3>
                    <span className="block text-[11px] italic font-semibold text-[#15803d] mb-2.5">
                      {animal.scientific}
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {animal.desc}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#15803d] font-bold bg-emerald-50 p-2 rounded-xl border border-emerald-100">
                    <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Protected Species Habitat</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
