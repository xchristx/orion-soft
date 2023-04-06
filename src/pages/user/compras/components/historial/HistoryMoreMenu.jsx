import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { MenuItem, IconButton } from '@mui/material';

// components
import Iconify from '../../../../../components/Iconify';
import MenuPopover from '../../../../../components/MenuPopover';

import ChangeStatus from './ChangeStatus';

// ----------------------------------------------------------------------

HistoryMoreMenu.propTypes = {
  onDelete: PropTypes.func,
  estado: PropTypes.string,
  uid: PropTypes.string,
};

export default function HistoryMoreMenu({ estado, uid }) {
  const [open, setOpen] = useState(null);

  const handleOpen = event => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -1,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <ChangeStatus />

        <MenuItem sx={{ color: 'success.main' }} to={`/`}>
          Pagar
        </MenuItem>
      </MenuPopover>
    </>
  );
}
