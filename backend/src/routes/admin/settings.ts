import { Router, Request, Response } from 'express';
import { getSettings } from '../../models/SiteSettings';
import { renderView } from './helpers';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const settings = await getSettings();
  res.render('admin/layout', {
    body: await renderView(res, 'admin/settings/edit', { settings }),
    pageTitle: 'Site Settings',
    activePage: 'settings',
    flash: null,
  });
});

router.post('/', async (req: Request, res: Response) => {
  const settings = await getSettings();
  const {
    aboutBio,
    aboutImageUrl,
    email,
    location,
    contactTitle,
    contactTagline,
    instagramUrl,
    youtubeUrl,
    heroTagline,
    aboutSectionHeading,
    aboutSectionText,
    ctaHeading,
    ctaText,
  } = req.body;

  settings.aboutBio = aboutBio
    ? aboutBio.split('\n---\n').map((p: string) => p.trim()).filter(Boolean)
    : [];
  settings.aboutImageUrl = aboutImageUrl || '';
  settings.email = email || '';
  settings.location = location || '';
  settings.contactTitle = contactTitle || '';
  settings.contactTagline = contactTagline || '';
  settings.instagramUrl = instagramUrl || '';
  settings.youtubeUrl = youtubeUrl || '';
  settings.heroTagline = heroTagline || '';
  settings.aboutSectionHeading = aboutSectionHeading || '';
  settings.aboutSectionText = aboutSectionText || '';
  settings.ctaHeading = ctaHeading || '';
  settings.ctaText = ctaText || '';

  await settings.save();

  res.render('admin/layout', {
    body: await renderView(res, 'admin/settings/edit', { settings }),
    pageTitle: 'Site Settings',
    activePage: 'settings',
    flash: 'Settings saved successfully.',
  });
});

export default router;
