import React from 'react';
import { Camera, MapPin, Trees, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const WildlifeSection: React.FC = () => {
  const wildlifeList = [
    {
      name: 'One-Horned Rhinoceros',
      scientific: 'Rhinoceros unicornis',
      park: 'Jaldapara & Gorumara Core',
      image: '/images/wildlife/wildlife_rhino.jpg?v=species_v2',
      desc: 'The star attraction of Jaldapara grasslands. Best spotted during early morning jeep and elephant safaris.'
    },
    {
      name: 'Asian Elephant',
      scientific: 'Elephas maximus',
      park: 'Buxa Corridor & Jaldapara',
      image: '/images/wildlife/wildlife_elephant.jpg?v=species_v2',
      desc: 'Wild herds roam freely along forest corridors connecting North Bengal to Bhutan hills.'
    },
    {
      name: 'Indian Bison (Gaur)',
      scientific: 'Bos gaurus',
      park: 'Gorumara & Jaldapara',
      image: '/images/wildlife/wildlife_gaur.jpg?v=species_v2',
      desc: 'Massive herbivore with distinctive white stockinged legs often seen near riverbanks and salt licks.'
    },
    {
      name: 'Sambar Deer & Barking Deer',
      scientific: 'Rusa unicolor',
      park: 'Across All Dooars Forests',
      image: '/images/wildlife/wildlife_deer.jpg?v=species_v2',
      desc: 'Graceful forest deer that echo warning calls across the canopy when predators approach.'
    },
    {
      name: 'Peacock & Avian Life',
      scientific: 'Pavo cristatus',
      park: 'Jaldapara & Chapramari',
      image: '/images/wildlife/wildlife_peacock.jpg?v=species_v2',
      desc: 'Dooars hosts over 350 species of resident and migratory birds including vibrant peacocks and hornbills.'
    },
    {
      name: 'Great Indian Hornbill',
      scientific: 'Buceros bicornis',
      park: 'Buxa Tiger Reserve Canopy',
      image: '/images/wildlife/wildlife_hornbill.jpg?v=species_v2',
      desc: 'The king of canopy birds nesting in high ancient trees along the Bhutan border hills.'
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-emerald-100 font-sans">
      <div className="container">
        {/* Section Header */}
        <div className="sec-title centered">
          <span className="section-tag">
            Wild Dooars Fauna
          </span>
          <h2>
            Meet the Wild <span>Side of Dooars</span>
          </h2>
          <div className="desc-text">
            Dooars is home to India’s most magnificent mammals and birds. Experience these wildlife species in their natural protected habitats.
          </div>
        </div>

        {/* Clean 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wildlifeList.map((animal, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-2xl transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* High-definition Photo */}
                <div className="relative h-56 overflow-hidden bg-emerald-950">
                  <img
                    src={animal.image}
                    alt={animal.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                  />
                  <div className="absolute top-3 left-3 bg-[#15803d] text-white px-3 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                    {animal.park}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-extrabold text-slate-900 mb-1 group-hover:text-[#15803d] transition-colors">
                    {animal.name}
                  </h3>
                  <span className="block text-xs italic font-semibold text-[#15803d] mb-3">
                    {animal.scientific}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {animal.desc}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="flex items-center gap-1.5 text-xs text-[#15803d] font-bold bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span>Protected Species Habitat</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
