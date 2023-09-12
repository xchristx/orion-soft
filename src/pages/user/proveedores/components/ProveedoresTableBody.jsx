import PropTypes from 'prop-types';
import { TableBody, TableCell, TableRow } from '@mui/material';
import { useDispatch } from 'react-redux';
import StaffInfoMoreMenu from './ProveedoresMoreMenu';
import { deleteProvedor } from '../../../../redux/actions/proveedoresActions';

export default function ClientesTableBody({ fRecords, page, rowsPerPage, emptyRows }) {
  const dispatch = useDispatch();

  const handleDelete = async id => {
    dispatch(deleteProvedor(id));
  };

  return (
    <TableBody>
      {fRecords?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
        const { nit, nombre, celular, email, notas, uid, producto } = row;
        return (
          <TableRow hover key={uid} tabIndex={-1}>
            <TableCell align="center">{nit || '---'}</TableCell>
            <TableCell align="center">{nombre || '---'}</TableCell>
            <TableCell align="center">{celular || '---'}</TableCell>
            <TableCell align="center">{email || '---'}</TableCell>
            <TableCell align="center">{producto || '---'}</TableCell>
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
