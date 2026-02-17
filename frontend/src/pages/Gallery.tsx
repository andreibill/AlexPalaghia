import { useGallery } from '../api';

export default function Gallery() {
  const { data: galleryPhotos, isLoading, error } = useGallery();

  if (isLoading) return <div className="page"><p className="loading">Loading...</p></div>;
  if (error) return <div className="page"><p className="error">Something went wrong.</p></div>;

  return (
    <div className="page">
      <p className="page-description">
        Visual moments captured between takes — a glimpse behind the scenes.
      </p>

      <div className="gallery-grid">
        {(galleryPhotos ?? []).map((photo) => (
          <div key={photo._id} className="gallery-card">
            <img
              className="gallery-card__image"
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
