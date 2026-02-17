import TransitionLink from '../components/TransitionLink';
import { films } from '../data/films';

export default function Films() {
  return (
    <div className="page">
      <p className="page-description">
        A curated collection of narrative and documentary works.
      </p>
      <div className="films-grid">
        {films.map((film) => (
          <TransitionLink key={film.slug} to={`/films/${film.slug}`} className="film-card">
            <img
              className="film-card__image"
              src={film.thumbnail}
              alt={film.title}
              loading="lazy"
            />
            <div className="film-card__overlay">
              <h3 className="film-card__title">{film.title}</h3>
              <span className="film-card__year">{film.year}</span>
            </div>
          </TransitionLink>
        ))}
      </div>
    </div>
  );
}
