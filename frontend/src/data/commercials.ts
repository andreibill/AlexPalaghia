export interface Commercial {
  id: string;
  title: string;
  client: string;
  year: number;
  youtubeUrl: string;
  description?: string;
}

/** Extract video ID from any common YouTube URL format. */
export function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?.*v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export const commercials: Commercial[] = [
  // {
  //   id: 'example',
  //   title: 'Example Commercial',
  //   client: 'Brand Name',
  //   year: 2024,
  //   youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  //   description: 'A short description of the project.',
  // },
];
