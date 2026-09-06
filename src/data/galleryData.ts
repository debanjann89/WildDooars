export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  src: string;
  category: 'wildlife' | 'safaris' | 'landscapes';
  location: string;
  tag: string;
  aspect: 'landscape' | 'portrait' | 'square';
}

export const galleryCategories = [
  { id: 'all', label: 'All Photos' },
  { id: 'wildlife', label: 'Wildlife & Fauna' },
  { id: 'safaris', label: 'Jungle Safaris' },
  { id: 'landscapes', label: 'Rivers & Landscapes' },
] as const;

export const galleryItems: GalleryItem[] = [
  {
    id: 'gal-01',
    title: 'Jayanti Riverbed & Bhutan Foothills',
    description: 'Pristine white riverbed expanse against dramatic cloud-covered Himalayan peaks.',
    src: '/images/gallery/gallery_01.jpg',
    category: 'landscapes',
    location: 'Jayanti, Buxa Tiger Reserve',
    tag: 'Mountain Landscape',
    aspect: 'landscape'
  },
  {
    id: 'gal-02',
    title: 'Jayanti Riverbed Exploration',
    description: 'Hikers traversing the vast pebbled dry river valley under mountain shadows.',
    src: '/images/gallery/gallery_02.jpg',
    category: 'landscapes',
    location: 'Jayanti, Indo-Bhutan Border',
    tag: 'River Treks',
    aspect: 'landscape'
  },
  {
    id: 'gal-03',
    title: 'Jayanti River Pebbles & Horizons',
    description: 'Crystal-clear mountain stones and white river silt stretching across the border valley.',
    src: '/images/gallery/gallery_03.jpg',
    category: 'landscapes',
    location: 'Buxa Tiger Reserve',
    tag: 'Valley Panorama',
    aspect: 'landscape'
  },
  {
    id: 'gal-04',
    title: 'Indian Bison (Gaur) in Deep Forest',
    description: 'Enormous male Indian Bison foraging along the dense sal forest border.',
    src: '/images/gallery/gallery_04.jpg',
    category: 'wildlife',
    location: 'Jaldapara & Gorumara',
    tag: 'Protected Fauna',
    aspect: 'landscape'
  },
  {
    id: 'gal-05',
    title: 'One-Horned Rhinoceros in Lush Ferns',
    description: 'The iconic Indian One-Horned Rhino grazing amidst vibrant emerald fern grasslands.',
    src: '/images/gallery/gallery_05.jpg',
    category: 'wildlife',
    location: 'Jaldapara National Park',
    tag: 'Star Attraction',
    aspect: 'landscape'
  },
  {
    id: 'gal-06',
    title: 'Asian Elephant Herd Crossing Forest Path',
    description: 'Wild elephant family peacefully crossing a jungle safari trail during morning patrol.',
    src: '/images/gallery/gallery_06.jpg',
    category: 'wildlife',
    location: 'Jaldapara Forest Corridor',
    tag: 'Wild Herd',
    aspect: 'landscape'
  },
  {
    id: 'gal-07',
    title: 'Elephant Safari Forest Expedition',
    description: 'Tourists enjoying a guided elephant-back safari exploring deep into the Dooars woodland.',
    src: '/images/gallery/gallery_07.jpg',
    category: 'safaris',
    location: 'Hollong, Jaldapara',
    tag: 'Elephant Ride',
    aspect: 'portrait'
  },
  {
    id: 'gal-08',
    title: 'Wild Tusker Asian Elephant',
    description: 'A magnificent wild bull tusker emerging with quiet authority through dense vegetation.',
    src: '/images/gallery/gallery_08.jpg',
    category: 'wildlife',
    location: 'Buxa Forest Corridor',
    tag: 'Wild Bull Tusker',
    aspect: 'portrait'
  },
  {
    id: 'gal-09',
    title: 'Indian Leopard on Forest Canopy',
    description: 'Graceful Indian Leopard resting alertly along a mossy forest branch in the canopy.',
    src: '/images/gallery/gallery_09.jpg',
    category: 'wildlife',
    location: 'Dooars Forest Canopy',
    tag: 'Apex Predator',
    aspect: 'landscape'
  },
  {
    id: 'gal-10',
    title: 'Open 4x4 Jungle Jeep Safari',
    description: 'Excited travelers spotting wildlife from an open gypsy safari vehicle at golden hour.',
    src: '/images/gallery/gallery_10.jpg',
    category: 'safaris',
    location: 'Jaldapara Safari Zone',
    tag: 'Jeep Safari',
    aspect: 'portrait'
  },
  {
    id: 'gal-11',
    title: 'Indian Gaur Bull Pair',
    description: 'A pair of majestic gaurs with signature curved horns and distinctive white stockings.',
    src: '/images/gallery/gallery_11.jpg',
    category: 'wildlife',
    location: 'Gorumara National Park',
    tag: 'Indian Bison',
    aspect: 'landscape'
  },
  {
    id: 'gal-12',
    title: 'River Meanders Through Rainforest Canopy',
    description: 'Spectacular aerial view of emerald rivers cutting through pristine subtropical jungle.',
    src: '/images/gallery/gallery_12.jpg',
    category: 'landscapes',
    location: 'Dooars Riverine Ecosystem',
    tag: 'Aerial Panorama',
    aspect: 'landscape'
  },
  {
    id: 'gal-13',
    title: 'Morning Elephant Safari Sunbeams',
    description: 'Golden sun rays piercing through misty trees as an elephant safari glides across the grasslands.',
    src: '/images/gallery/gallery_13.jpg',
    category: 'safaris',
    location: 'Jaldapara Grasslands',
    tag: 'Misty Dawn Safari',
    aspect: 'landscape'
  },
  {
    id: 'gal-14',
    title: 'Barking Deer (Muntjac) in Meadow',
    description: 'Alert golden-coated Barking Deer standing poised in sunlit forest meadow.',
    src: '/images/gallery/gallery_14.jpg',
    category: 'wildlife',
    location: 'Chapramari Sanctuary',
    tag: 'Forest Herbivore',
    aspect: 'landscape'
  },
  {
    id: 'gal-15',
    title: 'Sambar Stag with Royal Antlers',
    description: 'Regal male Sambar deer sporting impressive branched antlers in a forest clearing.',
    src: '/images/gallery/gallery_15.jpg',
    category: 'wildlife',
    location: 'Buxa Tiger Reserve',
    tag: 'Sambar Deer',
    aspect: 'landscape'
  },
  {
    id: 'gal-16',
    title: 'Forest Sambar Deer Lookout',
    description: 'Poised sambar deer looking back across a lush green hill meadow in tranquil solitude.',
    src: '/images/gallery/gallery_16.jpg',
    category: 'wildlife',
    location: 'Jaldapara National Park',
    tag: 'Hill Meadow',
    aspect: 'landscape'
  },
  {
    id: 'gal-17',
    title: 'Rhino Mother & Baby Calf',
    description: 'Mother One-Horned Rhino guiding her young calf along the tranquil river grassland.',
    src: '/images/gallery/gallery_17.jpg',
    category: 'wildlife',
    location: 'Torsa Riverbanks, Jaldapara',
    tag: 'Mother & Calf',
    aspect: 'landscape'
  },
  {
    id: 'gal-18',
    title: 'Indian Peacock & Avian Life',
    description: 'Splendid Indian Peacock displaying vivid tail plumage and crown in forest garden.',
    src: '/images/gallery/gallery_18.jpg',
    category: 'wildlife',
    location: 'Jaldapara & Chapramari',
    tag: 'Avian Species',
    aspect: 'square'
  }
];
