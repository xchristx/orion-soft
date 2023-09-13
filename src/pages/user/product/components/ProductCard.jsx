import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
// routes
// utils
import { fCurrency } from '../../../../../utils/formatNumber';
// components
import Image from '../../../../../components/Image';
import { ColorPreview } from '../../../../../components/color-utils';

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export function ShopProductCard({ product }) {
  const { nombre, img, precio, colores, codigo } = product;

  const linkTo = `/dashboard/usuario/compras/producto/${paramCase(codigo)}`;

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        <Link to={linkTo} color="inherit" component={RouterLink}>
          <Image alt={nombre} src={img} ratio="1/1" />
        </Link>
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={linkTo} color="inherit" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {nombre.toUpperCase()}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={colores} />

          <Stack direction="row" spacing={0.8}>
            <Typography component="span" sx={{ color: 'info.main', fontSize: '0.95rem' }}>
              {fCurrency(Math.round(precio / 0.93))}
            </Typography>

            <Typography variant="subtitle1">{fCurrency(precio)}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
