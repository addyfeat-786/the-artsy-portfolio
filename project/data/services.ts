export interface Service {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

export const services: Service[] = [
  {
    number: '01',
    title: 'Motion Design',
    description:
      'Brand films, title sequences, and animated identity systems. Motion that carries meaning, not just movement.',
    deliverables: ['Brand films', 'Title sequences', 'Logo animation', 'Social motion packs'],
  },
  {
    number: '02',
    title: 'Video Editing',
    description:
      'Documentary, commercial, and music-video editing. Cuts built on rhythm, restraint, and story.',
    deliverables: ['Documentary edits', 'Commercial edits', 'Music videos', 'Colour grading'],
  },
  {
    number: '03',
    title: 'Graphic Design',
    description:
      'Identity systems, type, and print. Design that reads as considered from ten paces and ten inches.',
    deliverables: ['Brand identity', 'Type systems', 'Editorial layout', 'Print collateral'],
  },
  {
    number: '04',
    title: 'Photography',
    description:
      'Still-life, portrait, and travel photography. Light studied like a language.',
    deliverables: ['Still life', 'Portraiture', 'Travel', 'Art direction'],
  },
  {
    number: '05',
    title: 'Brand Identity',
    description:
      'End-to-end identity work — from the wordmark to the way the brand moves and sounds.',
    deliverables: ['Naming', 'Visual identity', 'Motion identity', 'Guidelines'],
  },
  {
    number: '06',
    title: 'Creative Direction',
    description:
      'Holding the through-line across film, design, and photography for a single, coherent campaign.',
    deliverables: ['Campaign concept', 'Art direction', 'Production oversight'],
  },
];
