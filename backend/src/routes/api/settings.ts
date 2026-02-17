import { Router, Request, Response } from 'express';
import { getSettings } from '../../models/SiteSettings';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const settings = await getSettings();
  res.json(settings);
});

export default router;
