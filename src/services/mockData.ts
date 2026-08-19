import type { Package, Destination, SafariInfo, Vehicle, Hotel, BusinessSettings, Enquiry } from '../types';

export const initialSettings: BusinessSettings = {
  businessName: 'Wild Dooars Tours & Travels',
  bengaliName: 'ওয়াইল্ড ডুয়ার্স ট্যুরস & ট্রাভেলস',
  phone: '081164 42729',
  alternatePhone: '062961 56601',
  whatsapp: '918116442729',
  email: 'info@wilddooarstours.com',
  address: 'Near Jaldapara National Park, Badaitari, Khauchandpara, West Bengal 735220',
  plusCode: 'J7F5+25 Badaitari, West Bengal',
  googleRating: '4.8 ★',
  reviewsCount: '97 reviews',
  googleMapsUrl: 'https://maps.google.com/?q=J7F5%2B25+Badaitari,+West+Bengal',
  facebookUrl: 'https://www.facebook.com/wilddooarstours',
  heroHeadline: 'Explore the Wild Heart of Dooars',
  heroSubheadline: 'Wildlife, forests, rivers and unforgettable journeys — planned around your travel experience.',
  heroImage: '/images/package_rhino_main.jpg',
  footerText: 'Wild Dooars Tours & Travels is your trusted local travel partner operating near Jaldapara National Park. We organize customized Dooars packages, car rentals, hotel bookings, and safari assistance.'
};

