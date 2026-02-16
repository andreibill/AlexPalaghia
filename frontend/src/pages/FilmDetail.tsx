import { useParams } from 'react-router';
import TransitionLink from '../components/TransitionLink';
import { films } from '../data/films';

export default function FilmDetail() {
  const { slug } = useParams<{ slug: string }>();
  const film = films.find((f) => f.slug === slug);

  if (!film) {
    return (
      <div className="page">
        <h1>Film not found</h1>
        <TransitionLink to="/films" className="film-detail__back">
          &larr; Back to Films
        </TransitionLink>
      </div>
    );
  }

  return (
    <div className="page">
      <TransitionLink to="/films" className="film-detail__back">
        &larr; Back to Films
      </TransitionLink>

      <div className="film-detail">
        <img
          className="film-detail__poster"
          src={`https://placehold.co/480x720/1a1a1a/555555?text=${encodeURIComponent(film.title)}`}
          alt={film.title}
          loading="lazy"
        />
        <div className="film-detail__info">
          <h1>{film.title}</h1>

          <dl className="film-detail__fields">
            <div className="film-detail__field">
              <dt>Genre</dt>
              <dd>{film.genre}</dd>
            </div>
            <div className="film-detail__field">
              <dt>Type</dt>
              <dd>{film.type}</dd>
            </div>
            <div className="film-detail__field">
              <dt>Duration</dt>
              <dd>{film.duration}</dd>
            </div>
          </dl>

          <div className="film-detail__synopsis">
            <h3>Synopsis</h3>
            <p>{film.synopsis}</p>
          </div>

          {film.awards && film.awards.length > 0 && (
            <div className="film-detail__awards">
              <h3>Official Selections / Awards</h3>
              <ul>
                {film.awards.map((award) => (
                  <li key={award}>{award}</li>
                ))}
              </ul>
            </div>
          )}

          {film.premiereStatus && (
            <p className="film-detail__premiere">{film.premiereStatus}</p>
          )}
        </div>
      </div>
    </div>
  );
}
