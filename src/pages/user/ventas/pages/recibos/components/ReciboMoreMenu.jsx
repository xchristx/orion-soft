import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { IconButton } from '@mui/material';

// components
import Iconify from '../../../../../../components/Iconify';
import MenuPopover from '../../../../../../components/MenuPopover';
import AnularReciboDialog from './AnularReciboDialog';
import ImprimirVentas from '../../historial/components/Imprimir';

// ----------------------------------------------------------------------

export default function ReciboMoreMenu({ handleAnularRecibo, disabled, recibo }) {
  const [open, setOpen] = useState(false);

  const handleOpen = event => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
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
        <AnularReciboDialog handleAnular={handleAnularRecibo} disabled={disabled} handleCloseMenu={handleClose} />
        <ImprimirVentas recibo={recibo} />
      </MenuPopover>
    </>
  );
}

ReciboMoreMenu.propTypes = {
  handleAnularRecibo: PropTypes.func,
  disabled: PropTypes.bool,
  editInfo: PropTypes.object,
  recodId: PropTypes.string,
  totalPagos: PropTypes.number,
  recibo: PropTypes.object,
};
