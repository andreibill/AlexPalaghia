import { Router, Request, Response } from 'express';
import { Film } from '../../models/Film';
import { renderView } from './helpers';

const router = Router();

// List all films
router.get('/', async (_req: Request, res: Response) => {
  const films = await Film.find().sort({ sortOrder: 1, year: -1 });
  res.render('admin/layout', {
    body: await renderView(res, 'admin/films/index', { films }),
    pageTitle: 'Films',
    activePage: 'films',
    flash: null,
  });
});

// New film form
router.get('/new', async (_req: Request, res: Response) => {
  res.render('admin/layout', {
    body: await renderView(res, 'admin/films/form', {
      film: null,
      errors: null,
      isEdit: false,
    }),
    pageTitle: 'Add Film',
    activePage: 'films',
    flash: null,
  });
});

// Create film
router.post('/', async (req: Request, res: Response) => {
  const { title, slug, year, genre, type, duration, synopsis, awards, premiereStatus, dop, screenwriter, editing, sound, cast, thumbnail, sortOrder } = req.body;
  try {
    await Film.create({
      title,
      slug,
      year: Number(year),
      genre,
      type,
      duration,
      synopsis,
      awards: awards ? awards.split('\n').map((a: string) => a.trim()).filter(Boolean) : [],
      premiereStatus: premiereStatus || '',
      dop: dop || '',
      screenwriter: screenwriter || '',
      editing: editing || '',
      sound: sound || '',
      cast: cast ? cast.split('\n').map((a: string) => a.trim()).filter(Boolean) : [],
      thumbnail,
      sortOrder: Number(sortOrder) || 0,
    });
    res.redirect('/films');
  } catch (err: any) {
    res.render('admin/layout', {
      body: await renderView(res, 'admin/films/form', {
        film: req.body,
        errors: err.message,
        isEdit: false,
      }),
      pageTitle: 'Add Film',
      activePage: 'films',
      flash: null,
    });
  }
});

// Edit film form
router.get('/:id/edit', async (req: Request, res: Response) => {
  const film = await Film.findById(req.params.id);
  if (!film) { res.redirect('/films'); return; }

  res.render('admin/layout', {
    body: await renderView(res, 'admin/films/form', {
      film,
      errors: null,
      isEdit: true,
    }),
    pageTitle: 'Edit Film',
    activePage: 'films',
    flash: null,
  });
});

// Update film
router.post('/:id', async (req: Request, res: Response) => {
  const { title, slug, year, genre, type, duration, synopsis, awards, premiereStatus, dop, screenwriter, editing, sound, cast, thumbnail, sortOrder } = req.body;
  try {
    await Film.findByIdAndUpdate(req.params.id, {
      title,
      slug,
      year: Number(year),
      genre,
      type,
      duration,
      synopsis,
      awards: awards ? awards.split('\n').map((a: string) => a.trim()).filter(Boolean) : [],
      premiereStatus: premiereStatus || '',
      dop: dop || '',
      screenwriter: screenwriter || '',
      editing: editing || '',
      sound: sound || '',
      cast: cast ? cast.split('\n').map((a: string) => a.trim()).filter(Boolean) : [],
      thumbnail,
      sortOrder: Number(sortOrder) || 0,
    });
    res.redirect('/films');
  } catch (err: any) {
    res.render('admin/layout', {
      body: await renderView(res, 'admin/films/form', {
        film: { ...req.body, _id: req.params.id },
        errors: err.message,
        isEdit: true,
      }),
      pageTitle: 'Edit Film',
      activePage: 'films',
      flash: null,
    });
  }
});

// Delete film
router.post('/:id/delete', async (req: Request, res: Response) => {
  await Film.findByIdAndDelete(req.params.id);
  res.redirect('/films');
});

export default router;
