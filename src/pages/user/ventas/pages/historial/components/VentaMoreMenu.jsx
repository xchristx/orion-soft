import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { MenuItem, IconButton } from '@mui/material';

// components
import Iconify from '../../../../../../components/Iconify';
import MenuPopover from '../../../../../../components/MenuPopover';

// Translation module
import AddEditVenta from './AddEditVenta';
import DeleteDialog from './DeleteDialog';

// ----------------------------------------------------------------------

export default function VentasMoreMenu({ onDelete, editInfo, handleOpenRecibo, saldo }) {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // Added the translation for the tittle and other translations

  const handleOpen = event => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setOpen(false);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
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
        <DeleteDialog onDelete={onDelete} />
        {saldo > 0 && (
          <MenuItem
            onClick={() => {
              handleOpenRecibo();
              setOpen(false);
            }}
            sx={{ color: 'success.main' }}
          >
            <Iconify icon={'uil:bill'} sx={{ ...ICON }} />
            {'nuevo pago'}
          </MenuItem>
        )}

        {/* <MenuItem onClick={() => setOpenDialog(true)}>
          <Iconify icon={'eva:edit-fill'} sx={{ ...ICON }} />
          {'editar'}
        </MenuItem> */}
      </MenuPopover>
      <AddEditVenta
        open={openDialog}
        onClose={() => handleCloseDialog()}
        title={'Editar registro de fertilización'}
        edit={true}
        editInfo={editInfo}
      />
    </>
  );
}

VentasMoreMenu.propTypes = {
  onDelete: PropTypes.func,
  handleOpenRecibo: PropTypes.func,
  editInfo: PropTypes.object,
  recodId: PropTypes.string,
  saldo: PropTypes.number,
};
