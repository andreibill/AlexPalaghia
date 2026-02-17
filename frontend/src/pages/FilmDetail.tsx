import { useParams } from 'react-router';
import TransitionLink from '../components/TransitionLink';
import { useFilm } from '../api';

export default function FilmDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: film, isLoading, error } = useFilm(slug);

  if (isLoading) return <div className="page"><p className="loading">Loading...</p></div>;
  if (error) return <div className="page"><p className="error">Something went wrong.</p></div>;

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
          src={film.thumbnail}
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
