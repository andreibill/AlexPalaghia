import { useEffect, useRef } from 'react';
import TransitionLink from '../components/TransitionLink';
import { useFilms, useSettings } from '../api';
import './Home.css';

export default function Home() {
  const sectionsRef = useRef<HTMLDivElement>(null);
  const { data: films, isLoading: filmsLoading, error: filmsError } = useFilms();
  const { data: settings, isLoading: settingsLoading, error: settingsError } = useSettings();

  useEffect(() => {
    const root = sectionsRef.current;
    if (!root) return;

    const elements = root.querySelectorAll('.home-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('home-section--visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [films]);

  const isLoading = filmsLoading || settingsLoading;
  const error = filmsError || settingsError;

  if (isLoading) return <div className="page"><p className="loading">Loading...</p></div>;
  if (error) return <div className="page"><p className="error">Something went wrong.</p></div>;

  const featured = (films ?? []).slice(0, 4);

  return (
    <>
      {/* ── Hero ── */}
      <section className="home-hero">
        <div className="home-hero__content">
          <div className="home-hero__name-reveal">
            <h1 className="home-hero__name">Alex Palaghia</h1>
          </div>
          <div className="home-hero__accent" />
          <p className="home-hero__tagline">
            {settings?.heroTagline || 'Film Director'}
          </p>
        </div>

        <div className="home-hero__scroll">
          <span className="home-hero__scroll-label">Scroll</span>
          <div className="home-hero__scroll-line" />
        </div>
      </section>

      {/* ── Highlights ── */}
      <div ref={sectionsRef}>
        {/* About */}
        <section className="home-section home-about">
          <div className="home-section__inner">
            <span className="home-section__label">About</span>
            <h2>{settings?.aboutSectionHeading || 'A story told through the lens'}</h2>
            <p className="home-about__text">
              {settings?.aboutSectionText ||
                'Alex Palaghia is a Romanian film director whose work spans narrative cinema, documentary, and commercial projects. With a sharp eye for composition and a deep commitment to authentic storytelling, he crafts visuals that linger long after the credits roll.'}
            </p>
            <TransitionLink to="/about" className="home-section__link">
              More about Alex
            </TransitionLink>
          </div>
        </section>

        {/* Featured Films */}
        <section className="home-section home-films">
          <div className="home-section__inner">
            <span className="home-section__label">Selected Work</span>
            <h2>Featured Films</h2>
            <div className="home-films__grid">
              {featured.map((film) => (
                <TransitionLink
                  key={film.slug}
                  to={`/films/${film.slug}`}
                  className="film-card"
                >
                  <img
                    className="film-card__image"
                    src={film.thumbnail}
                    alt={film.title}
                    loading="lazy"
                  />
                  <div className="film-card__overlay">
                    <span className="film-card__more">More</span>
                  </div>
                </TransitionLink>
              ))}
            </div>
            <TransitionLink to="/films" className="home-section__link">
              View all films
            </TransitionLink>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="home-section home-cta">
          <div className="home-section__inner home-cta__inner">
            <span className="home-section__label">Contact</span>
            <h2>{settings?.ctaHeading || "Let's work together"}</h2>
            <TransitionLink to="/contact" className="home-cta__button">
              Get in touch
            </TransitionLink>
          </div>
        </section>
      </div>
    </>
  );
}