export const initialDestinations: Destination[] = [
  {
    id: 'dest-jaldapara',
    name: 'Jaldapara National Park',
    slug: 'jaldapara-national-park',
    intro: 'Home of the famous Indian One-Horned Rhinoceros and dense riverine evergreen forests.',
    description: 'Situated at the foothills of the Eastern Himalayas in Alipurduar district, Jaldapara National Park holds the largest population of the Indian one-horned rhinoceros in West Bengal after Kaziranga. River Torsa flows through the forest, creating breathtaking grasslands and riverine ecosystems.',
    mainImage: '/images/dest_jaldapara.jpg',
    gallery: [
      '/images/package_rhino_main.jpg',
      '/images/package_rhino_gallery1.jpg',
      '/images/package_rhino_gallery2.jpg'
    ],
    attractions: [
      'Jaldapara Core Jeep Safari',
      'Elephant Safari from Hollong Lodge',
      'Totopara Tribal Village Visit',
      'Lankapara View Point',
      'Chilapata Forest & Nalrajar Garh Ruins'
    ],
    activities: [
      'Wildlife Photography',
      'Jungle Jeep Rides',
      'Bird Watching',
      'Cultural Village Experience'
    ],
    isFeatured: true,
    isPublished: true
  },
  {
    id: 'dest-buxa',
    name: 'Buxa Tiger Reserve & Jayanti',
    slug: 'buxa-tiger-reserve',
    intro: 'Historical fort, misty hills, limestone riverbeds, and rich biodiversity.',
    description: 'Located in the eastern end of the Dooars along the border of Bhutan, Buxa Tiger Reserve is famous for its historic Buxa Fort, the majestic dry bed of the Jayanti River, Rajabhatkhawa Nature Interpretation Center & Museum, Butterfly Park, Sikiyajhora boat trail, and Raimatang offbeat village.',
    mainImage: '/images/dest_buxa.jpg',
    gallery: [
      '/images/package_buxa_main.jpg',
      '/images/package_buxa_gallery1.jpg',
      '/images/package_buxa_gallery2.jpg'
    ],
    attractions: [
      'Historic Buxa Fort Trek',
      'Jayanti River Bed & Bhutan Hills Backdrop',
      'Chota Mahakal Cave Temple',
      'Rajabhatkhawa Museum & Nature Interpretation Center',
      'Butterfly Park',
      'Sikiyajhora Jungle Boat Trail',
      'Raimatang Offbeat Village'
    ],
    activities: [
      'Riverbed Walking Trails',
      'Fort Trekking',
      'Forest Boat Safari at Sikiyajhora',
      'Butterflies & Avian Sightseeing'
    ],
    isFeatured: true,
    isPublished: true
  },
  {
    id: 'dest-coochbehar',
    name: 'Cooch Behar Heritage',
    slug: 'cooch-behar',
    intro: 'Royal palaces, heritage lakes, and grand Koch Dynasty architecture.',
    description: 'Cooch Behar is the only planned city in North Bengal with a rich royal heritage. The iconic Cooch Behar Rajbari (Victor Jubilee Palace), Madan Mohan Temple, and Baneswar Temple with its sacred tortoise pond stand as grand testaments to the Koch Dynasty.',
    mainImage: '/images/dest_coochbehar.jpg',
    gallery: [
      '/images/package_grand_main.jpg',
      '/images/package_family_gallery2.jpg'
    ],
    attractions: [
      'Cooch Behar Rajbari (Victor Jubilee Palace)',
      'Madan Mohan Temple',
      'Baneswar Temple & Tortoise Pond',
      'Sagardighi Lake'
    ],
    activities: [
      'Heritage Architecture Tour',
      'Museum Visit',
      'Lakeside Evening Walk'
    ],
    isFeatured: true,
    isPublished: true
  },
  {
    id: 'dest-phuentsholing',
    name: 'Phuentsholing, Bhutan Border',
    slug: 'phuentsholing-bhutan',
    intro: 'Cross-border cultural town blending Bhutanese traditions with Dooars warmth.',
    description: 'Phuentsholing is the gateway to Bhutan directly adjoining Jaigaon in West Bengal. Experience Phuentsholing town, Rinchending Monastery (Zangto Pelri), Torsha River Hanging Bridge & Cafe Viewpoint, and vibrant international marketplaces.',
    mainImage: '/images/dest_phuentsholing.jpg',
    gallery: [
      '/images/package_grand_gallery1.jpg'
    ],
    attractions: [
      'Phuentsholing Town & Bhutan Gate',
      'Rinchending Monastery (Zangto Pelri)',
      'Torsha River Bank, Hanging Bridge & Cafe View Point',
      'Cross-Border Bhutanese Cafes'
    ],
    activities: [
      'Cultural Exploration',
      'Monastery Peace Walk',
      'Local Shopping'
    ],
    isFeatured: true,
    isPublished: true
  },
  {
    id: 'dest-gorumara',
    name: 'Gorumara National Park',
    slug: 'gorumara-national-park',
    intro: 'Dense canopy forest, tea gardens, Murti river, and mountain streams.',
    description: 'Located in the Jalpaiguri district, Gorumara is famous for Lataguri Jeep Safari, Kalipur Eco Safari, Murti Riverfront, and scenic hill spots including Bindu (Indo-Bhutan dam), Jhalong, Samsing, Laliguras viewpoint, Rocky Island, Suntalekhola, and Gajoldoba Teesta Dam.',
    mainImage: '/images/dest_gorumara.jpg',
    gallery: [
      '/images/package_romantic_main.jpg',
      '/images/package_romantic_gallery1.jpg',
      '/images/package_romantic_gallery2.jpg'
    ],
    attractions: [
      'Gorumara Core & Lataguri Jeep Safari',
      'Kalipur Eco Safari & Watchtower',
      'Murti Riverfront Relaxation',
      'Jhalong, Bindu & Indo-Bhutan Dam',
      'Samsing, Suntalekhola & Rocky Island',
      'Gajoldoba Teesta Dam & Barrage',
      'Laliguras View Point'
    ],
    activities: [
      'Watchtower Wildlife Sightseeing',
      'Riverbed Relaxation',
      'Tea Garden Drives'
    ],
    isFeatured: true,
    isPublished: true
  }
];

