import PropTypes from 'prop-types';
// @mui
import { Box, Card, Stack, Button, Divider, CardHeader, Typography, CardContent, Checkbox } from '@mui/material';
// utils
import { fCurrency } from '../../../../../utils/formatNumber';
// components.
import Iconify from '../../../../../components/Iconify';

// ----------------------------------------------------------------------

export default function DetailSumary({ onEdit, subtotal, enableEdit = false, iva, adelanto, checked }) {
  return (
    <Card sx={{ mb: 3, maxWidth: 500 }}>
      <CardHeader
        title="Resumen del pedido"
        action={
          enableEdit && (
            <Button size="small" onClick={onEdit} startIcon={<Iconify icon={'eva:edit-fill'} />}>
              Edit
            </Button>
          )
        }
      />

      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Sub Total
            </Typography>
            <Typography variant="subtitle2">{fCurrency(subtotal)}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Adelanto
            </Typography>
            <Typography variant="subtitle2">{fCurrency(adelanto)}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Valor de la factura
            </Typography>
            <Typography variant="subtitle2" sx={{ color: 'info.main', fontStyle: 'italic' }}>
              {iva ? fCurrency(iva) : '-'}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Sin factura
            </Typography>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
              {fCurrency(Math.abs(subtotal - iva))}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Urgente
            </Typography>
            {checked ? <Checkbox checked={checked} disabled /> : <span>no</span>}
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">Total</Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
                {fCurrency(subtotal - adelanto)}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

DetailSumary.propTypes = {
  total: PropTypes.number,
  discount: PropTypes.number,
  subtotal: PropTypes.number,
  shipping: PropTypes.number,
  onEdit: PropTypes.func,
  enableEdit: PropTypes.bool,
  onApplyDiscount: PropTypes.func,
  enableDiscount: PropTypes.bool,
  iva: PropTypes.any,
  error: PropTypes.bool,
  setError: PropTypes.func,
  adelanto: PropTypes.any,
  setAdelanto: PropTypes.func,
  checked: PropTypes.bool,
  setChecked: PropTypes.func,
  message: PropTypes.string,
  setMessage: PropTypes.func,
};
