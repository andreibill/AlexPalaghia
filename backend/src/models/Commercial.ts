import { Schema, model, Document } from 'mongoose';

export interface ICommercial extends Document {
  title: string;
  client: string;
  year: number;
  youtubeUrl: string;
  description: string;
  sortOrder: number;
}

const commercialSchema = new Schema<ICommercial>(
  {
    title: { type: String, required: true, trim: true },
    client: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
    youtubeUrl: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Commercial = model<ICommercial>('Commercial', commercialSchema);
