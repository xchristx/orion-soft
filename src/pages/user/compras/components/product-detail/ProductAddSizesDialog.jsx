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
  Typography,
} from '@mui/material';

import Iconify from '../../../../../components/Iconify';
import useResponsive from '../../../../../hooks/useResponsive';
import React, { useEffect, useState } from 'react';
import Scrollbar from '../../../../../components/scrollbar/Scrollbar';

export default function ProductAddSizesDialog({
  open,
  setOpen,
  sizes,
  isEmptySizes,
  setIsEmptySizes,
  setSizes,
  buttonVariant = 'contained',
  disabled = false,
  prodProcedencia,
  prodData,
  prod,
  showDetail = true,
}) {
  const isMobile = useResponsive('down', 'md');
  const handleClickOpen = () => {
    setOpen(true);
  };

  // const [defaultSizes, setDefaultSizes] = useState(sizes);
  const [editSizes, setEditSizes] = useState([...Array(13)].map((el, i) => ({ size: i + 34, value: 0 })));
  const [maxQuantityError, setMaxQuantityError] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setSizes(editSizes);
    handleClose();
  };

  const handleReset = () => {
    if (prodProcedencia === 'stock' && prod)
      setEditSizes(prodData?.find(el => el.uid === prod).tallas?.map(el => ({ ...el, value: 0, max: el.value })));
    else setEditSizes([...Array(13)].map((el, i) => ({ size: i + 34, value: 0 })));
  };

  const handleIncreaseItem = key => {
    setEditSizes(
      [...editSizes].map(el => {
        if (el.size === key) {
          return { ...el, value: el.value + 1 };
        } else return el;
      })
    );
  };
  const handleDecrementItem = key => {
    setEditSizes(
      [...editSizes].map(el => {
        if (el.size === key) {
          return { ...el, value: el.value - 1 };
        } else return el;
      })
    );
  };
  const handleChangeInput = (e, key, max) => {
    setEditSizes(
      editSizes.map(el => {
        if (el.size === key) {
          return { ...el, value: e.target.value ? parseInt(e.target.value) : 0 };
        } else return el;
      })
    );
    if (parseInt(e.target.value) > parseInt(max)) setMaxQuantityError(true);
    else setMaxQuantityError(false);
  };

  useEffect(() => {
    if (prodProcedencia === 'stock' && prod)
      setEditSizes(prodData?.find(el => el.uid === prod).tallas?.map(el => ({ ...el, value: 0, max: el.value })));
    else setEditSizes([...Array(13)].map((el, i) => ({ size: i + 34, value: 0 })));
  }, [prodProcedencia, prod]);

  useEffect(() => {
    handleReset();
    setIsEmptySizes(false);
    if (prodProcedencia === 'stock' && prod)
      setSizes(prodData?.find(el => el.uid === prod).tallas?.map(el => ({ ...el, value: 0, max: el.value })));
    else setSizes([...Array(13)].map((el, i) => ({ size: i + 34, value: 0 })));
  }, [prodProcedencia]);

  return (
    <>
      <Button sx={{ my: 2 }} variant={buttonVariant} disabled={disabled} onClick={() => handleClickOpen(true)}>
        {isEmptySizes ? 'Editar Tallas' : 'Añadir Tallas'}
      </Button>
      {isEmptySizes && showDetail && (
        <TableContainer component={Paper} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Table sx={{ minWidth: { xs: 150 } }} aria-label="simple table">
            <TableHead>
              <TableRow>{sizes.map(el => el.value > 0 && <TableCell key={el.size}>{el.size}</TableCell>)}</TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {sizes.map(
                  el =>
                    el.value > 0 && (
                      <TableCell sx={{ margin: 0, padding: 0, border: '1px solid red' }} key={el.size}>
                        {el.value}
                      </TableCell>
                    )
                )}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog fullScreen={isMobile} fullWidth maxWidth="xs" open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{'Elegir tallas'}</DialogTitle>
        <DialogContent>
          <Scrollbar>
            <TableContainer component={Paper} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Table sx={{ maxWidth: { xs: 150 } }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Talla</TableCell>
                    <TableCell align="center">Cantidad</TableCell>
                    {prodProcedencia === 'stock' && <TableCell align="center"> Cant. max.</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {editSizes.map(el => {
                    const stockData =
                      prodProcedencia === 'stock'
                        ? prodData?.find(data => data.uid === prod)?.tallas?.find(talla => talla.size === el.size)
                        : null;
                    return (
                      <React.Fragment key={el.size}>
                        <TableRow sx={{ p: 0, m: 0 }}>
                          <TableCell sx={{ m: 0, py: 0.5 }}>{el.size}</TableCell>
                          <TableCell sx={{ m: 0, py: 0.5 }}>
                            <Incrementer
                              available={prodProcedencia === 'stock' ? stockData?.value : 200}
                              quantity={el.value}
                              onIncrementQuantity={() => handleIncreaseItem(el.size)}
                              onDecrementQuantity={() => handleDecrementItem(el.size)}
                              handleChangeInput={e => handleChangeInput(e, el.size, stockData?.value)}
                            />
                          </TableCell>
                          {prodProcedencia === 'stock' && <TableCell align="center">{stockData?.value}</TableCell>}
                        </TableRow>
                      </React.Fragment>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleReset}>
            Resetear
          </Button>
          <Button autoFocus onClick={() => handleClose(true)}>
            Cancelar
          </Button>
          <Button onClick={() => handleSave()} autoFocus disabled={maxQuantityError}>
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
  setIsEmptySizes: PropTypes.func,
  setSizes: PropTypes.func,
  buttonVariant: PropTypes.string,
  disabled: PropTypes.bool,
  prodProcedencia: PropTypes.string,
  prodData: PropTypes.any,
  prod: PropTypes.string,
  showDetail: PropTypes.bool,
};
function Incrementer({ available, quantity, onIncrementQuantity, onDecrementQuantity, handleChangeInput }) {
  return (
    <>
      <Box
        sx={{
          px: 0.75,
          margin: 0,
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

        <TextField
          color={parseInt(available) < parseInt(quantity) ? 'error' : ''}
          value={quantity}
          variant="standard"
          size="small"
          sx={{ width: 40, m: 0, color: parseInt(available) < parseInt(quantity) ? 'error' : '' }}
          inputProps={{ sx: { color: parseInt(available) < parseInt(quantity) ? 'red' : '' } }}
          onChange={handleChangeInput}
        />

        <IconButton size="small" color="inherit" disabled={quantity >= available} onClick={onIncrementQuantity}>
          <Iconify icon={'eva:plus-fill'} width={14} height={14} />
        </IconButton>
      </Box>
      {parseInt(available) < parseInt(quantity) && (
        <Typography sx={{ fontSize: '13px' }} color="error">
          error de stock
        </Typography>
      )}
    </>
  );
}

Incrementer.propTypes = {
  available: PropTypes.number,
  quantity: PropTypes.number,
  onIncrementQuantity: PropTypes.func,
  onDecrementQuantity: PropTypes.func,
  handleChangeInput: PropTypes.func,
};
