import { Router, Request, Response } from 'express';
import { requireAuth } from '../../middleware/auth';
import { Film } from '../../models/Film';
import { Commercial } from '../../models/Commercial';
import { GalleryPhoto } from '../../models/GalleryPhoto';
import { renderView } from './helpers';
import authRouter from './auth';
import filmsRouter from './films';
import commercialsRouter from './commercials';
import galleryRouter from './gallery';
import settingsRouter from './settings';

const router = Router();

// Auth routes (login/logout) — no auth required
router.use('/', authRouter);

// All routes below require auth
router.use(requireAuth);

// Dashboard home
router.get('/', async (_req: Request, res: Response) => {
  const [filmCount, commercialCount, photoCount] = await Promise.all([
    Film.countDocuments(),
    Commercial.countDocuments(),
    GalleryPhoto.countDocuments(),
  ]);

  res.render('admin/layout', {
    body: await renderView(res, 'admin/dashboard', {
      filmCount,
      commercialCount,
      photoCount,
    }),
    pageTitle: 'Dashboard',
    activePage: 'dashboard',
    flash: null,
  });
});

// Mount CRUD routers
router.use('/films', filmsRouter);
router.use('/commercials', commercialsRouter);
router.use('/gallery', galleryRouter);
router.use('/settings', settingsRouter);

export default router;