export const initialPackages: Package[] = [
  {
    id: 'pkg-wild-dooars-explorer',
    name: 'Wild Dooars Rhino & Jungle Safari Special',
    slug: 'wild-dooars-rhino-jungle-safari',
    destination: 'Jaldapara National Park & Chilapata Forest',
    category: 'Wildlife',
    duration: '4 Days / 3 Nights',
    shortDescription: 'Immerse yourself in Jaldapara National Park with jeep safaris, elephant safari coordination, Lankapara viewpoint, and Chilapata jungle ruins.',
    fullDescription: 'This carefully curated wildlife package brings you to the prime habitat of the Indian One-Horned Rhinoceros. Stay near Jaldapara National Park, enjoy morning/afternoon jeep safaris, explore the ancient Nalrajar Garh inside Chilapata forest, visit Totopara tribal hamlet, and view Lankapara viewpoint.',
    mainImage: '/images/package_rhino_main.jpg',
    gallery: [
      '/images/package_rhino_main.jpg',
      '/images/package_rhino_gallery1.jpg',
      '/images/package_rhino_gallery2.jpg'
    ],
    highlights: [
      'Jaldapara National Park Jeep Safari & Elephant Safari assistance',
      'Lankapara View Point & Totopara Tribal Village Tour',
      'Chilapata Forest & Nalrajar Garh historical ruins',
      'Dedicated AC car rental for transfers & sightseeing'
    ],
    inclusions: [
      'Accommodation in comfortable resort/hotel',
      'All local transfers & sightseeing in dedicated vehicle',
      'Driver allowances, toll, fuel & parking fees',
      'Jungle safari guidance & permit assistance',
      'Breakfast at accommodation'
    ],
    exclusions: [
      'Forest entry fees & safari permit charges paid directly to Forest Department',
      'Personal expenses (laundry, beverages, extra meals)',
      'Any item not explicitly mentioned under inclusions'
    ],
    itinerary: [
      {
        dayNumber: 1,
        title: 'Arrival & Welcome to Jaldapara',
        description: 'Pick up from NJP / Bagdogra / Hasimara Railway Station and drive to Madarihat/Jaldapara. Check in to your resort near the forest border.',
        activities: ['Pickup', 'Resort Check-in', 'Evening Leisure']
      },
      {
        dayNumber: 2,
        title: 'Jaldapara Jeep Safari & Totopara Village Tour',
        description: 'Early morning Jaldapara Jeep Safari to spot rhinos, bison, and peacocks. After breakfast, proceed to Totopara and Lankapara View Point.',
        activities: ['Jeep Safari', 'Totopara Village Visit', 'Lankapara Viewpoint']
      },
      {
        dayNumber: 3,
        title: 'Chilapata Jungle Trail & Nalrajar Garh',
        description: 'Drive to Chilapata forest. Explore the fifth-century Nalrajar Garh fort ruins hidden in the jungle.',
        activities: ['Chilapata Forest Drive', 'Ruins Exploration', 'Nature Walk']
      },
      {
        dayNumber: 4,
        title: 'Souvenir Shopping & Departure',
        description: 'After breakfast, check out from the resort. Shopping for local tea before drop-off at Hasimara / NJP / Bagdogra.',
        activities: ['Check-out', 'Station Drop']
      }
    ],
    importantNotes: [
      'Safari bookings depend strictly on Forest Department guidelines and daily quota availability.',
      'Carry valid original Government photo ID for safari permits.'
    ],
    faqs: [
      {
        question: 'When is the best time for Jaldapara safaris?',
        answer: 'October to May is ideal. The park remains closed from 15th June to 16th September annually during monsoon.'
      }
    ],
    isFeatured: true,
    isPublished: true
  },
  {
    id: 'pkg-buxa-jayanti-offbeat',
    name: 'Buxa, Jayanti & Sikiyajhora Offbeat Expedition',
    slug: 'buxa-jayanti-sikiyajhora-expedition',
    destination: 'Buxa Tiger Reserve & Jayanti Riverbed',
    category: 'Adventure',
    duration: '3 Days / 2 Nights',
    shortDescription: 'Explore the rugged limestone hills of Jayanti, historic Buxa Fort, Rajabhatkhawa museum, Butterfly Park, and boat safaris at Sikiyajhora.',
    fullDescription: 'Designed for nature enthusiasts and adventure seekers, this trip showcases Buxa Fort, Jayanti Riverbed, Rajabhatkhawa Nature Interpretation Center & Museum, Butterfly Park, Sikiyajhora boat trail, and Raimatang offbeat village.',
    mainImage: '/images/package_buxa_main.jpg',
    gallery: [
      '/images/package_buxa_main.jpg',
      '/images/package_buxa_gallery1.jpg',
      '/images/package_buxa_gallery2.jpg'
    ],
    highlights: [
      'Trek to Historic Buxa Fort',
      'Jayanti River Bed & Chota Mahakal Cave Visit',
      'Rajabhatkhawa Museum & Butterfly Park Tour',
      'Boat safari at Sikiyajhora channel & Raimatang village drive'
    ],
    inclusions: [
      '2 Nights eco-resort / homestay stay in Jayanti/Rajabhatkhawa',
      'Dedicated vehicle for all days',
      'Driver charges, parking, toll & state tax',
      'Daily breakfast'
    ],
    exclusions: [
      'Forest entry fees & guide charges',
      'Trek guide charges at Buxa Fort'
    ],
    itinerary: [
      {
        dayNumber: 1,
        title: 'Arrival at Rajabhatkhawa / Jayanti',
        description: 'Pickup from New Alipurduar / Hasimara / NJP. Scenic drive into Buxa Tiger Reserve. Check in to homestay near Jayanti riverbed.',
        activities: ['Transfer', 'Riverbed Sunset Walk']
      },
      {
        dayNumber: 2,
        title: 'Buxa Fort Trek & Mahakal Cave',
        description: 'Morning trek to Buxa Fort. Post lunch, visit Chota Mahakal limestone caves, Rajabhatkhawa Museum & Butterfly Park.',
        activities: ['Buxa Fort Trek', 'Museum & Butterfly Park']
      },
      {
        dayNumber: 3,
        title: 'Sikiyajhora Boat Safari & Departure',
        description: 'Visit Sikiyajhora boat complex. Enjoy a quiet boat ride through the forest stream before drop-off at railway station.',
        activities: ['Forest Boat Safari', 'Station Drop']
      }
    ],
    isFeatured: true,
    isPublished: true
  },
  {
    id: 'pkg-grand-dooars-bhutan',
    name: 'Grand Dooars & Bhutan Border Cultural Circuit',
    slug: 'grand-dooars-bhutan-cultural-circuit',
    destination: 'Jaldapara, Gorumara, Cooch Behar & Phuentsholing',
    category: 'Package Tours',
    duration: '6 Days / 5 Nights',
    shortDescription: 'The complete Dooars experience: Jaldapara, Gorumara (Bindu, Jhalong, Samsing, Laliguras, Rocky Island, Suntalekhola, Murti, Gajoldoba), Cooch Behar Rajbari, and Phuentsholing Bhutan.',
    fullDescription: 'Our most popular comprehensive tour package covering Lataguri & Kalipur safaris, Bindu, Jhalong, Samsing, Laliguras, Rocky Island, Suntalekhola, Murti River, Gajoldoba Teesta Dam, Cooch Behar Rajbari & Madan Mohan temple, and Phuentsholing Bhutan (Rinchending Monastery, Torsha River Hanging Bridge & Cafe Viewpoint).',
    mainImage: '/images/package_grand_gallery1.jpg',
    gallery: [
      '/images/package_grand_gallery1.jpg',
      '/images/package_grand_main.jpg',
      '/images/package_grand_gallery2.jpg'
    ],
    highlights: [
      'Gorumara & Lataguri Jeep Safari / Kalipur Safari',
      'Samsing, Suntalekhola, Laliguras & Rocky Island streams',
      'Jaldapara Rhino Safari & Elephant Safari guidance',
      'Cooch Behar Royal Palace (Rajbari) & Madan Mohan Temple',
      'Phuentsholing town, Rinchending Monastery & Torsha River Hanging Bridge'
    ],
    inclusions: [
      '5 Nights hotel/resort accommodations (Lataguri 2N + Jaldapara 3N)',
      'Dedicated AC vehicle for 6 days',
      'Daily breakfast',
      'All driver allowances, parking, and toll fees'
    ],
    exclusions: [
      'Forest entry permits & safari tickets',
      'Bhutan entry permissions (if applicable for inner Bhutan travel)'
    ],
    itinerary: [
      {
        dayNumber: 1,
        title: 'NJP / Bagdogra to Lataguri (Gorumara)',
        description: 'Pickup from NJP / Bagdogra. Stop at Gajoldoba Teesta Barrage. Drive to Lataguri. Evening watchtower safari.',
        activities: ['Transfer', 'Gajoldoba Stop', 'Watchtower Safari']
      },
      {
        dayNumber: 2,
        title: 'Samsing, Suntalekhola, Jhalong & Bindu',
        description: 'Excursion to Samsing tea gardens, Rocky Island river spot, Laliguras viewpoint, Jhalong hydro-project, and Bindu dam.',
        activities: ['Hill Streams Excursion', 'Tea Estate Drive']
      },
      {
        dayNumber: 3,
        title: 'Lataguri to Jaldapara & Chilapata',
        description: 'Transfer to Jaldapara. En route visit Chilapata forest ruins. Evening jungle walk around resort.',
        activities: ['Inter-hotel Transfer', 'Chilapata Exploration']
      },
      {
        dayNumber: 4,
        title: 'Jaldapara Safari & Cooch Behar Royal Palace',
        description: 'Early morning Jaldapara jeep safari. After lunch, visit Cooch Behar Rajbari, Madan Mohan Temple, and Baneswar Temple.',
        activities: ['Morning Safari', 'Palace Excursion']
      },
      {
        dayNumber: 5,
        title: 'Phuentsholing (Bhutan) Border Day Trip',
        description: 'Drive to Phuentsholing in Bhutan. Visit Rinchending Monastery, Torsha River Hanging Bridge & Cafe View Point, and local markets.',
        activities: ['Bhutan Monastery Visit', 'Hanging Bridge & Cafe View']
      },
      {
        dayNumber: 6,
        title: 'Final Morning & Station Drop',
        description: 'Leisurely breakfast and drop-off at Hasimara / New Alipurduar / NJP / Bagdogra.',
        activities: ['Departure Transfer']
      }
    ],
    isFeatured: true,
    isPublished: true
  },
  {
    id: 'pkg-dooars-honeymoon-retreat',
    name: 'Romantic Dooars Forest & River Retreat',
    slug: 'romantic-dooars-forest-river-retreat',
    destination: 'Murti, Samsing & Jaldapara Nature Lodges',
    category: 'Honeymoon',
    duration: '5 Days / 4 Nights',
    shortDescription: 'Private getaway for couples with Murti riverfront stays, tea garden strolls, and private AC car transfers.',
    fullDescription: 'Tailored for couples seeking tranquility amidst nature. Enjoy stays beside the flowing Murti River, romantic tea garden walks in Samsing, and private drives.',
    mainImage: '/images/package_romantic_main.jpg',
    gallery: [
      '/images/package_romantic_main.jpg',
      '/images/package_romantic_gallery1.jpg',
      '/images/package_romantic_gallery2.jpg'
    ],
    highlights: [
      'Riverside Resort Stay along Murti River',
      'Private Couple Swift Dzire AC Car with courteous driver',
      'Sunset tea garden stroll in Samsing & Laliguras viewpoint',
      'Jaldapara forest drive & birdwatching'
    ],
    inclusions: [
      '4 Nights staying in luxury riverfront & jungle resorts',
      'Private Dzire/Ertiga AC car for all transfers & tours',
      'Daily breakfast & dinner'
    ],
    exclusions: [
      'Forest safaris and entry tickets'
    ],
    itinerary: [
      {
        dayNumber: 1,
        title: 'Arrival & Scenic Transfer to Murti Riverfront',
        description: 'Warm welcome at NJP/Bagdogra. Drive to Murti river resort.',
        activities: ['Private Transfer', 'Riverside Evening']
      },
      {
        dayNumber: 2,
        title: 'Samsing, Rocky Island & Suntalekhola Couple Excursion',
        description: 'Explore Samsing tea estates, suspension bridge at Suntalekhola, and Rocky Island.',
        activities: ['Tea Garden Walk', 'Suspension Bridge']
      },
      {
        dayNumber: 3,
        title: 'Transfer to Jaldapara Jungle Lodge',
        description: 'Drive to Jaldapara lodge surrounded by green forest canopies.',
        activities: ['Jungle Stay Transfer', 'Quiet Nature Walk']
      },
      {
        dayNumber: 4,
        title: 'Jaldapara Wildlife Drive',
        description: 'Morning forest drive and Torsa river bank visit.',
        activities: ['Nature Drive']
      },
      {
        dayNumber: 5,
        title: 'Farewell Dooars',
        description: 'Breakfast and drop-off at airport/railway station.',
        activities: ['Station Drop']
      }
    ],
    isFeatured: true,
    isPublished: true
  },
  {
    id: 'pkg-family-dooars-fun',
    name: 'Dooars Family Nature & Wildlife Vacation',
    slug: 'dooars-family-nature-vacation',
    destination: 'Gorumara, Jaldapara, Gajoldoba & Cooch Behar',
    category: 'Family',
    duration: '5 Days / 4 Nights',
    shortDescription: 'Relaxed family vacation covering safaris, Gajoldoba Teesta dam, tea gardens, and Cooch Behar Royal Palace.',
    fullDescription: 'Designed for families with elderly members or children. Includes spacious vehicles (Innova/Ertiga/Bolero), smooth itineraries, comfortable resort stays, and well-paced sightseeing.',
    mainImage: '/images/package_family_main.jpg',
    gallery: [
      '/images/package_family_main.jpg',
      '/images/package_family_gallery1.jpg',
      '/images/package_family_gallery2.jpg'
    ],
    highlights: [
      'Gajoldoba Teesta Barrage boat ride & bird watching',
      'Comfortable Innova / Ertiga / Bolero family car',
      'Gorumara & Jaldapara family safaris',
      'Cooch Behar Palace & Lake tour'
    ],
    inclusions: [
      '4 Nights in top family-rated resorts',
      'Private Innova / Ertiga / Bolero AC vehicle',
      'Daily breakfast'
    ],
    exclusions: [
      'Safari fees',
      'Boating charges'
    ],
    itinerary: [
      {
        dayNumber: 1,
        title: 'NJP to Gajoldoba & Lataguri',
        description: 'Pickup from NJP. Stop at Gajoldoba Teesta Dam. Proceed to Lataguri resort.',
        activities: ['Gajoldoba Stop', 'Resort Check-in']
      },
      {
        dayNumber: 2,
        title: 'Gorumara Watchtower & River Spots',
        description: 'Morning watchtower safari. Afternoon visit to Murti River, Jhalong, and Bindu dam.',
        activities: ['Safari', 'River Sightseeing']
      },
      {
        dayNumber: 3,
        title: 'Transfer to Jaldapara',
        description: 'Scenic drive to Jaldapara. Check in to resort.',
        activities: ['Resort Transfer']
      },
      {
        dayNumber: 4,
        title: 'Jaldapara Safari & Cooch Behar Royal Palace',
        description: 'Jeep safari inside Jaldapara forest. Excursion to Cooch Behar Royal Palace, Madan Mohan Temple, and Baneswar Temple.',
        activities: ['Safari', 'Royal Heritage Tour']
      },
      {
        dayNumber: 5,
        title: 'Check-out & Station Drop',
        description: 'Breakfast, tea shopping, and transfer to Hasimara / NJP station.',
        activities: ['Tea Shopping', 'Departure Transfer']
      }
    ],
    isFeatured: true,
    isPublished: true
  }
];

