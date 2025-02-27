import { photos } from "./photos";

const GalleryComponent = () => {
  const maxVisiblePhotos = 4;
  const visiblePhotos = photos.slice(0, maxVisiblePhotos);
  const remainingCount = photos.length - maxVisiblePhotos;

  return (
    <div className="movie-photo-list">
      {visiblePhotos.map((photo, index) => (
        <div
          key={index}
          className="movie-photo"
          style={{ backgroundImage: `url(${photo.src})` }}
        >
          {index === maxVisiblePhotos - 1 && remainingCount > 0 && (
            <div className="photo-overlay">+{remainingCount}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GalleryComponent;
