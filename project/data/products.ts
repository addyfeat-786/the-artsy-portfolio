export interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  price: number;
  thumbnail: string;
  description: string;
  includes: string[];
  fileType: string;
  fileSize: string;
  software: string;
  rating: number;
  reviews: number;
  featured?: boolean;
}

export const productCategories: string[] = [
  'Motion Templates',
  'After Effects Projects',
  'Premiere Templates',
  'LUT Packs',
  'Lightroom Presets',
  'Fonts',
  'Mockups',
  'Stock Packs',
];

export const products: Product[] = [
  {
    id: 'p1',
    title: 'Cinematic Title Pack',
    slug: 'cinematic-title-pack',
    category: 'Motion Templates',
    price: 49,
    thumbnail: '/images/project-01.jpg',
    description:
      'Twelve animated title cards with brutalist type, grain, and lens distortion. Drag, drop, render.',
    includes: ['12 title compositions', 'Editable type', '4K & 1080p masters', 'Grain & halation overlays'],
    fileType: 'AEP + MP4',
    fileSize: '1.2 GB',
    software: 'After Effects 2023+',
    rating: 4.9,
    reviews: 128,
    featured: true,
  },
  {
    id: 'p2',
    title: 'Nordic LUT Collection',
    slug: 'nordic-lut-collection',
    category: 'LUT Packs',
    price: 29,
    thumbnail: '/images/project-02.jpg',
    description:
      'A 24-LUT pack graded for cold, luminous skin tones — the look behind the Aurora brand film.',
    includes: ['24 .cube LUTs', 'Rec.709 & Log versions', 'Installation guide'],
    fileType: '.CUBE',
    fileSize: '48 MB',
    software: 'Any NLE',
    rating: 4.8,
    reviews: 342,
    featured: true,
  },
  {
    id: 'p3',
    title: 'Editorial Type Specimen',
    slug: 'editorial-type-specimen',
    category: 'Fonts',
    price: 79,
    thumbnail: '/images/project-07.jpg',
    description:
      'A serif display family with italic, drawn from a single calligraphic gesture. 6 weights.',
    includes: ['6 weights + italics', 'Variable font', 'Web license', 'Specimen PDF'],
    fileType: 'OTF + WOFF2',
    fileSize: '2.4 MB',
    software: 'Any',
    rating: 5.0,
    reviews: 64,
    featured: true,
  },
  {
    id: 'p4',
    title: 'Still Life Mockup Kit',
    slug: 'still-life-mockup-kit',
    category: 'Mockups',
    price: 39,
    thumbnail: '/images/project-05.jpg',
    description:
      'Eight old-master-lit still-life scenes with smart objects. Drop your work into a painting.',
    includes: ['8 PSD scenes', 'Smart objects', 'Adjustable light', '4K resolution'],
    fileType: 'PSD',
    fileSize: '980 MB',
    software: 'Photoshop',
    rating: 4.7,
    reviews: 91,
  },
  {
    id: 'p5',
    title: 'Documentary Edit Presets',
    slug: 'documentary-edit-presets',
    category: 'Premiere Templates',
    price: 34,
    thumbnail: '/images/project-03.jpg',
    description:
      'A rhythm-first preset pack for documentary editing — the cuts behind Field Notes.',
    includes: ['18 edit presets', 'Audio ducking macros', 'Transition pack', 'Guide PDF'],
    fileType: '.PRFPSET',
    fileSize: '12 MB',
    software: 'Premiere Pro 2023+',
    rating: 4.6,
    reviews: 57,
  },
  {
    id: 'p6',
    title: 'Warm Lightroom Presets',
    slug: 'warm-lightroom-presets',
    category: 'Lightroom Presets',
    price: 24,
    thumbnail: '/images/project-08.jpg',
    description:
      'A 15-preset pack for sun-bleached travel photography. Warm, faded, and quiet.',
    includes: ['15 presets', 'Desktop + mobile', 'Install guide'],
    fileType: '.XMP + .DNG',
    fileSize: '8 MB',
    software: 'Lightroom',
    rating: 4.9,
    reviews: 210,
  },
  {
    id: 'p7',
    title: 'Brutalist Motion Toolkit',
    slug: 'brutalist-motion-toolkit',
    category: 'After Effects Projects',
    price: 59,
    thumbnail: '/images/project-06.jpg',
    description:
      'Procedural type fracture, grain systems, and lens distortion rigs. The Monolith toolkit.',
    includes: ['6 project files', 'Type fracture rig', 'Grain system', '4K masters'],
    fileType: 'AEP',
    fileSize: '2.1 GB',
    software: 'After Effects 2023+',
    rating: 4.8,
    reviews: 73,
    featured: true,
  },
  {
    id: 'p8',
    title: 'Coastal Stock Pack',
    slug: 'coastal-stock-pack',
    category: 'Stock Packs',
    price: 44,
    thumbnail: '/images/project-04.jpg',
    description:
      '40 hand-graded clips from the Atlantic coast. Sun-bleached, slow, and cinematic.',
    includes: ['40 4K clips', 'ProRes 422', 'Cleared for commercial use'],
    fileType: 'MOV',
    fileSize: '14 GB',
    software: 'Any NLE',
    rating: 4.7,
    reviews: 38,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
