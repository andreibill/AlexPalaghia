import { Router, Request, Response } from 'express';
import { Commercial } from '../../models/Commercial';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const commercials = await Commercial.find().sort({ sortOrder: 1, year: -1 });
  res.json(commercials);
});

export default router;
