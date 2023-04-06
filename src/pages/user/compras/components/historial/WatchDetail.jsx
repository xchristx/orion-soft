import PropTypes from 'prop-types';
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import WatchDetailList from './WatchDetailList';
import DetailSumary from './DetailSumary';

export default function WatchDetail({ open, setOpen, product, id, handleChangeExpand, other }) {
  const handleClose = () => {
    setOpen(-1);
  };

  return (
    <>
      <Chip label="ver" color="info" onClick={() => handleChangeExpand(id)} />

      <Dialog fullWidth maxWidth="lg" open={id === open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{'Detalles del pedido'}</DialogTitle>
        <DialogContent>
          <WatchDetailList products={product} factura={other.iva} />
          <DetailSumary
            subtotal={other.totalSinIva + other.totalIva}
            adelanto={other.adelanto}
            checked={other.urgente}
            iva={other.totalIva}
          />
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
WatchDetail.propTypes = {
  open: PropTypes.number.isRequired,
  setOpen: PropTypes.func.isRequired,
  product: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  handleChangeExpand: PropTypes.func,
  other: PropTypes.object,
};
