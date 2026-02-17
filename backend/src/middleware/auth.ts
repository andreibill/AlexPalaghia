import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const token = req.cookies?.admin_token;
  if (!token) {
    res.redirect('/admin/login');
    return;
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET not set');
    jwt.verify(token, secret);
    next();
  } catch {
    res.clearCookie('admin_token');
    res.redirect('/admin/login');
  }
}