export const initialSafaris: SafariInfo[] = [
  {
    id: 'safari-jaldapara-jeep',
    name: 'Jaldapara Core Jeep Safari',
    safariType: 'Jeep Safari',
    location: 'Jaldapara National Park (Madarihat Gate)',
    description: '4x4 open gypsy safari through dense riverine grasslands. Excellent chance of sighting the Great Indian One-Horned Rhinoceros, Indian Bison (Gaur), Elephants, Hog Deer, Peacocks, and diverse avian species.',
    image: '/images/package_rhino_gallery1.jpg',
    availabilityNote: 'Operates in shifts (Morning 6:00 AM - 7:30 AM / Afternoon 3:00 PM - 4:30 PM). Permits are issued by the Forest Department counter on the spot or online.'
  },
  {
    id: 'safari-jaldapara-elephant',
    name: 'Jaldapara Elephant Safari',
    safariType: 'Elephant Safari',
    location: 'Hollong Lodge / Jaldapara National Park',
    description: 'An iconic Dooars experience riding atop trained elephants deep into tall elephant-grass terrain where vehicles cannot reach. Offers up-close rhino sightings.',
    image: '/images/package_rhino_main.jpg',
    availabilityNote: 'Extremely high demand and limited seats. Priority is determined by Forest Department rules and Hollong lodge bookings.'
  },
  {
    id: 'safari-gorumara-jeep',
    name: 'Gorumara & Lataguri / Kalipur Safari',
    safariType: 'Jeep Safari',
    location: 'Gorumara National Park (Lataguri / Kalipur / Ramsai Gate)',
    description: 'Gypsy safari connecting watchtowers such as Jatrapasad, Rhino Point, Medla, and Chandrachur overlooking salt-licks frequented by rhinos and wild elephant herds.',
    image: '/images/dest_gorumara.jpg',
    availabilityNote: '4 shifts daily. Forest Department counter at Lataguri issues permits.'
  },
  {
    id: 'safari-sikiyajhora-boat',
    name: 'Sikiyajhora Jungle Boat Trail',
    safariType: 'Wildlife Trail',
    location: 'Buxa Tiger Reserve (Sikiyajhora)',
    description: 'A unique water safari in a traditional country boat manually navigated through a winding forest river stream surrounded by rainforest canopy.',
    image: '/images/package_buxa_gallery2.jpg',
    availabilityNote: 'Subject to water level and weather conditions. Arranged directly at Sikiyajhora eco-tourism center.'
  }
];

