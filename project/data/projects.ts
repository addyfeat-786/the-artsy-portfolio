export type Category =
  | 'Motion Graphics'
  | 'Video Editing'
  | 'Graphic Design'
  | 'Photography';

export interface Project {
  title: string;
  slug: string;
  category: Category;
  thumbnail: string;
  previewVideo?: string;
  galleryImages: string[];
  description: string;
  software: string[];
  client: string;
  year: string;
  featured: boolean;
  story?: {
    challenge: string;
    process: string;
    output: string;
  };
  results?: string[];
}

export const projects: Project[] = [
  {
    title: 'Aurora — Brand Film',
    slug: 'aurora-brand-film',
    category: 'Motion Graphics',
    thumbnail: '/images/project-01.jpg',
    previewVideo: '/videos/project-preview.mp4',
    galleryImages: [
      '/images/project-01.jpg',
      '/images/project-02.jpg',
      '/images/project-03.jpg',
    ],
    description:
      'A cinematic brand film for Aurora, a Nordic skincare house. Light, glass, and motion dissolve into a single breathing frame.',
    software: ['After Effects', 'Cinema 4D', 'DaVinci Resolve'],
    client: 'Liquor By Door',
    year: '2024',
    featured: true,
    story: {
      challenge:
        'Translating a quiet, sensorial product story into motion without a single spoken word.',
      process:
        'Built a custom lighting rig in Cinema 4D, hand-tracked transitions in After Effects, and graded for a cold, luminous skin tone.',
      output:
        'A 90-second film that became the centerpiece of the brand relaunch across cinema and digital.',
    },
    results: ['+312% engagement lift', 'Featured on Awwwards', '2.4M views in 30 days'],
  },
  {
    title: 'Graphic Design',
    slug: 'Social media handeling',
    category: 'Motion Graphics',
    thumbnail: '/images/project-02.jpg',
    previewVideo: '/videos/project-preview.mp4',
    galleryImages: ['/images/project-02.jpg', '/images/project-03.jpg', '/images/project-04.jpg'],
    description:
      'A brutalist title sequence for an independent feature film. Type as architecture, silence as rhythm.',
    software: ['After Effects', 'Houdini', 'Premiere Pro'],
    client: 'Monolith Films',
    year: '2024',
    featured: true,
    story: {
      challenge: 'Setting the tone for a film about absence and monument.',
      process: 'Procedural type fracture in Houdini, composited with grain and lens distortion.',
      output: 'A 60-second opening that played at three international festivals.',
    },
    results: ['Festival selection — Locarno', 'Best Titles nomination'],
  },
  {
    title: 'Field Notes — Documentary Edit',
    slug: 'field-notes-documentary',
    category: 'Video Editing',
    thumbnail: '/images/project-03.jpg',
    previewVideo: '/videos/project-preview.mp4',
    galleryImages: ['/images/project-03.jpg', '/images/project-04.jpg', '/images/project-05.jpg'],
    description:
      'A 22-minute documentary edit following a year in the life of a botanical garden. Patience as a narrative device.',
    software: ['Premiere Pro', 'DaVinci Resolve', 'Pro Tools'],
    client: 'Kew Studios',
    year: '2023',
    featured: true,
    story: {
      challenge: 'Holding a viewer across a full season of slow change.',
      process: 'Cut to the rhythm of the seasons rather than a script; sound designed from field recordings.',
      output: 'A meditative edit acquired by a streaming documentary platform.',
    },
    results: ['Streaming acquisition', 'Vimeo Staff Pick'],
  },
  {
    title: 'Atelier — Identity System',
    slug: 'atelier-identity',
    category: 'Graphic Design',
    thumbnail: '/images/project-04.jpg',
    galleryImages: ['/images/project-04.jpg', '/images/project-05.jpg', '/images/project-06.jpg'],
    description:
      'A complete visual identity for a Parisian atelier — wordmark, type system, and print collateral.',
    software: ['Illustrator', 'InDesign', 'Glyphs'],
    client: 'Atelier Vingt',
    year: '2024',
    featured: true,
    story: {
      challenge: 'An identity that feels handmade but scales across signage and digital.',
      process: 'Drew the wordmark from a single calligraphic gesture, then digitised into a variable system.',
      output: 'A living identity now used across the atelier’s flagship store and online presence.',
    },
    results: ['Flagship rollout', 'Rebrand of the year — shortlist'],
  },
  {
    title: 'Still Life — Studio Series',
    slug: 'still-life-studio',
    category: 'Photography',
    thumbnail: '/images/project-05.jpg',
    galleryImages: ['/images/project-05.jpg', '/images/project-06.jpg', '/images/project-07.jpg'],
    description:
      'A still-life photography series on everyday objects, lit like old-master paintings.',
    software: ['Capture One', 'Photoshop'],
    client: 'Self-initiated',
    year: '2023',
    featured: false,
    story: {
      challenge: 'Finding monumentality in the ordinary.',
      process: 'Single-source lighting, long exposures, and a hand-painted backdrop.',
      output: 'A 12-piece series exhibited in a group show.',
    },
    results: ['Group exhibition — Berlin'],
  },
  {
    title: 'Pulse — Music Video',
    slug: 'pulse-music-video',
    category: 'Video Editing',
    thumbnail: '/images/project-06.jpg',
    previewVideo: '/videos/project-preview.mp4',
    galleryImages: ['/images/project-06.jpg', '/images/project-07.jpg', '/images/project-08.jpg'],
    description:
      'A fast-cut music video edit for an electronic act, built on a single continuous take.',
    software: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    client: 'Pulse Records',
    year: '2024',
    featured: true,
    story: {
      challenge: 'Creating motion from a single locked-off shot.',
      process: 'Time-remapped the master, layered masked passes, and graded for neon-on-black.',
      output: 'The artist’s most-streamed video to date.',
    },
    results: ['1.8M streams in first month'],
  },
  {
    title: 'Form — Type Specimen',
    slug: 'form-type-specimen',
    category: 'Graphic Design',
    thumbnail: '/images/project-07.jpg',
    galleryImages: ['/images/project-07.jpg', '/images/project-08.jpg', '/images/project-01.jpg'],
    description:
      'A digital type specimen and microsite for a new independent type foundry.',
    software: ['Illustrator', 'Figma', 'Webflow'],
    client: 'Form Foundry',
    year: '2023',
    featured: false,
    story: {
      challenge: 'Showing a typeface’s character without a single sentence of marketing copy.',
      process: 'Designed an interactive specimen where the type itself is the interface.',
      output: 'Specimen drove pre-orders for the full family within a week.',
    },
    results: ['Sold-out first release'],
  },
  {
    title: 'Coast — Travel Film',
    slug: 'coast-travel-film',
    category: 'Motion Graphics',
    thumbnail: '/images/project-08.jpg',
    previewVideo: '/videos/project-preview.mp4',
    galleryImages: ['/images/project-08.jpg', '/images/project-01.jpg', '/images/project-02.jpg'],
    description:
      'A travel film along the Atlantic coast, blending motion graphics with documentary footage.',
    software: ['After Effects', 'Premiere Pro', 'DaVinci Resolve'],
    client: 'Visit Atlantic',
    year: '2023',
    featured: false,
    story: {
      challenge: 'Making a tourism film that doesn’t feel like one.',
      process: 'Animated hand-drawn maps and route lines over footage; graded for a sun-bleached palette.',
      output: 'A 3-minute film used across the region’s campaign for two seasons.',
    },
    results: ['Regional campaign — 2 seasons'],
  },
];

export const categories: Category[] = [
  'Motion Graphics',
  'Video Editing',
  'Graphic Design',
  'Photography',
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getNextProject(slug: string): Project | undefined {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return undefined;
  return projects[(i + 1) % projects.length];
}
