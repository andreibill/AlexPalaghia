import { galleryPhotos } from '../data/gallery';

export default function Gallery() {
  return (
    <div className="page">
      <p className="page-description">
        Visual moments captured between takes — a glimpse behind the scenes.
      </p>

      <div className="gallery-grid">
        {galleryPhotos.map((photo) => (
          <div key={photo.id} className="gallery-card">
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
