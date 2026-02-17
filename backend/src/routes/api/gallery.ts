import { Router, Request, Response } from 'express';
import { GalleryPhoto } from '../../models/GalleryPhoto';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const photos = await GalleryPhoto.find().sort({ sortOrder: 1 });
  res.json(photos);
});

export default router;
