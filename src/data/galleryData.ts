export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  category: 'forest' | 'animals' | 'safaris';
}

export const galleryCategories = [
  { id: 'all', label: 'All Photos' },
  { id: 'forest', label: 'Forest & Landscapes' },
  { id: 'animals', label: 'Wild Animals' },
  { id: 'safaris', label: 'Jungle Safaris' },
] as const;

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: '1',
    src: '/images/gallery/gallery_01.jpg',
    alt: 'Jayanti Riverbed and Bhutan Hills',
    category: 'forest'
  },
  {
    id: '2',
    src: '/images/gallery/gallery_02.jpg',
    alt: 'Jayanti River Trail',
    category: 'forest'
  },
  {
    id: '3',
    src: '/images/gallery/gallery_03.jpg',
    alt: 'Mountain Riverbed Stones',
    category: 'forest'
  },
  {
    id: '4',
    src: '/images/gallery/gallery_04.jpg',
    alt: 'Indian Bison (Gaur)',
    category: 'animals'
  },
  {
    id: '5',
    src: '/images/gallery/gallery_05.jpg',
    alt: 'One-Horned Rhinoceros',
    category: 'animals'
  },
  {
    id: '6',
    src: '/images/gallery/gallery_06.jpg',
    alt: 'Asian Elephant Herd',
    category: 'animals'
  },
  {
    id: '7',
    src: '/images/gallery/gallery_07.jpg',
    alt: 'Elephant Safari in Dooars',
    category: 'safaris'
  },
  {
    id: '8',
    src: '/images/gallery/gallery_08.jpg',
    alt: 'Wild Tusker Elephant',
    category: 'animals'
  },
  {
    id: '9',
    src: '/images/gallery/gallery_09.jpg',
    alt: 'Indian Leopard',
    category: 'animals'
  },
  {
    id: '10',
    src: '/images/gallery/gallery_10.jpg',
    alt: 'Jungle Jeep Safari',
    category: 'safaris'
  },
  {
    id: '11',
    src: '/images/gallery/gallery_11.jpg',
    alt: 'Indian Gaur Bull',
    category: 'animals'
  },
  {
    id: '12',
    src: '/images/gallery/gallery_12.jpg',
    alt: 'Aerial Forest Canopy and River',
    category: 'forest'
  },
  {
    id: '13',
    src: '/images/gallery/gallery_13.jpg',
    alt: 'Morning Elephant Safari',
    category: 'safaris'
  },
  {
    id: '14',
    src: '/images/gallery/gallery_14.jpg',
    alt: 'Barking Deer',
    category: 'animals'
  },
  {
    id: '15',
    src: '/images/gallery/gallery_15.jpg',
    alt: 'Sambar Deer Stag',
    category: 'animals'
  },
  {
    id: '16',
    src: '/images/gallery/gallery_16.jpg',
    alt: 'Sambar Deer in Meadow',
    category: 'animals'
  },
  {
    id: '17',
    src: '/images/gallery/gallery_17.jpg',
    alt: 'Rhino Mother and Calf',
    category: 'animals'
  },
  {
    id: '18',
    src: '/images/gallery/gallery_18.jpg',
    alt: 'Indian Peacock',
    category: 'animals'
  }
];
