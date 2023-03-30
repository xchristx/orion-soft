import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, capitalize } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function ProductPropiedadesTable({ rows, sx }) {
  return (
    <TableContainer component={Paper} sx={{ ...sx }}>
      <Table aria-label="simple table" sx={{ my: 2 }}>
        <TableHead>
          <TableRow>
            {rows.map((row, i) => (
              <TableCell align="center" key={i}>
                {row.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            {rows.map((row, i) => (
              <TableCell key={i} align="center">
                {typeof row.value === 'boolean' ? <CheckCircleOutlineIcon color="success" /> : capitalize(row.value)}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
ProductPropiedadesTable.propTypes = {
  rows: PropTypes.array,
  sx: PropTypes.any,
};
