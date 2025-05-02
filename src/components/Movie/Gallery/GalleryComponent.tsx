// interface GalleryComponentProps {
//   photos: string[];
// }

// const GalleryComponent: React.FC<GalleryComponentProps> = ({ photos }) => {
//   const maxVisiblePhotos = 4;
//   const visiblePhotos = photos.slice(0, maxVisiblePhotos);
//   const remainingCount = photos.length - maxVisiblePhotos;

//   return (
//     <div className="movie-photo-list">
//       {visiblePhotos.map((photo, index) => (
//         <div
//           key={index}
//           className="movie-photo"
//           style={{ backgroundImage: `url(${photo})` }}
//         >
//           {index === maxVisiblePhotos - 1 && remainingCount > 0 && (
//             <div className="photo-overlay">+{remainingCount}</div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default GalleryComponent;


import React, { useState } from "react";
import DialogPhotos from "./DialogPhotos"; // Adjust path as needed

interface GalleryComponentProps {
  photos: string[];
}

const GalleryComponent: React.FC<GalleryComponentProps> = ({ photos }) => {
  const maxVisiblePhotos = 4;
  const visiblePhotos = photos.slice(0, maxVisiblePhotos);
  const remainingCount = photos.length - maxVisiblePhotos;

  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handlePhotoClick = (photo: string) => {
    setSelectedPhoto(photo);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <>
      <div className="movie-photo-list">
        {visiblePhotos.map((photo, index) => (
          <div
            key={index}
            className="movie-photo"
            style={{ backgroundImage: `url(${photo})` }}
            onClick={() => handlePhotoClick(photo)}
          >
            {index === maxVisiblePhotos - 1 && remainingCount > 0 && (
              <div className="photo-overlay">+{remainingCount}</div>
            )}
          </div>
        ))}
      </div>

      <DialogPhotos
        open={dialogOpen}
        handleClose={handleCloseDialog}
        error={null}
        url={selectedPhoto || ""}
      />
    </>
  );
};

export default GalleryComponent;
