import { Router, Request, Response } from 'express';
import { Commercial } from '../../models/Commercial';
import { renderView } from './helpers';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const commercials = await Commercial.find().sort({ sortOrder: 1, year: -1 });
  res.render('admin/layout', {
    body: await renderView(res, 'admin/commercials/index', { commercials }),
    pageTitle: 'Commercials',
    activePage: 'commercials',
    flash: null,
  });
});

router.get('/new', async (_req: Request, res: Response) => {
  res.render('admin/layout', {
    body: await renderView(res, 'admin/commercials/form', {
      commercial: null,
      errors: null,
      isEdit: false,
    }),
    pageTitle: 'Add Commercial',
    activePage: 'commercials',
    flash: null,
  });
});

router.post('/', async (req: Request, res: Response) => {
  const { title, client, year, youtubeUrl, description, sortOrder } = req.body;
  try {
    await Commercial.create({
      title,
      client,
      year: Number(year),
      youtubeUrl,
      description: description || '',
      sortOrder: Number(sortOrder) || 0,
    });
    res.redirect('/commercials');
  } catch (err: any) {
    res.render('admin/layout', {
      body: await renderView(res, 'admin/commercials/form', {
        commercial: req.body,
        errors: err.message,
        isEdit: false,
      }),
      pageTitle: 'Add Commercial',
      activePage: 'commercials',
      flash: null,
    });
  }
});

router.get('/:id/edit', async (req: Request, res: Response) => {
  const commercial = await Commercial.findById(req.params.id);
  if (!commercial) { res.redirect('/commercials'); return; }

  res.render('admin/layout', {
    body: await renderView(res, 'admin/commercials/form', {
      commercial,
      errors: null,
      isEdit: true,
    }),
    pageTitle: 'Edit Commercial',
    activePage: 'commercials',
    flash: null,
  });
});

router.post('/:id', async (req: Request, res: Response) => {
  const { title, client, year, youtubeUrl, description, sortOrder } = req.body;
  try {
    await Commercial.findByIdAndUpdate(req.params.id, {
      title,
      client,
      year: Number(year),
      youtubeUrl,
      description: description || '',
      sortOrder: Number(sortOrder) || 0,
    });
    res.redirect('/commercials');
  } catch (err: any) {
    res.render('admin/layout', {
      body: await renderView(res, 'admin/commercials/form', {
        commercial: { ...req.body, _id: req.params.id },
        errors: err.message,
        isEdit: true,
      }),
      pageTitle: 'Edit Commercial',
      activePage: 'commercials',
      flash: null,
    });
  }
});

router.post('/:id/delete', async (req: Request, res: Response) => {
  await Commercial.findByIdAndDelete(req.params.id);
  res.redirect('/commercials');
});

export default router;
