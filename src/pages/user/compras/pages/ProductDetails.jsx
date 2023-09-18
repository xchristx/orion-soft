import { sentenceCase } from 'change-case';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Grid, Divider, Container, Typography } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getProduct, addCart } from '../../../../redux/slices/compras';

// components
import Page from '../../../../components/Page';
import Iconify from '../../../../components/Iconify';
import { SkeletonProduct } from '../../../../components/skeleton';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import { ProductDetailsSummary, ProductDetailsCarousel } from '../components/product-detail';

import Markdown from '../components/Markdown';
import CartWidget from '../components/CartWidget';

// ----------------------------------------------------------------------

const PRODUCT_DESCRIPTION = [
  {
    title: '100% Cuero',
    description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
    icon: 'ic:round-verified',
  },
  {
    title: '10 Day Replacement',
    description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
    icon: 'eva:clock-fill',
  },
  {
    title: 'Year Warranty',
    description: 'Cotton candy gingerbread cake I love sugar sweet.',
    icon: 'ic:round-verified-user',
  },
];

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  justifyContent: 'center',
  height: theme.spacing(8),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`,
}));

// ----------------------------------------------------------------------

export default function ProductDetails() {
  const dispatch = useDispatch();
  const { nombre } = useParams();
  const { product, error, checkout } = useSelector(state => state.compras);

  useEffect(() => {
    dispatch(getProduct(nombre));
  }, [dispatch, nombre]);

  const handleAddCart = product => {
    dispatch(addCart(product));
  };

  if (!product || !product.colores) {
    return <h1>Cargando....</h1>;
  }

  return (
    <Page title="Detalle de producto">
      <Container maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading={product.nombre}
          links={[
            { name: 'Dashboard', href: '/dashboard/usuario' },
            {
              name: 'Compras',
              href: '/dashboard/usuario/compras/nuevo',
            },
            { name: sentenceCase(nombre) },
          ]}
        />

        <CartWidget />

        {product && (
          <>
            <Card>
              <Grid container>
                <Grid item xs={12} md={4} lg={4}>
                  <ProductDetailsCarousel product={product} />
                </Grid>
                <Grid item xs={12} md={8} lg={8}>
                  <ProductDetailsSummary product={product} cart={checkout.cart} onAddCart={handleAddCart} />
                </Grid>
              </Grid>
            </Card>

            <Grid container sx={{ my: 8 }}>
              {PRODUCT_DESCRIPTION.map(item => (
                <Grid item xs={12} md={4} key={item.title}>
                  <Box sx={{ my: 2, mx: 'auto', maxWidth: 280, textAlign: 'center' }}>
                    <IconWrapperStyle>
                      <Iconify icon={item.icon} width={36} height={36} />
                    </IconWrapperStyle>
                    <Typography variant="subtitle1" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{item.description}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Card>
              <TabContext value="1">
                <Divider />

                <TabPanel value="1">
                  <Box sx={{ p: 3 }}>
                    {
                      // eslint-disable-next-line
                      <Markdown children={product.descripcion} />
                    }
                  </Box>
                </TabPanel>
              </TabContext>
            </Card>
          </>
        )}
        {!product && <SkeletonProduct />}

        {error && <Typography variant="h6">404 Product not found</Typography>}
      </Container>
    </Page>
  );
}
