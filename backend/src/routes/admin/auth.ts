import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

router.get('/login', (_req: Request, res: Response) => {
  res.render('admin/login', { error: null });
});

router.post('/login', async (req: Request, res: Response) => {
  const { password } = req.body;
  const hash = process.env.ADMIN_PASSWORD_HASH;
  const secret = process.env.JWT_SECRET;

  if (!hash || !secret) {
    res.render('admin/login', { error: 'Server misconfigured. Check environment variables.' });
    return;
  }

  const valid = await bcrypt.compare(password, hash);
  if (!valid) {
    res.render('admin/login', { error: 'Invalid password.' });
    return;
  }

  const token = jwt.sign({ admin: true }, secret, { expiresIn: '8h' });
  res.cookie('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 8 * 60 * 60 * 1000,
    sameSite: 'lax',
  });

  res.redirect('/admin');
});

router.post('/logout', (_req: Request, res: Response) => {
  res.clearCookie('admin_token');
  res.redirect('/admin/login');
});

export default router;
