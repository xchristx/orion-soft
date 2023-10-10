import PropTypes from 'prop-types';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem } from '@mui/material';
import Iconify from '../../../../../../components/Iconify';

AnularReciboDialog.propTypes = {
  handleAnular: PropTypes.func,
  handleCloseMenu: PropTypes.func,
  disabled: PropTypes.bool,
};
const ICON = {
  mr: 2,
  width: 20,
  height: 20,
};
const BIGICON = {
  width: 120,
  height: 120,
  m: '0 auto',
};
export default function AnularReciboDialog({ handleAnular, disabled, handleCloseMenu }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleCloseMenu();
  };

  return (
    <div>
      <MenuItem onClick={handleClickOpen} sx={{ color: 'error.main' }} disabled={disabled}>
        <Iconify icon={'ph:eraser-duotone'} sx={{ ...ICON }} />
        {'anular'}
      </MenuItem>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Estas a punto de anular este recibo.'}</DialogTitle>
        <DialogContent>
          <div style={{ display: 'flex', margin: 10 }}>
            <Iconify icon={'icon-park-solid:caution'} sx={{ ...BIGICON }} />
          </div>

          <DialogContentText id="alert-dialog-description">
            ¿Estas seguro que quieres anular este recibo? esta accion no se puede deshacer!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancelar</Button>
          <Button onClick={handleAnular} autoFocus>
            anular
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
