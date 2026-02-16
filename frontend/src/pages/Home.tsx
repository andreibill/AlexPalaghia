import { useEffect, useRef } from 'react';
import TransitionLink from '../components/TransitionLink';
import { films } from '../data/films';
import './Home.css';

export default function Home() {
  const sectionsRef = useRef<HTMLDivElement>(null);

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
  }, []);

  const featured = films.slice(0, 4);

  return (
    <>
      {/* ── Hero ── */}
      <section className="home-hero">
        <div className="home-hero__content">
          <div className="home-hero__name-reveal">
            <h1 className="home-hero__name">Alex Palaghia</h1>
          </div>
          <div className="home-hero__accent" />
          <p className="home-hero__tagline">Film Director</p>
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
            <h2>A story told through the lens</h2>
            <p className="home-about__text">
              Alex Palaghia is a Romanian film director whose work spans
              narrative cinema, documentary, and commercial projects. With a
              sharp eye for composition and a deep commitment to authentic
              storytelling, he crafts visuals that linger long after the credits
              roll.
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
                    <h3 className="film-card__title">{film.title}</h3>
                    <span className="film-card__year">{film.year}</span>
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
            <h2>Let's work together</h2>
            <p className="home-cta__text">
              Have a project in mind? Get in touch and let's create something
              unforgettable.
            </p>
            <TransitionLink to="/contact" className="home-cta__button">
              Get in touch
            </TransitionLink>
          </div>
        </section>
      </div>
    </>
  );
}
