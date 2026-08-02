export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'They turned a quiet product into a film people actually stopped scrolling for. The craft is in a different league.',
    name: 'Elena Marchetti',
    role: 'Brand Director',
    company: 'Aurora',
  },
  {
    quote:
      'Every frame was considered. The edit gave our documentary a heartbeat we didn’t know it had.',
    name: 'Jonas Berg',
    role: 'Producer',
    company: 'Kew Studios',
  },
  {
    quote:
      'A rare studio that can hold a single idea across film, type, and photography without it ever feeling thin.',
    name: 'Amara Okafor',
    role: 'Founder',
    company: 'Atelier Vingt',
  },
  {
    quote:
      'The title sequence set the tone for the entire film. Audiences still talk about the opening before the story.',
    name: 'Mira Lindqvist',
    role: 'Director',
    company: 'Monolith Films',
  },
];

export const clients: string[] = [
  'AURORA',
  'MONOLITH',
  'KEW STUDIOS',
  'ATELIER VINGT',
  'PULSE RECORDS',
  'FORM FOUNDRY',
  'VISIT ATLANTIC',
  'NORD LIGHT',
];
