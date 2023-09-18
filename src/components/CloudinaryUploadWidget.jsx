import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { useEffect, useRef } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

export const CloudinaryUploadWidget = ({ setState, setError }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'dw8jw0zhx',
        uploadPreset: 'orionsoft',
        clientAllowedFormats: ['jpg', 'png'],
        sources: ['local'],
      },
      function (error, result) {
        if (result.info.files) setState(prev => result.info.files.concat(prev));
        if (error) {
          console.log(error);
          setError(error);
        }
      }
    );
  }, []);

  return (
    <div>
      <Button variant="contained" onClick={() => widgetRef.current.open()} startIcon={<AddPhotoAlternateIcon />}>
        subir
      </Button>
    </div>
  );
};
CloudinaryUploadWidget.propTypes = {
  setState: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};
