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

DeleteDialog.propTypes = {
  onDelete: PropTypes.func,
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
export default function DeleteDialog({ onDelete }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MenuItem onClick={handleClickOpen} sx={{ color: 'error.main' }}>
        <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
        {'eliminar'}
      </MenuItem>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Estas a punto de eliminar una venta!'}</DialogTitle>
        <DialogContent>
          <div style={{ display: 'flex', margin: 10 }}>
            <Iconify icon={'icon-park-solid:caution'} sx={{ ...BIGICON }} />
          </div>

          <DialogContentText id="alert-dialog-description">¿Estas seguro que quieres eliminar esta venta?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancelar</Button>
          <Button onClick={onDelete} autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