export const initialVehicles: Vehicle[] = [
  {
    id: 'veh-innova',
    name: 'Toyota Innova / Innova Crysta',
    seatingCapacity: '7 - 8 Passengers',
    fuelType: 'Diesel',
    acType: 'AC',
    features: ['Pushback Seats', 'Dual AC', 'Spacious Boot Space', 'Smooth Mountain Suspension', 'Ideal for Long Tours'],
    image: '/images/car_innova.jpg',
    isPublished: true
  },
  {
    id: 'veh-bolero',
    name: 'Mahindra Bolero',
    seatingCapacity: '7 Passengers',
    fuelType: 'Diesel',
    acType: 'Both Available',
    features: ['High Ground Clearance', 'Rugged Terrain Capability', 'Best for Offbeat Villages', 'Strong Steel Chassis'],
    image: '/images/car_bolero.jpg',
    isPublished: true
  },
  {
    id: 'veh-sumo',
    name: 'Tata Sumo Gold',
    seatingCapacity: '8 - 10 Passengers',
    fuelType: 'Diesel',
    acType: 'Non-AC / AC',
    features: ['Maximum Seating Capacity', 'Economical Group Travel', 'Spacious Cabin', 'Reliable Hill Transport'],
    image: '/images/car_sumo.jpg',
    isPublished: true
  },
  {
    id: 'veh-ertiga',
    name: 'Maruti Suzuki Ertiga',
    seatingCapacity: '6 - 7 Passengers',
    fuelType: 'Petrol / CNG',
    acType: 'AC',
    features: ['Comfortable Seating', 'Rear AC Vents', 'Smooth Ride Quality', 'Great Fuel Efficiency', 'Family Choice'],
    image: '/images/car_ertiga.jpg',
    isPublished: true
  },
  {
    id: 'veh-dzire',
    name: 'Maruti Suzuki Swift Dzire',
    seatingCapacity: '4 Passengers',
    fuelType: 'Petrol',
    acType: 'AC',
    features: ['Compact Sedan', 'Climate Control AC', 'Plush Interior', 'Ideal for Couples & Small Families'],
    image: '/images/car_dzire.jpg',
    isPublished: true
  },
  {
    id: 'veh-wagonr',
    name: 'Maruti Suzuki WagonR',
    seatingCapacity: '4 Passengers',
    fuelType: 'Petrol',
    acType: 'AC',
    features: ['Budget Hatchback', 'Tall Boy Stance', 'Easy Airport Pickup', 'Economical Local Sightseeing'],
    image: '/images/car_wagonr.jpg',
    isPublished: true
  }
];

