import PropTypes from 'prop-types';
import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
  searchQuery2: PropTypes.string,
  searchActive: PropTypes.string,
};

export default function SearchNotFound({ searchQuery = '', searchQuery2, searchActive, ...other }) {
  console.log(searchActive);
  const search = searchActive === 'search2' ? searchQuery2 : searchQuery;
  return search ? (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        No encontrado
      </Typography>
      <Typography variant="body2" align="center">
        Ninguna coincidencia encontrada para &nbsp;
        <strong>&quot;{search}&quot;</strong>.
      </Typography>
    </Paper>
  ) : (
    <Typography variant="body2"> Por favor introduce una palabra</Typography>
  );
}
