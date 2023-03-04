import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// components
import { ModuleCards } from '../../../components/module-cards';
// sections

// ----------------------------------------------------------------------

export default function DashboardUser() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Inicio </title>
      </Helmet>

      <Container maxWidth="xl">
        <ModuleCards />
      </Container>
    </>
  );
}
/**
 * TODO: Change hard-coded module names for locale variable ones
 * @returns {Component} Big Card Buttons for modules
 */
