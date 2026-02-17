import 'dotenv/config';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import { connectDB } from './config/db';
import { errorHandler } from './middleware/errorHandler';
import apiFilms from './routes/api/films';
import apiCommercials from './routes/api/commercials';
import apiGallery from './routes/api/gallery';
import apiSettings from './routes/api/settings';
import adminRouter from './routes/admin/index';

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Static files for admin dashboard
app.use('/admin/static', express.static(path.join(__dirname, 'public')));

// CORS for API routes only
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(
  '/api',
  cors({ origin: frontendUrl, credentials: true })
);

// API routes (public, read-only)
app.use('/api/films', apiFilms);
app.use('/api/commercials', apiCommercials);
app.use('/api/gallery', apiGallery);
app.use('/api/settings', apiSettings);

// Admin routes (cookie-auth protected)
app.use('/admin', adminRouter);

// Error handler
app.use(errorHandler);

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
