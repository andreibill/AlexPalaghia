import { useQuery } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function fetchApi<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// ── Types ──

export interface Film {
  _id: string;
  slug: string;
  title: string;
  year: number;
  genre: string;
  type: string;
  duration: string;
  synopsis: string;
  awards?: string[];
  premiereStatus?: string;
  dop?: string;
  screenwriter?: string;
  editing?: string;
  sound?: string;
  cast?: string[];
  thumbnail: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Commercial {
  _id: string;
  title: string;
  client: string;
  year: number;
  youtubeUrl: string;
  description?: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryPhoto {
  _id: string;
  src: string;
  alt: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  _id: string;
  aboutBio: string[];
  aboutImageUrl: string;
  email: string;
  location: string;
  contactTitle: string;
  contactTagline: string;
  instagramUrl: string;
  youtubeUrl: string;
  heroTagline: string;
  aboutSectionHeading: string;
  aboutSectionText: string;
  ctaHeading: string;
  ctaText: string;
  createdAt: string;
  updatedAt: string;
}

// ── Query hooks ──

const STALE_TIME = 5 * 60 * 1000; // 5 minutes

export function useFilms() {
  return useQuery<Film[]>({
    queryKey: ['films'],
    queryFn: () => fetchApi<Film[]>('/api/films'),
    staleTime: STALE_TIME,
  });
}

export function useFilm(slug: string | undefined) {
  return useQuery<Film>({
    queryKey: ['films', slug],
    queryFn: () => fetchApi<Film>(`/api/films/${slug}`),
    staleTime: STALE_TIME,
    enabled: !!slug,
  });
}

export function useCommercials() {
  return useQuery<Commercial[]>({
    queryKey: ['commercials'],
    queryFn: () => fetchApi<Commercial[]>('/api/commercials'),
    staleTime: STALE_TIME,
  });
}

export function useGallery() {
  return useQuery<GalleryPhoto[]>({
    queryKey: ['gallery'],
    queryFn: () => fetchApi<GalleryPhoto[]>('/api/gallery'),
    staleTime: STALE_TIME,
  });
}

export function useSettings() {
  return useQuery<SiteSettings>({
    queryKey: ['settings'],
    queryFn: () => fetchApi<SiteSettings>('/api/settings'),
    staleTime: STALE_TIME,
  });
}

// ── Utilities ──

/** Extract video ID from any common YouTube URL format. */
export function getYouTubeId(url: string): string | null {
  const pattern =
    /(?:youtube\.com\/watch\?.*v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(pattern);
  return match ? match[1] : null;
}
