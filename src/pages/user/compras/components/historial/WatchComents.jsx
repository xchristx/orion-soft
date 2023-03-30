import PropTypes from 'prop-types';
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import ReactQuill from 'react-quill';

export default function WatchComents({ open, setOpen, comment, id, handleChangeExpand }) {
  const handleClose = () => {
    setOpen(-1);
  };

  return (
    <>
      <Chip label="ver" color="info" onClick={() => handleChangeExpand(id)} />

      <Dialog fullWidth maxWidth="xs" open={id === open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{'Comentarios'}</DialogTitle>
        <DialogContent>
          <ReactQuill value={comment} theme={'bubble'} readOnly />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} autoFocus>
            cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
WatchComents.propTypes = {
  open: PropTypes.number.isRequired,
  setOpen: PropTypes.func.isRequired,
  comment: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  handleChangeExpand: PropTypes.func,
};
