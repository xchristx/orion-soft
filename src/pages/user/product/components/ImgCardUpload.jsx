import PropTypes from 'prop-types';
import { Box, Card, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CloudinaryUploadWidget } from '../../../../components/CloudinaryUploadWidget';
import ImageGallery from 'react-image-gallery';

export default function ImgCardUpload({ setState, setError, images }) {
  const galleryImages = images.length
    ? images.map(el => ({
        original: el.uploadInfo?.secure_url,
        thumbnail: el.uploadInfo?.thumbnail_url,
        originalWidth: '300px',
        originalHeight: '300px',
        thumbnailHeight: '50px',
        thumbnailWidth: '50px',
      }))
    : [
        {
          original: '/assets/predeterminado.png',
          thumbnail: '/assets/predeterminado.png',
          originalWidth: '300px',
          originalHeight: '300px',
          thumbnailHeight: '50px',
          thumbnailWidth: '20px',
        },
      ];

  return (
    <>
      <Box my={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Card sx={{ position: 'relative', margin: 'auto' }}>
          <Box sx={{ left: 5, top: 5, maxWidth: { xs: 250, sm: 300, md: 400, lg: 500 } }}>
            <ImageGallery items={galleryImages} showThumbnails showFullscreenButton={false} showPlayButton={false} />
          </Box>
          <Box sx={{ position: 'absolute', top: 5, left: 5 }}>
            <CloudinaryUploadWidget setError={setError} setState={setState} />
          </Box>
          {images.length && (
            <IconButton aria-label="delete" onClick={() => setState([])} sx={{ right: 5, top: 5, position: 'absolute' }}>
              <DeleteIcon color="error" />
            </IconButton>
          )}
        </Card>
      </Box>
    </>
  );
}
ImgCardUpload.propTypes = {
  setState: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  src: PropTypes.string,
  images: PropTypes.array.isRequired,
};
