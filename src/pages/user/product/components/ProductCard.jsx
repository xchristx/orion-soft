import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
// routes
// utils
// components
import Image from '../../../../components/Image';
// import { ColorPreview } from '../../../../components/color-utils';

// ----------------------------------------------------------------------

ProductCard.propTypes = {
  product: PropTypes.object,
};

export function ProductCard({ product }) {
  const { nombre, img, precio } = product;

  const linkTo = `/dashboard/usuario`;

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
          {/* <ColorPreview colors={'cafe'} /> */}

          <Stack direction="row" spacing={0.8}>
            <Typography component="span" sx={{ color: 'info.main', fontSize: '0.95rem' }}>
              {Math.round(precio.facturado / 0.93)}
            </Typography>

            <Typography variant="subtitle1">{precio.facturado}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
