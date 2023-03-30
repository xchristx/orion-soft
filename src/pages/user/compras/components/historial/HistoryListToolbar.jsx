import PropTypes from 'prop-types';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton } from '@mui/material';
// components
import Iconify from '../../../../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

HistoryListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onDeleteProducts: PropTypes.func,
};

export default function HistoryListToolbar({ numSelected, filterName, onFilterName, onDeleteProducts }) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: isLight ? 'primary.main' : 'text.primary',
          bgcolor: isLight ? 'primary.lighter' : 'primary.dark',
        }),
      }}
    >
      <span></span>
      <Tooltip title="Filter list">
        <IconButton>
          <Iconify icon={'ic:round-filter-list'} />
        </IconButton>
      </Tooltip>
    </RootStyle>
  );
}
