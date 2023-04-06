import { ListItem, Dialog, DialogTitle, Chip, List, MenuItem } from '@mui/material';

import { useState } from 'react';

export default function AlertDialog() {
  const allStatus = ['pAceptar', 'aceptado', 'recbido', 'rechazado'];
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MenuItem onClick={handleClickOpen}>Cambiar Estado</MenuItem>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Elegir estado'}</DialogTitle>
        <List>
          {allStatus.map(status => (
            <ListItem key={status}>
              <Chip
                label={status}
                color={
                  (status === 'pAceptar' ? 'warning' : status === 'aceptado' ? 'info' : status === 'recibido' ? 'success' : 'error') ||
                  (status === 'enProceso' && 'warning') ||
                  'success'
                }
                sx={{ width: '100%' }}
              />
            </ListItem>
          ))}
        </List>
      </Dialog>
    </div>
  );
}
