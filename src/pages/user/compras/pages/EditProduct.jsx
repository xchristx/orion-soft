import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../../redux/slices/compras';
// routes
// hooks
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import ProductNewForm from '../components/compra-especial/ProductNewForm';

const NuevaCompraEspecial = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { nombre } = useParams();
  const { products } = useSelector(state => state.compras);
  const isEdit = pathname.includes('edit');
  const currentProduct = products.find(product => paramCase(product.codigo) === nombre);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Page title="Especial">
      <Container maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading="Historial de compras"
          links={[
            { name: 'Dashboard', href: '/dashboard/usuario' },
            {
              name: 'Compras',
              href: '/dashboard/usuario/compras/nuevo',
            },
            { name: 'Nuevo-Especial' },
          ]}
        />

        <ProductNewForm isEdit={isEdit} currentProduct={currentProduct} />
      </Container>
    </Page>
  );
};

export default NuevaCompraEspecial;
