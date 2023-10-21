import PropTypes from 'prop-types';
import { Chip, Dialog, DialogContent, DialogTitle, TableContainer, Typography, DialogActions, Button, Divider, Box } from '@mui/material';
import { useState } from 'react';
import Scrollbar from '../../../../../../../components/scrollbar/Scrollbar';
import { useDispatch } from 'react-redux';
import { changeReciboState } from '../../../../../../../redux/actions/ventasActions';
import DVTable from './DVTable';
import DPagosTable from './DPagosTable';

export const DetalleVentaDialog = ({ detalleVenta, cantidadTotal, montoTotal, pagos, totalAdelantos, ventaUid }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const dispatch = useDispatch();

  const handleAnularRecibo = idRecibo => {
    let adelantoActualizado = 0;
    const newPagos = pagos.map(recibo => {
      if (recibo.uid === idRecibo) {
        adelantoActualizado = totalAdelantos - recibo.adelanto;
        return { ...recibo, estado: 'anulado' };
      } else return recibo;
    });
    dispatch(changeReciboState({ uid: ventaUid, data: newPagos, adelantoActualizado }));
  };

  return (
    <div>
      <Chip color="info" onClick={handleClickOpen} label="ver" />

      <Dialog fullScreen fullWidth maxWidth="xl" open={open} onClose={() => setOpen(false)} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{'Más Detalles'}</DialogTitle>
        <DialogContent>
          <TableContainer sx={{ display: 'flex', justifyContent: 'center' }}>
            <Scrollbar>
              {detalleVenta.length ? (
                <>
                  <Typography sx={{ mt: 1, mb: 2 }}> Detalle Venta:</Typography>
                  <DVTable
                    cantidadTotal={cantidadTotal}
                    detalleVenta={detalleVenta}
                    montoTotal={montoTotal}
                    totalAdelantos={totalAdelantos}
                  />
                  <Box sx={{ my: 2 }}>
                    <Divider />
                    <Typography sx={{ my: 1 }}>Detalle Pagos:</Typography>
                  </Box>
                  <DPagosTable detalleVenta={detalleVenta} pagos={pagos} handleAnularRecibo={handleAnularRecibo} />
                </>
              ) : (
                <></>
              )}
            </Scrollbar>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DetalleVentaDialog.propTypes = {
  detalleVenta: PropTypes.array,
  pagos: PropTypes.array,
  cantidadTotal: PropTypes.number,
  montoTotal: PropTypes.number,
  totalAdelantos: PropTypes.number,
  ventaUid: PropTypes.string,
};
