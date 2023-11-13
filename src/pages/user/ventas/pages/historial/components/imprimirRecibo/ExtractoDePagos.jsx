import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableHead, TableRow, styled, tableCellClasses } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'transparent',
    color: theme.palette.common.black,
    margin: 0,
    padding: '0 50px',
    paddingLeft: 10,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
    margin: 0,
    padding: '0 50px',
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

const ExtractoPagos = ({ pagos }) => {
  return (
    <Table sx={{ width: 'auto', p: 5 }}>
      <TableHead>
        <StyledTableRow>
          <StyledTableCell align="center">No. de Recibo</StyledTableCell>
          <StyledTableCell align="center">Fecha</StyledTableCell>
          <StyledTableCell align="center">Importe</StyledTableCell>
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {pagos?.length > 0 &&
          pagos.map(recibo => (
            <StyledTableRow key={recibo.uid}>
              <StyledTableCell align="center">{recibo.reciboId}</StyledTableCell>
              <StyledTableCell align="center">
                {new Date(recibo.fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                sx={{
                  textDecoration: recibo.estado === 'valido' ? 'none' : 'line-through',
                  color: recibo.estado === 'valido' ? '' : 'error.main',
                }}
              >
                {recibo.adelanto} Bs.
              </StyledTableCell>
            </StyledTableRow>
          ))}

        <StyledTableRow>
          <StyledTableCell align="right" colSpan={2} sx={{ fontWeight: 600 }}>
            Total
          </StyledTableCell>
          <StyledTableCell sx={{ fontWeight: 600 }} align="center">
            {pagos.reduce((acc, curr) => acc + curr.adelanto, 0)} Bs.
          </StyledTableCell>
        </StyledTableRow>
      </TableBody>
    </Table>
  );
};

export default ExtractoPagos;
ExtractoPagos.propTypes = {
  pagos: PropTypes.array,
};