export const initialHotels: Hotel[] = [
  {
    id: 'hotel-jaldapara-forest-resort',
    name: 'Jaldapara Forest View Resort',
    propertyType: 'Resort',
    location: 'Madarihat, near Jaldapara Main Gate',
    description: 'Nestled on the edge of Jaldapara forest with lush green gardens, spacious cottages, in-house restaurant serving authentic Bengali cuisine, and evening bonfire facilities.',
    amenities: ['Free Wi-Fi', 'Swimming Pool', 'In-House Restaurant', '24/7 Power Backup', 'Room Service', 'Travel Desk', 'Garden Lawn'],
    image: '/images/package_romantic_gallery2.jpg',
    isPublished: true
  },
  {
    id: 'hotel-jayanti-eco-homestay',
    name: 'Jayanti Riverfront Eco Homestay',
    propertyType: 'Homestay',
    location: 'Jayanti Village, Buxa Tiger Reserve',
    description: 'Authentic local homestay right across the Jayanti river bed with mesmerizing views of Bhutan hills. Offers delicious home-cooked meals and local guiding assistance.',
    amenities: ['Home-Cooked Food', 'River View Rooms', 'Guide Assistance', 'Campfire Facility', 'Hot Water'],
    image: '/images/package_buxa_main.jpg',
    isPublished: true
  },
  {
    id: 'hotel-gorumara-jungle-retreat',
    name: 'Gorumara Jungle Retreat',
    propertyType: 'Resort',
    location: 'Lataguri, near Gorumara National Park',
    description: 'Luxury resort with wooden cottages surrounded by tea gardens. Features swimming pool, outdoor dining, and cultural folk dance evenings.',
    amenities: ['AC Cottages', 'Swimming Pool', 'Multi-Cuisine Dining', 'Children Play Area', 'Parking Space', 'Doctor on Call'],
    image: '/images/package_romantic_main.jpg',
    isPublished: true
  },
  {
    id: 'hotel-murti-riverside-hotel',
    name: 'Murti Riverside Haven',
    propertyType: 'Hotel',
    location: 'Murti, Jalpaiguri',
    description: 'Charming boutique hotel located right on the banks of Murti River. Enjoy peaceful mornings listening to river waters and forest birds.',
    amenities: ['Balcony River View', 'AC Deluxe Rooms', 'Resto Cafe', 'Driver Accommodation', 'Geyser'],
    image: '/images/package_romantic_gallery1.jpg',
    isPublished: true
  }
];

