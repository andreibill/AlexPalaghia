import { Schema, model, Document } from 'mongoose';

export interface IGalleryPhoto extends Document {
  src: string;
  alt: string;
  sortOrder: number;
}

const galleryPhotoSchema = new Schema<IGalleryPhoto>(
  {
    src: { type: String, required: true, trim: true },
    alt: { type: String, required: true, trim: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const GalleryPhoto = model<IGalleryPhoto>('GalleryPhoto', galleryPhotoSchema);
