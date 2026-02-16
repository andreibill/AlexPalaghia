export interface Film {
  slug: string;
  title: string;
  year: number;
  genre: string;
  type: string;
  duration: string;
  synopsis: string;
  awards?: string[];
  premiereStatus?: string;
  thumbnail: string;
}

export const films: Film[] = [
  {
    slug: 'the-last-frame',
    title: 'The Last Frame',
    year: 2024,
    genre: 'Drama',
    type: 'Fiction',
    duration: '22 minutes',
    synopsis:
      'A retired cinematographer revisits the locations of his greatest work, confronting memories he spent decades avoiding. Shot on 16mm across the Romanian countryside.',
    awards: ['Anonimul Film Festival — Official Selection', 'TIFF — Short Film Competition'],
    thumbnail: 'https://placehold.co/400x600/1a1a1a/555555?text=The+Last+Frame',
  },
  {
    slug: 'beneath-the-surface',
    title: 'Beneath the Surface',
    year: 2023,
    genre: 'Thriller',
    type: 'Fiction',
    duration: '18 minutes',
    synopsis:
      'When a journalist uncovers a decades-old secret in a small coastal town, she must decide how far she is willing to go for the truth. A tense, atmospheric thriller.',
    awards: ['NexT Film Festival — Best Short Film'],
    thumbnail: 'https://placehold.co/400x600/1a1a1a/555555?text=Beneath+the+Surface',
  },
  {
    slug: 'nocturne',
    title: 'Nocturne',
    year: 2022,
    genre: 'Drama',
    type: 'Fiction',
    duration: '14 minutes',
    synopsis:
      'Two strangers meet in a Bucharest jazz club and share one night of conversation that changes both their lives. An intimate exploration of connection and solitude.',
    awards: ['Sarajevo Film Festival — Official Selection', 'Cinefest Miskolc — Special Mention'],
    thumbnail: 'https://placehold.co/400x600/1a1a1a/555555?text=Nocturne',
  },
  {
    slug: 'winter-light',
    title: 'Winter Light',
    year: 2021,
    genre: 'Drama',
    type: 'Fiction',
    duration: '26 minutes',
    synopsis:
      'A family reunites in a remote mountain village during the harshest winter in decades. Old wounds resurface as the snow traps them together.',
    premiereStatus: 'Not premiered yet',
    thumbnail: 'https://placehold.co/400x600/1a1a1a/555555?text=Winter+Light',
  },
  {
    slug: 'parallel-lives',
    title: 'Parallel Lives',
    year: 2020,
    genre: 'Sci-Fi Drama',
    type: 'Fiction',
    duration: '30 minutes',
    synopsis:
      'A physicist becomes obsessed with the idea that every choice creates a branching reality. As her research consumes her, the line between theory and experience blurs.',
    awards: ['UNATC Film Festival — Best Director'],
    thumbnail: 'https://placehold.co/400x600/1a1a1a/555555?text=Parallel+Lives',
  },
  {
    slug: 'the-crossing',
    title: 'The Crossing',
    year: 2019,
    genre: 'Historical Drama',
    type: 'Documentary',
    duration: '45 minutes',
    synopsis:
      'Based on true events, this film follows a group of villagers attempting a dangerous border crossing in 1980s Romania. A story of courage, sacrifice, and hope.',
    awards: ['DokLeipzig — Official Selection', 'One World Romania — Audience Award'],
    thumbnail: 'https://placehold.co/400x600/1a1a1a/555555?text=The+Crossing',
  },
];
