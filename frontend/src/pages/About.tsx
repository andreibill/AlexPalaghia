import { useSettings } from '../api';

export default function About() {
  const { data: settings, isLoading, error } = useSettings();

  if (isLoading) return <div className="page"><p className="loading">Loading...</p></div>;
  if (error) return <div className="page"><p className="error">Something went wrong.</p></div>;

  const bio = settings?.aboutBio ?? [];
  const imageUrl = settings?.aboutImageUrl || 'https://placehold.co/400x500/121212/a0a0a0?text=Alex+Palaghia';

  return (
    <div className="page">
      <p className="page-description">
        The story behind the lens — a journey through cinema, creativity, and craft.
      </p>
      <div className="about-content">
        <img
          className="about-image"
          src={imageUrl}
          alt="Alex Palaghia"
          width={400}
          height={500}
          loading="lazy"
        />

        <div className="about-text">
          {bio.length > 0 ? (
            bio.map((paragraph, i) => <p key={i}>{paragraph}</p>)
          ) : (
            <>
              <p>
                Alex Palaghia is a Romanian film director whose work spans narrative
                cinema, documentary, and commercial projects. With a sharp eye for
                composition and a deep commitment to authentic storytelling, he
                crafts visuals that linger long after the credits roll.
              </p>
              <p>
                His career began in Bucharest's independent film scene, where he
                quickly earned recognition for bold directorial choices and a
                cinematic language that blends raw emotion with polished aesthetics.
                Over the years, he has collaborated with talented crews across Europe
                on projects ranging from short films to full-length features.
              </p>
              <p>
                When he's not behind the camera, Alex is exploring new stories,
                scouting locations, or mentoring the next generation of filmmakers.
              </p>
            </>
          )}

          <a className="about-cta" href="/films">
            Check out my work
          </a>
        </div>
      </div>
    </div>
  );
}
