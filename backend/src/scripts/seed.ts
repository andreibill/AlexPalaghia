import 'dotenv/config';
import mongoose from 'mongoose';
import { Film } from '../models/Film';
import { GalleryPhoto } from '../models/GalleryPhoto';
import { SiteSettings } from '../models/SiteSettings';

// ── Seed data (mirrors frontend/src/data/*) ──

const filmsData = [
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
    sortOrder: 0,
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
    sortOrder: 1,
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
    sortOrder: 2,
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
    sortOrder: 3,
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
    sortOrder: 4,
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
    sortOrder: 5,
  },
];

const galleryData = [
  { src: 'https://placehold.co/1080x1350/121212/a0a0a0?text=Photo+1', alt: 'Behind the scenes on set', sortOrder: 0 },
  { src: 'https://placehold.co/1080x1350/121212/a0a0a0?text=Photo+2', alt: 'Location scouting in the mountains', sortOrder: 1 },
  { src: 'https://placehold.co/1080x1350/121212/a0a0a0?text=Photo+3', alt: 'Director on set', sortOrder: 2 },
  { src: 'https://placehold.co/1080x1350/121212/a0a0a0?text=Photo+4', alt: 'Cinematic landscape shot', sortOrder: 3 },
  { src: 'https://placehold.co/1080x1350/121212/a0a0a0?text=Photo+5', alt: 'Film crew at golden hour', sortOrder: 4 },
  { src: 'https://placehold.co/1080x1350/121212/a0a0a0?text=Photo+6', alt: 'Behind the camera', sortOrder: 5 },
  { src: 'https://placehold.co/1080x1350/121212/a0a0a0?text=Photo+7', alt: 'On-location portrait', sortOrder: 6 },
  { src: 'https://placehold.co/1080x1350/121212/a0a0a0?text=Photo+8', alt: 'Night shoot atmosphere', sortOrder: 7 },
];

const settingsData = {
  // About page
  aboutBio: [
    'Alex Palaghia is a Romanian film director whose work spans narrative cinema, documentary, and commercial projects. With a sharp eye for composition and a deep commitment to authentic storytelling, he crafts visuals that linger long after the credits roll.',
    "His career began in Bucharest's independent film scene, where he quickly earned recognition for bold directorial choices and a cinematic language that blends raw emotion with polished aesthetics. Over the years, he has collaborated with talented crews across Europe on projects ranging from short films to full-length features.",
    "When he's not behind the camera, Alex is exploring new stories, scouting locations, or mentoring the next generation of filmmakers.",
  ],
  aboutImageUrl: 'https://placehold.co/400x500/121212/a0a0a0?text=Alex+Palaghia',

  // Contact
  email: 'contact@alexpalaghia.com',
  location: 'Bucharest, Romania',
  contactTitle: 'Film / Commercial Director',
  contactTagline: "Let's create something unforgettable together.",

  // Social links
  instagramUrl: 'https://www.instagram.com/alex.palaghia/',
  youtubeUrl: 'https://www.youtube.com/channel/UCe5bSAC-3G1XBfTHSwubh4w',

  // Home page copy
  heroTagline: 'Film Director',
  aboutSectionHeading: 'A story told through the lens',
  aboutSectionText:
    'Alex Palaghia is a Romanian film director whose work spans narrative cinema, documentary, and commercial projects. With a sharp eye for composition and a deep commitment to authentic storytelling, he crafts visuals that linger long after the credits roll.',
  ctaHeading: "Let's work together",
  ctaText: "Have a project in mind? Get in touch and let's create something unforgettable.",
};

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI not set. Create a .env file (see .env.example).');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  // Clear existing data
  await Promise.all([
    Film.deleteMany({}),
    GalleryPhoto.deleteMany({}),
    SiteSettings.deleteMany({}),
  ]);
  console.log('Cleared existing data');

  // Seed films
  await Film.insertMany(filmsData);
  console.log(`Seeded ${filmsData.length} films`);

  // Seed gallery photos
  await GalleryPhoto.insertMany(galleryData);
  console.log(`Seeded ${galleryData.length} gallery photos`);

  // Seed site settings
  await SiteSettings.create(settingsData);
  console.log('Seeded site settings');

  await mongoose.disconnect();
  console.log('\nSeed complete!');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
