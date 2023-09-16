import PropTypes from 'prop-types';
import { Box, TableBody, TableCell, TableRow } from '@mui/material';
import { useDispatch } from 'react-redux';
import StaffInfoMoreMenu from './ProductosMoreMenu';
import { deleteProducto } from '../../../../redux/actions/productActions';
import { ProductDetalleDialog } from './ProductDetalleDialog';

export default function ClientesTableBody({ fRecords, page, rowsPerPage, emptyRows }) {
  const dispatch = useDispatch();

  const handleDelete = async id => {
    dispatch(deleteProducto(id));
  };

  return (
    <TableBody>
      {fRecords?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
        const { img, nombre, precio, cantidad, tallas, tipo, detalles, notas, uid, proveedor } = row;
        return (
          <TableRow hover key={uid} tabIndex={-1}>
            <TableCell align="center" sx={{ minWidth: { xs: 150, sm: 200 } }}>
              <Box component="img" sx={{ width: 180 }} src={img} alt="asd" />{' '}
            </TableCell>
            <TableCell align="center">{nombre || '---'}</TableCell>
            <TableCell align="center">{proveedor?.name || '---'}</TableCell>
            <TableCell align="center">{parseFloat(precio.facturado).toLocaleString('es-MX') + ' bs.' || '---'}</TableCell>
            <TableCell align="center">{parseFloat(precio.noFacturado).toLocaleString('es-MX') + ' bs.' || '---'}</TableCell>
            <TableCell align="center">{cantidad.toLocaleString('es-MX') + ' prs.' || '---'}</TableCell>
            <TableCell align="center">{tipo || '---'}</TableCell>
            <TableCell align="center">
              <ProductDetalleDialog detalleVenta={detalles} tallas={tallas} />
            </TableCell>
            <TableCell align="center">{notas || '---'}</TableCell>

            <TableCell>
              <StaffInfoMoreMenu onDelete={() => handleDelete(uid)} editInfo={row} />
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

ClientesTableBody.propTypes = {
  isLoading: PropTypes.bool,
  fRecords: PropTypes.array,
  products: PropTypes.array,
  currentFarm: PropTypes.object,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  emptyRows: PropTypes.number,
};
