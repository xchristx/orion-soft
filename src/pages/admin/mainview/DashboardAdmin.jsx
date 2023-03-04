import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// components
import { ModuleCards } from '../../../components/module-cards/ModuleCards';
// sections

// ----------------------------------------------------------------------

export const DashboardAdmin = () => {
  return (
    <>
      <Helmet>
        <title> Dashboard de Administrador | Inicio </title>
      </Helmet>

      <Container maxWidth="xl">
        <ModuleCards />
      </Container>
    </>
  );
};
/**
 * TODO: Change hard-coded module names for locale variable ones
 * @returns {Component} Big Card Buttons for modules
 */
