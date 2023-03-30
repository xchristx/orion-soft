import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useResponsive from '../../../../../hooks/useResponsive';
import Editor from '../../../../../components/editor';
import { useEffect } from 'react';

export default function CheckoutComents({ open, setOpen, message, setMessage }) {
  const fullScreen = useResponsive('down', 'md');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    setOpen(false);
  };
  const handleCancel = () => {
    setMessage('');
    setOpen(false);
  };

  useEffect(() => {
    if (message === '<p><br></p>' && !open) setMessage('');
  }, [message, open]);

  return (
    <div>
      <Button onClick={handleClickOpen}>{message ? 'Editar Comentario' : 'Agregar Comentarios adicionales'}</Button>
      <Dialog disableEscapeKeyDown fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{'Agregar Comentarios'}</DialogTitle>
        <DialogContent>
          <Editor
            simple
            id="añadirComentarios"
            value={message}
            onChange={value => setMessage(value)}
            sx={{
              borderColor: 'transparent',
              flexGrow: 1,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="error" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button onClick={handleClose} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

CheckoutComents.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  message: PropTypes.string,
  setMessage: PropTypes.func,
};
