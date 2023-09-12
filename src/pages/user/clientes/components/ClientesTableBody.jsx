import PropTypes from 'prop-types';
import { TableBody, TableCell, TableRow } from '@mui/material';
import { useDispatch } from 'react-redux';
import StaffInfoMoreMenu from './ClientesMoreMenu';
import { deleteCliente } from '../../../../redux/actions/clientesActions';

export default function ClientesTableBody({ fRecords, page, rowsPerPage, emptyRows }) {
  const dispatch = useDispatch();

  const handleDelete = async id => {
    dispatch(deleteCliente(id));
  };

  return (
    <TableBody>
      {fRecords?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
        const { nombre, apellido, celular, email, notas, uid, tipo } = row;
        return (
          <TableRow hover key={uid} tabIndex={-1}>
            <TableCell align="center">{nombre || '---'}</TableCell>
            <TableCell align="center">{apellido || '---'}</TableCell>
            <TableCell align="center">{celular || '---'}</TableCell>
            <TableCell align="center">{email || '---'}</TableCell>
            <TableCell align="center">{tipo || '---'}</TableCell>
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
