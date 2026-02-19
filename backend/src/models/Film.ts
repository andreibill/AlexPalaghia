import { Schema, model, Document } from 'mongoose';

export interface IFilm extends Document {
  slug: string;
  title: string;
  year: number;
  genre: string;
  type: string;
  duration: string;
  synopsis: string;
  awards: string[];
  premiereStatus?: string;
  dop?: string;
  screenwriter?: string;
  editing?: string;
  sound?: string;
  cast?: string[];
  thumbnail: string;
  sortOrder: number;
}

const filmSchema = new Schema<IFilm>(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    synopsis: { type: String, required: true },
    awards: { type: [String], default: [] },
    premiereStatus: { type: String, default: '' },
    dop: { type: String, default: '' },
    screenwriter: { type: String, default: '' },
    editing: { type: String, default: '' },
    sound: { type: String, default: '' },
    cast: { type: [String], default: [] },
    thumbnail: { type: String, required: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Film = model<IFilm>('Film', filmSchema);
