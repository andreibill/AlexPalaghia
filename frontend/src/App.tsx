import { Routes, Route } from 'react-router';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import About from './pages/About';
import Films from './pages/Films';
import FilmDetail from './pages/FilmDetail';
import Commercial from './pages/Commercial';
import Contact from './pages/Contact';

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="films" element={<Films />} />
        <Route path="films/:slug" element={<FilmDetail />} />
        <Route path="commercial" element={<Commercial />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
