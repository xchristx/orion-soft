import { useEffect } from 'react';
import sum from 'lodash/sum';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Grid, Card, Button, CardHeader, Typography, Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { deleteCart, increaseQuantity, decreaseQuantity, getCart, setTallas } from '../../../../redux/slices/product';
// components
import Scrollbar from '../../../../components/Scrollbar';
import EmptyContent from '../../../../components/EmptyContent';
import Iconify from '../../../../components/Iconify';
import Page from '../../../../components/Page';
import CheckoutSummary from '../components/checkout/CheckoutSummary';
import CheckoutProductList from '../components/checkout/CheckoutProductList';
// hooks
import useIsMountedRef from '.././../../../hooks/useIsMountedRef';
// components
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

export default function Checkout() {
  const dispatch = useDispatch();

  const { checkout } = useSelector(state => state.product);

  const { cart, total, subtotal } = checkout;

  const totalItems = sum(cart.map(item => item.quantity));

  const isEmptyCart = cart.length === 0;
  const isMountedRef = useIsMountedRef();

  const handleDeleteCart = productId => {
    dispatch(setTallas({ idProd: productId, tallas: [], add: false }));
    dispatch(deleteCart(productId));
  };

  const handleIncreaseQuantity = productId => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = productId => {
    dispatch(decreaseQuantity(productId));
  };

  useEffect(() => {
    if (isMountedRef.current) {
      dispatch(getCart(cart));
    }
  }, [dispatch, isMountedRef, cart]);

  return (
    <Page title="Ecommerce: Checkout">
      <Container maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading="Checkout"
          links={[
            { name: 'Dashboard', href: '/dashboard/usuario' },
            {
              name: 'Compras',
              href: '/dashboard/usuario/compras/nuevo',
            },
            { name: 'Checkout' },
          ]}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardHeader
                title={
                  <Typography variant="h6">
                    Card
                    <Typography component="span" sx={{ color: 'text.secondary' }}>
                      &nbsp;({totalItems} item)
                    </Typography>
                  </Typography>
                }
                sx={{ mb: 3 }}
              />

              {!isEmptyCart ? (
                <Scrollbar>
                  <CheckoutProductList
                    products={cart}
                    onDelete={handleDeleteCart}
                    onIncreaseQuantity={handleIncreaseQuantity}
                    onDecreaseQuantity={handleDecreaseQuantity}
                  />
                </Scrollbar>
              ) : (
                <EmptyContent
                  title="Cart is empty"
                  description="Look like you have no items in your shopping cart."
                  img="https://paisajesespanoles.es/images/emptycart.png"
                />
              )}
            </Card>

            <Button color="inherit" component={RouterLink} to={'/'} startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}>
              Seleccionar más articulos
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            <CheckoutSummary total={total} subtotal={subtotal} />
            <Button fullWidth size="large" type="submit" variant="contained" disabled={cart.length === 0} onClick={() => alert('asd')}>
              Realizar pedido
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------
