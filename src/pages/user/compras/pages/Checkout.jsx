import { useEffect, useState } from 'react';
import sum from 'lodash/sum';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// uid
import { v4 as uuid } from 'uuid';
// @mui
import { Grid, Card, Button, CardHeader, Typography, Container, Alert } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { deleteCart, getCart, resetCart, setNewHistorialData } from '../../../../redux/slices/product';
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
  const navigate = useNavigate();

  const { checkout } = useSelector(state => state.product);

  const { cart, total, subtotal, iva } = checkout;

  const totalItems = sum(cart.map(item => item.cantidad));

  const isEmptyCart = cart.length === 0;
  const isMountedRef = useIsMountedRef();

  const [error, setError] = useState(false);
  const [adelanto, setAdelanto] = useState('');
  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState('');

  const handleDeleteCart = productId => {
    dispatch(deleteCart(productId));
  };

  const handleSuccessOrder = () => {
    const data = {
      uid: uuid(),
      fecha: Date.now(),
      totalIva: iva,
      totalSinIva: Math.abs(iva - total),
      estado: { estado: 'pAceptar', responsable: '' },
      cantidad: totalItems,
      fechaPrevista: '',
      products: cart.map(el => ({ ...el, estado: { estado: 'pAceptar', responsable: '' } })),
      adelanto,
      urgente: checked,
      comentarios: message,
    };
    dispatch(setNewHistorialData(data));
    dispatch(resetCart());
    setAdelanto('');
    setMessage('');
    setChecked(false);
    navigate('/dashboard/usuario/compras/historial');
  };

  useEffect(() => {
    if (isMountedRef.current) {
      dispatch(getCart(cart));
    }
  }, [dispatch, isMountedRef, cart]);

  return (
    <Page title="Finalizar pedido">
      <Container maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading="Finalizar Compra"
          links={[
            { name: 'Dashboard', href: '/dashboard/usuario' },
            {
              name: 'Compras',
              href: '/dashboard/usuario/compras/nuevo',
            },
            { name: 'Finalizar Compra' },
          ]}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardHeader
                title={
                  <Typography variant="h6">
                    Carrito
                    <Typography component="span" sx={{ color: 'text.secondary' }}>
                      &nbsp;({totalItems} item)
                    </Typography>
                    <Typography component="span" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                      {' '}
                      &nbsp; &nbsp; *Items con el precio en fondo azul incluyen IVA
                    </Typography>
                  </Typography>
                }
                sx={{ mb: 3 }}
              />

              {!isEmptyCart ? (
                <Scrollbar>
                  <CheckoutProductList products={cart} onDelete={handleDeleteCart} />
                </Scrollbar>
              ) : (
                <EmptyContent
                  title="El carrito esta vacío"
                  description="Parece que todavia no has agregado ningún item"
                  img="https://us.123rf.com/450wm/cthoman/cthoman1507/cthoman150703771/42751102-una-ilustraci%C3%B3n-de-dibujos-animados-de-un-poco-de-yak-con-una-expresi%C3%B3n-triste.jpg?ver=6"
                />
              )}
            </Card>

            <Button
              color="inherit"
              component={RouterLink}
              to={'/dashboard/usuario/compras/nuevo'}
              startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
            >
              Seleccionar más articulos
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            <CheckoutSummary
              total={total}
              subtotal={subtotal}
              iva={iva}
              error={error}
              setError={setError}
              adelanto={adelanto}
              setAdelanto={setAdelanto}
              checked={checked}
              setChecked={setChecked}
              message={message}
              setMessage={setMessage}
            />
            {!!error && (
              <Alert sx={{ mb: 1 }} severity="error">
                Adelanto no puede ser superior al monto total
              </Alert>
            )}
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              disabled={cart.length === 0 || error}
              onClick={handleSuccessOrder}
            >
              Realizar pedido
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------
