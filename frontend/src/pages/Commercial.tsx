import { commercials, getYouTubeId } from '../data/commercials';
import YouTubeEmbed from '../components/YouTubeEmbed';
import './Commercial.css';

export default function Commercial() {
  return (
    <div className="page">
      <p className="page-description">
        Brand stories brought to life through cinematic direction.
      </p>

      {commercials.length === 0 ? (
        <p className="commercial-empty">Commercial work coming soon.</p>
      ) : (
        <div className="commercial-list">
          {commercials.map((item) => {
            const videoId = getYouTubeId(item.youtubeUrl);
            return (
              <article key={item.id} className="commercial-item">
                {videoId && (
                  <YouTubeEmbed videoId={videoId} title={item.title} />
                )}
                <h2>{item.title}</h2>
                <div className="commercial-item__meta">
                  <span className="commercial-item__client">{item.client}</span>
                  <span className="commercial-item__separator">/</span>
                  <span className="commercial-item__year">{item.year}</span>
                </div>
                {item.description && (
                  <p className="commercial-item__description">
                    {item.description}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
