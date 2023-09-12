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
} from '@mui/material';
import styled from '@emotion/styled';
import { useState } from 'react';
import useResponsive from '../../../../hooks/useResponsive';
import Scrollbar from '../../../../components/scrollbar/Scrollbar';

const tableHeadLabels = [
  { id: 'detalle', label: 'Detalle' },
  { id: 'precio', label: 'Precio' },
  { id: 'cantidad', label: 'Cantidad' },
  { id: 'subtotal', label: 'Subtotal' },
  { id: 'tallas', label: 'Tallas' },
  { id: 'borrar', label: '' },
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
export const DetalleVentaDialog = ({ detalleVenta, cantidadTotal, montoTotal }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const isMobile = useResponsive('down', 'md');
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
        <DialogTitle id="responsive-dialog-title">{'Ver Detalles'}</DialogTitle>
        <DialogContent>
          <TableContainer sx={{ display: 'flex', justifyContent: 'center' }}>
            <Scrollbar>
              {detalleVenta.length ? (
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
                        <TableCell align="center">{el.detalle}</TableCell>
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
                      <StyledTableCell align="right" colSpan={2}>
                        <Typography sx={{ pr: 4 }}>Total:</Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ bgcolor: 'gray', borderRadius: 5, color: 'white' }}>
                        {cantidadTotal.toLocaleString('es-MX')} prs.
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ bgcolor: 'gray', borderRadius: 5, color: 'white' }}>
                        {montoTotal.toLocaleString('es-MX')} bs.
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
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
  cantidadTotal: PropTypes.number,
  montoTotal: PropTypes.number,
};
