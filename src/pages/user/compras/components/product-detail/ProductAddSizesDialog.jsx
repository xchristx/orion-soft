import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';

import Iconify from '../../../../../components/Iconify';
import useResponsive from '../../../../../hooks/useResponsive';
import { useState } from 'react';

export default function ProductAddSizesDialog({ open, setOpen, sizes, isEmptySizes, setSizes, buttonVariant = 'contained' }) {
  const isMobile = useResponsive('down', 'md');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const [defaultSizes, setDefaultSizes] = useState(sizes);

  const handleClose = cancel => {
    if (cancel) setSizes(defaultSizes);
    else setDefaultSizes(sizes);
    setOpen(false);
  };
  const handleReset = () => {
    setSizes([...Array(13)].map((el, i) => ({ size: i + 34, value: 0 })));
  };

  const handleIncreaseItem = key => {
    setSizes(
      [...sizes].map(el => {
        if (el.size === key) {
          return { ...el, value: el.value + 1 };
        } else return el;
      })
    );
  };
  const handleDecrementItem = key => {
    setSizes(
      [...sizes].map(el => {
        if (el.size === key) {
          return { ...el, value: el.value - 1 };
        } else return el;
      })
    );
  };
  const handleChangeInput = (e, key) => {
    setSizes(
      sizes.map(el => {
        if (el.size === key) {
          return { ...el, value: e.target.value ? parseInt(e.target.value) : 0 };
        } else return el;
      })
    );
  };

  return (
    <>
      <Button sx={{ my: 2 }} variant={buttonVariant} onClick={handleClickOpen}>
        {isEmptySizes ? 'Editar Tallas' : 'Añadir Tallas'}
      </Button>
      {isEmptySizes && (
        <TableContainer component={Paper} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Table sx={{ minWidth: { xs: 150 } }} aria-label="simple table">
            <TableHead>
              <TableRow>{sizes.map(el => el.value > 0 && <TableCell key={el.size}>{el.size}</TableCell>)}</TableRow>
            </TableHead>
            <TableBody>
              <TableRow>{sizes.map(el => el.value > 0 && <TableCell key={el.size}>{el.value}</TableCell>)}</TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog fullScreen={isMobile} fullWidth maxWidth="xs" open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{'Elegir tallas'}</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Table sx={{ maxWidth: { xs: 150 } }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Talla</TableCell>
                  <TableCell align="center">Cantidad</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sizes.map(el => (
                  <TableRow key={el.size}>
                    <TableCell>{el.size}</TableCell>
                    <TableCell>
                      <Incrementer
                        available={200}
                        quantity={el.value}
                        onIncrementQuantity={() => handleIncreaseItem(el.size)}
                        onDecrementQuantity={() => handleDecrementItem(el.size)}
                        handleChangeInput={e => handleChangeInput(e, el.size)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleReset}>
            Resetear
          </Button>
          <Button autoFocus onClick={() => handleClose(true)}>
            Cancelar
          </Button>
          <Button onClick={() => handleClose(false)} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
ProductAddSizesDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  sizes: PropTypes.array.isRequired,
  isEmptySizes: PropTypes.bool,
  setSizes: PropTypes.func,
  buttonVariant: PropTypes.string,
};
function Incrementer({ available, quantity, onIncrementQuantity, onDecrementQuantity, handleChangeInput }) {
  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032',
      }}
    >
      <IconButton size="small" color="inherit" disabled={quantity <= 0} onClick={onDecrementQuantity}>
        <Iconify icon={'eva:minus-fill'} width={14} height={14} />
      </IconButton>

      <TextField value={quantity} variant="standard" size="small" sx={{ width: 20 }} onChange={handleChangeInput} />

      <IconButton size="small" color="inherit" disabled={quantity >= available} onClick={onIncrementQuantity}>
        <Iconify icon={'eva:plus-fill'} width={14} height={14} />
      </IconButton>
    </Box>
  );
}

Incrementer.propTypes = {
  available: PropTypes.number,
  quantity: PropTypes.number,
  onIncrementQuantity: PropTypes.func,
  onDecrementQuantity: PropTypes.func,
  handleChangeInput: PropTypes.func,
};
