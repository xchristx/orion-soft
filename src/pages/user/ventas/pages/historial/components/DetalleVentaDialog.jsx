import PropTypes from 'prop-types';
import {
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
  Typography,
  DialogActions,
  Button,
  Divider,
  Box,
} from '@mui/material';
import styled from '@emotion/styled';
import { useState } from 'react';
import useResponsive from '../../../../../../hooks/useResponsive';
import Scrollbar from '../../../../../../components/scrollbar/Scrollbar';
import ReciboMoreMenu from '../../recibos/components/ReciboMoreMenu';
import { useDispatch } from 'react-redux';
import { changeReciboState } from '../../../../../../redux/actions/ventasActions';

const tableHeadLabels = [
  { id: 'detalle', label: 'Detalle' },
  { id: 'procedenciaProd', label: 'Procedencia' },
  { id: 'precio', label: 'Precio' },
  { id: 'cantidad', label: 'Cantidad' },
  { id: 'subtotal', label: 'Subtotal' },
  { id: 'tallas', label: 'Tallas' },
  { id: 'borrar', label: '' },
];
const reciboTableHeadLabels = [
  { id: 'id', label: 'Id recibo' },
  { id: 'fecha', label: 'Fecha' },
  { id: 'masDetalles', label: 'Más detalles' },
  { id: 'cliente', label: 'Cliente' },
  { id: 'montoPagado', label: 'Monto Pagado' },
  { id: 'estado', label: 'Estado' },
  { id: 'moreMenu', label: '', alignRight: false },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.black,
    margin: 0,
    padding: 0,
    paddingLeft: 10,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
    margin: 0,
    padding: 0,
    paddingLeft: 10,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
export const DetalleVentaDialog = ({ detalleVenta, cantidadTotal, montoTotal, pagos, totalAdelantos, ventaUid }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const isMobile = useResponsive('down', 'md');
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

      <Dialog
        fullScreen={isMobile}
        fullWidth
        maxWidth="xl"
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{'Más Detalles'}</DialogTitle>
        <DialogContent>
          <TableContainer sx={{ display: 'flex', justifyContent: 'center' }}>
            <Scrollbar>
              {detalleVenta.length ? (
                <>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        {tableHeadLabels.map(el => (
                          <TableCell align="center" sx={{ px: el.id === 'borrar' ? 0 : 1, m: 0 }} key={el.id}>
                            {el.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {detalleVenta.map(el => (
                        <TableRow key={el.uid}>
                          <TableCell align="center">{el.detalle.nombre}</TableCell>
                          <TableCell align="center">{el.procedenciaProd}</TableCell>
                          <TableCell align="center">{parseFloat(el.precio).toLocaleString('es-MX')} bs.</TableCell>
                          <TableCell align="center">{el.cantidad} prs.</TableCell>
                          <TableCell align="center">{(el.cantidad * el.precio).toLocaleString('es-MX')} bs.</TableCell>

                          <TableCell>
                            <Table>
                              <TableHead>
                                <StyledTableRow>
                                  {el.tallas.map((el, i) => (
                                    <StyledTableCell align="center" key={i}>
                                      {' '}
                                      {el.size}{' '}
                                    </StyledTableCell>
                                  ))}
                                </StyledTableRow>
                              </TableHead>
                              <TableBody>
                                <StyledTableRow>
                                  {el.tallas.map((el, i) => (
                                    <StyledTableCell align="center" key={i}>
                                      {' '}
                                      {el.value}{' '}
                                    </StyledTableCell>
                                  ))}
                                </StyledTableRow>
                              </TableBody>
                            </Table>
                          </TableCell>
                        </TableRow>
                      ))}
                      <StyledTableRow>
                        <StyledTableCell align="right" colSpan={3}>
                          <Typography sx={{ pr: 4 }}>Total:</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center" sx={{ bgcolor: 'gray', borderRadius: 5, color: 'white' }}>
                          {cantidadTotal.toLocaleString('es-MX')} prs.
                        </StyledTableCell>
                        <StyledTableCell align="center">{montoTotal.toLocaleString('es-MX')} bs.</StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell align="right" colSpan={3}>
                          <Typography sx={{ pr: 4 }}>Total pagos:</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center">{parseFloat(totalAdelantos).toLocaleString('es-MX')} bs.</StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell align="right" colSpan={3}>
                          <Typography sx={{ pr: 4 }}>Saldo:</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center" sx={{ bgcolor: 'gray', borderRadius: 5, color: 'white' }}>
                          {(parseFloat(montoTotal) - parseFloat(totalAdelantos)).toLocaleString('es-MX')} bs.
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                  <Box sx={{ my: 2 }}>
                    <Divider />
                    <Typography sx={{ my: 1 }}>Pagos:</Typography>
                  </Box>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {reciboTableHeadLabels.map(el => (
                          <TableCell align="center" sx={{ px: el.id === 'moreMenu' ? 0 : 1, m: 0 }} key={el.id}>
                            {el.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pagos?.length > 0 &&
                        pagos.map(recibo => (
                          <TableRow key={recibo.uid}>
                            <TableCell align="center">{recibo.reciboId}</TableCell>
                            <TableCell align="center">
                              {new Date(recibo.fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </TableCell>
                            <TableCell align="center">Ver Recibo</TableCell>
                            <TableCell align="center">{recibo.cliente}</TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                textDecoration: recibo.estado === 'valido' ? 'none' : 'line-through',
                                color: recibo.estado === 'valido' ? '' : 'error.main',
                              }}
                            >
                              {recibo.adelanto} Bs.
                            </TableCell>
                            <TableCell align="center">
                              <Chip label={recibo.estado} color={recibo.estado === 'valido' ? 'success' : 'error'} />
                            </TableCell>
                            <TableCell>
                              <ReciboMoreMenu
                                disabled={Boolean(recibo.estado === 'anulado')}
                                handleAnularRecibo={() => handleAnularRecibo(recibo.uid)}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
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
