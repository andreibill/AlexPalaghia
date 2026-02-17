import { Router, Request, Response } from 'express';
import { Film } from '../../models/Film';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const films = await Film.find().sort({ sortOrder: 1, year: -1 });
  res.json(films);
});

router.get('/:slug', async (req: Request, res: Response) => {
  const film = await Film.findOne({ slug: req.params.slug });
  if (!film) {
    res.status(404).json({ error: 'Film not found' });
    return;
  }
  res.json(film);
});

export default router;
