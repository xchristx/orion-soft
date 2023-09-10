import PropTypes from 'prop-types';
import { TableBody, TableCell, TableRow } from '@mui/material';
import { useDispatch } from 'react-redux';
import StaffInfoMoreMenu from './ReciboMoreMenu';
import { DetalleVentaDialog } from './DetalleVentaDialog';

export default function ReciboTableBody({ fRecords, page, rowsPerPage, emptyRows }) {
  const dispatch = useDispatch();

  const handleDelete = async id => {
    dispatch(console.log(id));
  };

  return (
    <TableBody>
      {fRecords?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
        const { id, reciboId, fecha, cliente, adelanto, concepto, montoTotal, detelleRecibo, detalleVenta, cantidadTotal } = row;
        return (
          <TableRow hover key={id} tabIndex={-1}>
            <TableCell align="center">{reciboId || '---'}</TableCell>
            <TableCell align="center">
              {new Date(fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}
            </TableCell>
            <TableCell align="center">{cliente}</TableCell>
            <TableCell align="center">{concepto}</TableCell>
            <TableCell align="center">{adelanto.toLocaleString('es-MX')}</TableCell>

            <TableCell align="center">{montoTotal.toLocaleString('es-MX')}</TableCell>
            <TableCell align="center">{(montoTotal - adelanto).toLocaleString('es-MX')}</TableCell>
            <TableCell align="center">{detelleRecibo}</TableCell>
            <TableCell align="center">
              <DetalleVentaDialog detalleVenta={detalleVenta} montoTotal={montoTotal} cantidadTotal={cantidadTotal} />{' '}
            </TableCell>

            <TableCell>
              <StaffInfoMoreMenu onDelete={() => handleDelete(id)} editInfo={row} />
            </TableCell>
          </TableRow>
        );
      })}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={5} />
        </TableRow>
      )}
    </TableBody>
  );
}

ReciboTableBody.propTypes = {
  isLoading: PropTypes.bool,
  fRecords: PropTypes.array,
  products: PropTypes.array,
  currentFarm: PropTypes.object,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  emptyRows: PropTypes.number,
};
