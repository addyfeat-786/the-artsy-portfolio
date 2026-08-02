export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  cover: string;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    title: 'On Patience: Editing a Year Into Twenty-Two Minutes',
    slug: 'on-patience-editing-a-year-into-twenty-two-minutes',
    excerpt:
      'How a documentary about a botanical garden taught me that the cut is a form of listening.',
    date: '2024-05-12',
    readTime: '6 min',
    category: 'Editing',
    cover: '/images/project-03.jpg',
    content: [
      'The first assembly of Field Notes was four hours long. It was honest, and it was unwatchable. The temptation in the edit suite is always to protect the footage — to keep a shot because it was hard to get, or because the light happened to fall a certain way at 6:47 on a Tuesday.',
      'But the audience never sees the effort. They only feel the rhythm. So the work of the editor, eventually, is to become deaf to the production story and listen only to the film that wants to exist.',
      'I cut Field Notes to the seasons, not to a script. Winter is the first act, where nothing moves and the garden seems dead. Spring is the turn. Summer is the long middle where the eye can rest. Autumn is the quiet exit. Twenty-two minutes is short enough to hold, long enough to feel a year pass.',
      'The lesson, if there is one: the cut is a form of listening. You listen for the film that is already in the footage, and you remove everything that is not that film. What remains is not less. It is the thing itself.',
    ],
  },
  {
    title: 'The Wordmark Is a Gesture',
    slug: 'the-wordmark-is-a-gesture',
    excerpt:
      'Designing the Atelier Vingt identity, and why a logo should feel like it was drawn in one breath.',
    date: '2024-03-04',
    readTime: '5 min',
    category: 'Identity',
    cover: '/images/project-04.jpg',
    content: [
      'A wordmark is not a logo. A logo is a mark; a wordmark is a piece of handwriting made public. When I drew the first sketch for Atelier Vingt, I was not thinking about kerning or x-height. I was thinking about the way the founder signed her letters.',
      'The whole identity grew from a single calligraphic gesture — the curl of the “g” that lifts off the baseline like a breath out. Everything else, the type system, the signage, the motion, was a consequence of that one movement.',
      'This is the test I use for identity work: could a person reproduce the wordmark by hand, roughly, and still recognise it? If yes, the gesture is strong enough to carry a brand. If no, you have a graphic, not a wordmark.',
    ],
  },
  {
    title: 'Lighting a Still Life Like an Old Master',
    slug: 'lighting-a-still-life-like-an-old-master',
    excerpt:
      'A single source, a long exposure, and a painted backdrop. The studio notes behind the Still Life series.',
    date: '2023-11-20',
    readTime: '4 min',
    category: 'Photography',
    cover: '/images/project-05.jpg',
    content: [
      'The Still Life series was lit with one light. Not because I am a purist, but because a single source is the only way to get the falloff that makes an object feel monumental. Two lights flatten. One light sculpts.',
      'I used a painted grey backdrop — never white, never black. Grey gives you somewhere for the shadow to go. The exposure was long, sometimes thirty seconds, which meant the objects had to be perfectly still, which meant the room had to be still, which meant I had to be still. Photography, at that point, becomes a kind of meditation.',
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