export const initialEnquiries: Enquiry[] = [
  {
    id: 'enq-101',
    name: 'Subhashish Roy',
    phone: '098312 45678',
    email: 'subhashish.roy@gmail.com',
    travelDate: '2026-10-15',
    travellersCount: '4 Adults, 1 Child',
    destination: 'Jaldapara & Buxa',
    tripType: 'Family Trip',
    vehiclePreference: 'Toyota Innova',
    hotelPreference: 'Resort',
    message: 'Looking for a 4N/5D family trip with Jaldapara safari permits assistance. Please send itinerary options.',
    status: 'New',
    createdAt: '2026-08-14 11:30',
    internalNotes: ['Called customer at 12:00 PM. Interested in October Durga Puja vacation slot. Shared sample quote via WhatsApp.']
  },
  {
    id: 'enq-102',
    name: 'Priya Banerjee',
    phone: '098741 23654',
    email: 'priya.b@outlook.com',
    travelDate: '2026-11-20',
    travellersCount: '2 Adults',
    destination: 'Gorumara & Murti',
    tripType: 'Honeymoon Trip',
    vehiclePreference: 'Swift Dzire',
    hotelPreference: 'Resort',
    message: 'Planning our honeymoon trip to Dooars. Require quiet riverfront resort and private car.',
    status: 'Contacted',
    createdAt: '2026-08-15 09:15',
    internalNotes: ['Suggested Murti Riverside Haven with romantic room setup.']
  }
];
