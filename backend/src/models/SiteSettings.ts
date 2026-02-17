import { Schema, model, Document } from 'mongoose';

export interface ISiteSettings extends Document {
  // About page
  aboutBio: string[];
  aboutImageUrl: string;

  // Contact
  email: string;
  location: string;
  contactTitle: string;
  contactTagline: string;

  // Social links
  instagramUrl: string;
  youtubeUrl: string;

  // Home page copy
  heroTagline: string;
  aboutSectionHeading: string;
  aboutSectionText: string;
  ctaHeading: string;
  ctaText: string;
}

const siteSettingsSchema = new Schema<ISiteSettings>(
  {
    // About page
    aboutBio: { type: [String], default: [] },
    aboutImageUrl: { type: String, default: '' },

    // Contact
    email: { type: String, default: '' },
    location: { type: String, default: '' },
    contactTitle: { type: String, default: '' },
    contactTagline: { type: String, default: '' },

    // Social links
    instagramUrl: { type: String, default: '' },
    youtubeUrl: { type: String, default: '' },

    // Home page copy
    heroTagline: { type: String, default: '' },
    aboutSectionHeading: { type: String, default: '' },
    aboutSectionText: { type: String, default: '' },
    ctaHeading: { type: String, default: '' },
    ctaText: { type: String, default: '' },
  },
  { timestamps: true }
);

export const SiteSettings = model<ISiteSettings>('SiteSettings', siteSettingsSchema);

/** Get the singleton settings document, creating it if it doesn't exist. */
export async function getSettings(): Promise<ISiteSettings> {
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create({});
  }
  return settings;
}
