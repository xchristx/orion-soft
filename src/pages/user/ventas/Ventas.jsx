import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { ModuleCards } from '../../../components/module-cards';
import VentasNavConfig from './utils/VentasNavConfig';

const Ventas = () => {
  return (
    <>
      <Helmet>
        <title> Dashboard | Inicio </title>
      </Helmet>

      <Container maxWidth="xl">
        <ModuleCards navConfig={VentasNavConfig} size={100} />
      </Container>
    </>
  );
};

export default Ventas;
