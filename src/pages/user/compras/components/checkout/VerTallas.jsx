import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import ProductPropiedadesTable from '../product-detail/ProductPropiedadesTable';
import { getDetail } from '../../../../../utils/getDetail';

export default function VerTallas({ open, setOpen, sizes, product }) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button sx={{ my: 2 }} onClick={handleClickOpen}>
        Ver Tallas
      </Button>

      <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{'Tallas a pedir'}</DialogTitle>
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
                {sizes.map(
                  el =>
                    !!el.value && (
                      <TableRow key={el.size}>
                        <TableCell align="center">{el.size}</TableCell>
                        <TableCell align="center">
                          <Typography>{el.value}</Typography>
                        </TableCell>
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <ProductPropiedadesTable rows={getDetail(product)} />
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
VerTallas.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  sizes: PropTypes.array.isRequired,
  isEmptySizes: PropTypes.bool,
  product: PropTypes.object,
};
