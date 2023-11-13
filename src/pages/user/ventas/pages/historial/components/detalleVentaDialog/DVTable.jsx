import { TableBody, TableCell, TableHead, TableRow, tableCellClasses, Table, Typography } from '@mui/material';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';

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

const DVTable = ({ detalleVenta, cantidadTotal, montoTotal, totalAdelantos, showProcedencia = true }) => {
  const tableHeadLabels = [
    { id: 'detalle', label: 'Detalle' },
    { id: 'tallas', label: 'Tallas' },
    { id: 'procedenciaProd', label: 'Procedencia' },
    { id: 'precio', label: 'Precio' },
    { id: 'cantidad', label: 'Cantidad' },
    { id: 'subtotal', label: 'Subtotal' },
    { id: 'borrar', label: '' },
  ];
  const colSpanP = showProcedencia ? 4 : 3;
  return (
    <Table aria-label="simple table" sx={{ width: '100%' }}>
      <TableHead>
        <TableRow>
          {tableHeadLabels.map(el =>
            el.id === 'procedenciaProd' && !showProcedencia ? (
              <React.Fragment key={el.id}></React.Fragment>
            ) : (
              <TableCell align="center" sx={{ px: el.id === 'borrar' ? 0 : 1, m: 0 }} key={el.id}>
                {el.label}
              </TableCell>
            )
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {detalleVenta.map(el => (
          <TableRow key={el.uid}>
            <TableCell sx={{ p: 1 }} align="center">
              {el.detalle.nombre}
            </TableCell>
            <TableCell sx={{ p: 1 }}>
              <Table>
                <TableHead>
                  <StyledTableRow sx={{ borderBottom: '1px dashed black' }}>
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
            {showProcedencia && <TableCell align="center">{el.procedenciaProd}</TableCell>}
            <TableCell sx={{ p: 1 }} align="center">
              {parseFloat(el.precio).toLocaleString('es-MX')} bs.
            </TableCell>
            <TableCell sx={{ p: 1 }} align="center">
              {el.cantidad} prs.
            </TableCell>
            <TableCell sx={{ p: 1 }} align="center">
              {(el.cantidad * el.precio).toLocaleString('es-MX')} bs.
            </TableCell>
          </TableRow>
        ))}
        <TableRow sx={{ borderTop: '1px dashed gray', height: 10 }} />

        <StyledTableRow>
          <StyledTableCell align="right" colSpan={colSpanP}>
            <Typography sx={{ pr: 3 }}>Total:</Typography>
          </StyledTableCell>
          <StyledTableCell align="center" sx={{ bgcolor: 'gray', borderRadius: 5, color: 'white' }}>
            {cantidadTotal.toLocaleString('es-MX')} prs.
          </StyledTableCell>
          <StyledTableCell align="center">{montoTotal.toLocaleString('es-MX')} bs.</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell align="right" colSpan={colSpanP}>
            <Typography sx={{ pr: 3 }}>Total pagos:</Typography>
          </StyledTableCell>
          <StyledTableCell align="center"></StyledTableCell>
          <StyledTableCell align="center">{parseFloat(totalAdelantos).toLocaleString('es-MX')} bs.</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell align="right" colSpan={colSpanP}>
            <Typography sx={{ pr: 3 }}>Saldo:</Typography>
          </StyledTableCell>
          <StyledTableCell align="center"></StyledTableCell>
          <StyledTableCell align="center" sx={{ bgcolor: 'gray', borderRadius: 5, color: 'white' }}>
            {(parseFloat(montoTotal) - parseFloat(totalAdelantos)).toLocaleString('es-MX')} bs.
          </StyledTableCell>
        </StyledTableRow>
      </TableBody>
    </Table>
  );
};
export default DVTable;

DVTable.propTypes = {
  detalleVenta: PropTypes.array,
  cantidadTotal: PropTypes.number,
  montoTotal: PropTypes.number,
  totalAdelantos: PropTypes.number,
  showProcedencia: PropTypes.bool,
};
