import { Router, Request, Response } from 'express';
import { GalleryPhoto } from '../../models/GalleryPhoto';
import { renderView } from './helpers';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const photos = await GalleryPhoto.find().sort({ sortOrder: 1 });
  res.render('admin/layout', {
    body: await renderView(res, 'admin/gallery/index', { photos }),
    pageTitle: 'Gallery',
    activePage: 'gallery',
    flash: null,
  });
});

router.get('/new', async (_req: Request, res: Response) => {
  res.render('admin/layout', {
    body: await renderView(res, 'admin/gallery/form', {
      photo: null,
      errors: null,
      isEdit: false,
    }),
    pageTitle: 'Add Photo',
    activePage: 'gallery',
    flash: null,
  });
});

router.post('/', async (req: Request, res: Response) => {
  const { src, alt, sortOrder } = req.body;
  try {
    await GalleryPhoto.create({
      src,
      alt,
      sortOrder: Number(sortOrder) || 0,
    });
    res.redirect('/admin/gallery');
  } catch (err: any) {
    res.render('admin/layout', {
      body: await renderView(res, 'admin/gallery/form', {
        photo: req.body,
        errors: err.message,
        isEdit: false,
      }),
      pageTitle: 'Add Photo',
      activePage: 'gallery',
      flash: null,
    });
  }
});

router.get('/:id/edit', async (req: Request, res: Response) => {
  const photo = await GalleryPhoto.findById(req.params.id);
  if (!photo) { res.redirect('/admin/gallery'); return; }

  res.render('admin/layout', {
    body: await renderView(res, 'admin/gallery/form', {
      photo,
      errors: null,
      isEdit: true,
    }),
    pageTitle: 'Edit Photo',
    activePage: 'gallery',
    flash: null,
  });
});

router.post('/:id', async (req: Request, res: Response) => {
  const { src, alt, sortOrder } = req.body;
  try {
    await GalleryPhoto.findByIdAndUpdate(req.params.id, {
      src,
      alt,
      sortOrder: Number(sortOrder) || 0,
    });
    res.redirect('/admin/gallery');
  } catch (err: any) {
    res.render('admin/layout', {
      body: await renderView(res, 'admin/gallery/form', {
        photo: { ...req.body, _id: req.params.id },
        errors: err.message,
        isEdit: true,
      }),
      pageTitle: 'Edit Photo',
      activePage: 'gallery',
      flash: null,
    });
  }
});

router.post('/:id/delete', async (req: Request, res: Response) => {
  await GalleryPhoto.findByIdAndDelete(req.params.id);
  res.redirect('/admin/gallery');
});

export default router;
