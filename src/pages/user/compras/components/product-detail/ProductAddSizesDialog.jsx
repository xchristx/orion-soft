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
  Typography,
} from '@mui/material';

import Iconify from '../../../../../components/Iconify';
import useResponsive from '../../../../../hooks/useResponsive';

export default function ProductAddSizesDialog({ open, setOpen, sizes, setSizes }) {
  const isMobile = useResponsive('down', 'md');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleIncreaseItem = key => {
    setSizes(
      [...sizes].map(el => {
        if (el.size === key) {
          return { ...el, value: el.value + 1 };
        } else return el;
      })
    );
    console.log(sizes);
  };
  const handleDecrementItem = key => {
    setSizes(
      sizes.map(el => {
        if (el.size === key) {
          return { ...el, value: el.value - 1 };
        } else return el;
      })
    );
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Añadir Tallas
      </Button>
      <Dialog fullScreen={isMobile} fullWidth maxWidth="xl" open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{'Elegir tallas'}</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Table sx={{ maxWidth: { sm: 200, md: '100%' } }} aria-label="simple table">
              {isMobile ? (
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
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <>
                  <TableHead>
                    <TableRow>
                      {sizes.map(el => (
                        <TableCell align="center" key={el.size}>
                          {el.size}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      {sizes.map(el => (
                        <TableCell align="center" key={el.size}>
                          <Incrementer
                            available={200}
                            quantity={el.value}
                            onIncrementQuantity={() => handleIncreaseItem(el.size)}
                            onDecrementQuantity={() => handleDecrementItem(el.size)}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </>
              )}
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
ProductAddSizesDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  sizes: PropTypes.array.isRequired,
  setSizes: PropTypes.func.isRequired,
};
function Incrementer({ available, quantity, onIncrementQuantity, onDecrementQuantity }) {
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
      <IconButton size="small" color="inherit" disabled={quantity <= 1} onClick={onDecrementQuantity}>
        <Iconify icon={'eva:minus-fill'} width={14} height={14} />
      </IconButton>

      <Typography variant="body2" component="span" sx={{ width: 40, textAlign: 'center' }}>
        {quantity}
      </Typography>

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
};
