import PropTypes from 'prop-types';
// @mui
import { Box, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { handleRequestSortHistorial } from '../../../../../redux/slices/product';

// ----------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: '1px',
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '1px',
};

HistoryListHead.propTypes = {
  headLabel: PropTypes.array,
};

export default function HistoryListHead({ headLabel }) {
  const { orderBy, order } = useSelector(s => s.product.historial);
  const dispatch = useDispatch();

  const createSortHandler = property => {
    dispatch(handleRequestSortHistorial(property));
  };

  return (
    <TableHead>
      <TableRow>
        {headLabel.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'center'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              disabled={headCell.id === 'detalles' || headCell.id === 'monto'}
              onClick={() => createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
