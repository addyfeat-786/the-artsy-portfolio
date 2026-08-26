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
    title: 'Liquor By Door',
    slug: 'liquor-by-door',
    category: 'Graphic Design',
    thumbnail: '/images/project-01.jpg',
    previewVideo: '/videos/project-preview.mp4',
    galleryImages: [
      '/images/project-01.jpg',
      '/images/project-02.jpg',
      '/images/project-03.jpg',
    ],
    description:
      'Creative design work developed for Liquor By Door, focused on building a strong and engaging visual presence.',
    software: ['Photoshop', 'Illustrator', 'After Effects'],
    client: 'Liquor By Door',
    year: '2024',
    featured: true,
    story: {
      challenge:
        'Creating visuals that stand out while maintaining a consistent and recognizable brand presence.',
      process:
        'Developed creative concepts, campaign visuals, social media creatives, and motion assets aligned with the brand.',
      output:
        'A cohesive visual identity and a collection of engaging creative assets for digital platforms.',
    },
    results: [
      'Brand-focused creative direction',
      'Social media creative assets',
      'Motion and graphic design',
    ],
  },

  {
    title: 'Social Media Handling',
    slug: 'social-media-handling',
    category: 'Graphic Design',
    thumbnail: '/images/project-02.jpg',
    previewVideo: '/videos/project-preview.mp4',
    galleryImages: [
      '/images/project-02.jpg',
      '/images/project-03.jpg',
      '/images/project-04.jpg',
    ],
    description:
      'A collection of social media creatives designed to create a consistent, engaging, and visually strong online presence.',
    software: ['Photoshop', 'Illustrator', 'After Effects'],
    client: 'Multiple Clients',
    year: '2024',
    featured: true,
    story: {
      challenge:
        'Creating fresh content consistently without losing the unique identity of each brand.',
      process:
        'Planned content directions and created static posts, campaign creatives, reels, and promotional assets.',
      output:
        'A consistent visual presence across multiple social media campaigns and platforms.',
    },
    results: [
      'Creative content strategy',
      'Campaign design',
      'Consistent brand presence',
    ],
  },

  {
    title: 'Video Editing Projects',
    slug: 'video-editing-projects',
    category: 'Video Editing',
    thumbnail: '/images/project-03.jpg',
    previewVideo: '/videos/project-preview.mp4',
    galleryImages: [
      '/images/project-03.jpg',
      '/images/project-04.jpg',
      '/images/project-05.jpg',
    ],
    description:
      'A selection of professionally edited videos including promotional content, social media reels, advertisements, and branded films.',
    software: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    client: 'Multiple Clients',
    year: '2024',
    featured: true,
    story: {
      challenge:
        'Turning raw footage into engaging stories that hold attention and communicate the message clearly.',
      process:
        'Edited footage, designed pacing, added sound design, color grading, transitions, motion graphics, and visual effects.',
      output:
        'High-quality video content optimized for digital platforms and audience engagement.',
    },
    results: [
      'Promotional videos',
      'Social media reels',
      'Brand films and advertisements',
    ],
  },

  {
    title: 'Brand Identity Design',
    slug: 'brand-identity-design',
    category: 'Graphic Design',
    thumbnail: '/images/project-04.jpg',
    galleryImages: [
      '/images/project-04.jpg',
      '/images/project-05.jpg',
      '/images/project-06.jpg',
    ],
    description:
      'Visual identity systems designed to help brands communicate clearly and create a memorable presence.',
    software: ['Illustrator', 'Photoshop', 'Figma'],
    client: 'Multiple Clients',
    year: '2024',
    featured: true,
    story: {
      challenge:
        'Building a visual identity that feels distinctive while remaining practical across multiple platforms.',
      process:
        'Developed logos, typography systems, color directions, brand assets, and supporting visual guidelines.',
      output:
        'Complete and scalable identity systems ready for digital, social, and marketing applications.',
    },
    results: [
      'Logo design',
      'Visual identity systems',
      'Brand guidelines',
    ],
  },

  {
    title: 'Photography Projects',
    slug: 'photography-projects',
    category: 'Photography',
    thumbnail: '/images/project-05.jpg',
    galleryImages: [
      '/images/project-05.jpg',
      '/images/project-06.jpg',
      '/images/project-07.jpg',
    ],
    description:
      'A collection of photography work covering products, events, brands, lifestyle, and creative visual storytelling.',
    software: ['Lightroom', 'Photoshop', 'Capture One'],
    client: 'Multiple Clients',
    year: '2024',
    featured: false,
    story: {
      challenge:
        'Capturing visuals that feel natural, professional, and aligned with the purpose of each project.',
      process:
        'Handled composition, lighting, camera work, image selection, and professional post-production.',
      output:
        'A versatile collection of polished photography assets for brands and campaigns.',
    },
    results: [
      'Product photography',
      'Event photography',
      'Lifestyle visuals',
    ],
  },

  {
    title: 'Motion Graphics',
    slug: 'motion-graphics',
    category: 'Motion Graphics',
    thumbnail: '/images/project-06.jpg',
    previewVideo: '/videos/project-preview.mp4',
    galleryImages: [
      '/images/project-06.jpg',
      '/images/project-07.jpg',
      '/images/project-08.jpg',
    ],
    description:
      'Motion graphics and animated visual content created for brands, advertisements, social media, and digital campaigns.',
    software: ['After Effects', 'Illustrator', 'Premiere Pro'],
    client: 'Multiple Clients',
    year: '2024',
    featured: true,
    story: {
      challenge:
        'Making static ideas feel dynamic while keeping the message clear and visually engaging.',
      process:
        'Created animation systems, typography motion, transitions, visual effects, and branded motion assets.',
      output:
        'Engaging motion content designed for advertisements, presentations, social media, and campaigns.',
    },
    results: [
      'Animated brand assets',
      'Typography animation',
      'Social media motion graphics',
    ],
  },

  {
    title: 'Creative Campaign Design',
    slug: 'creative-campaign-design',
    category: 'Graphic Design',
    thumbnail: '/images/project-07.jpg',
    galleryImages: [
      '/images/project-07.jpg',
      '/images/project-08.jpg',
      '/images/project-01.jpg',
    ],
    description:
      'Campaign-focused creative design developed for promotions, launches, advertisements, and marketing initiatives.',
    software: ['Photoshop', 'Illustrator', 'After Effects'],
    client: 'Multiple Clients',
    year: '2024',
    featured: false,
    story: {
      challenge:
        'Creating campaign visuals that communicate quickly and remain visually consistent across different formats.',
      process:
        'Developed campaign concepts and adapted them into social posts, advertisements, banners, videos, and promotional assets.',
      output:
        'A complete creative system that works across multiple marketing touchpoints.',
    },
    results: [
      'Campaign concepts',
      'Marketing creatives',
      'Multi-platform design systems',
    ],
  },

  {
    title: 'Commercial Video Projects',
    slug: 'commercial-video-projects',
    category: 'Video Editing',
    thumbnail: '/images/project-08.jpg',
    previewVideo: '/videos/project-preview.mp4',
    galleryImages: [
      '/images/project-08.jpg',
      '/images/project-01.jpg',
      '/images/project-02.jpg',
    ],
    description:
      'Commercial and promotional video projects combining editing, motion graphics, sound design, and visual storytelling.',
    software: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    client: 'Multiple Clients',
    year: '2024',
    featured: false,
    story: {
      challenge:
        'Creating commercial videos that capture attention quickly while delivering a clear message.',
      process:
        'Combined footage editing, pacing, motion graphics, color grading, sound design, and finishing.',
      output:
        'Professional commercial videos optimized for marketing and digital platforms.',
    },
    results: [
      'Commercial video editing',
      'Promotional content',
      'Digital campaign videos',
    ],
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
