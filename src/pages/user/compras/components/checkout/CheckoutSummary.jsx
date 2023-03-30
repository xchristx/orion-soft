import PropTypes from 'prop-types';
// @mui
import { Box, Card, Stack, Button, Divider, CardHeader, Typography, CardContent, TextField, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// utils
import { fCurrency } from '../../../../../utils/formatNumber';
// components.
import Iconify from '../../../../../components/Iconify';
import { useEffect, useState } from 'react';
import CheckoutComents from './CheckoutComents';
import ReactQuill from 'react-quill';

// ----------------------------------------------------------------------

export default function CheckoutSummary({
  total,
  onEdit,
  subtotal,
  enableEdit = false,
  iva,
  error,
  setError,
  adelanto,
  setAdelanto,
  checked,
  setChecked,
  message,
  setMessage,
}) {
  const [open, setOpen] = useState(false);

  const onInputChange = e => {
    const amount = e.target.value;
    setAdelanto(amount > 0 ? parseInt(amount) : '');
  };
  useEffect(() => {
    if (parseInt(adelanto) > parseInt(total)) setError(true);
    else setError(false);
  }, [adelanto]);

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Resumen de la compra"
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
            <TextField
              value={adelanto}
              error={error}
              disabled={!total}
              size="small"
              type="number"
              onChange={onInputChange}
              label="Adelanto"
              sx={{ width: '100px' }}
            />
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
              {fCurrency(Math.abs(total - iva))}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Urgente
            </Typography>
            <Checkbox checked={checked} onChange={e => setChecked(e.target.checked)} inputProps={{ 'aria-label': 'controlled' }} />
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">Total</Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
                {fCurrency(total - adelanto)}
              </Typography>
            </Box>
          </Stack>
          <CheckoutComents open={open} setOpen={setOpen} message={message} setMessage={setMessage} />

          {message && (
            <Box>
              <ReactQuill value={message} readOnly theme={'bubble'} />
              <IconButton aria-label="delete" onClick={() => setMessage('')}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
          <Divider />
        </Stack>
      </CardContent>
    </Card>
  );
}

CheckoutSummary.propTypes = {
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
