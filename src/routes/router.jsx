import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard/DashboardLayout';
// Guards
import AuthGuard from '../guards/AuthGuard';
// Components
import LoadingScreen from '../components/LoadingScreen';
import DashboardUser from '../pages/user/mainview/Mainview';
import Historial from '../pages/user/compras/pages/Historial';

// ----------------------------------------------------------------------

const Loadable = Component => props => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthGuard>
            <LoginPage />
          </AuthGuard>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
        }
      >
        <Route path="usuario">
          <Route index element={<DashboardUser />} />
          <Route path="ventas">
            <Route index element={<Ventas />} />
          </Route>
          <Route path="compras">
            <Route path="nuevo" element={<NuevaCompra />} />
            <Route path="historial" element={<Historial />} />
          </Route>
          <Route path="clientes" element={<Clientes />} />
          <Route path="proveedores" element={<Proveedores />} />
          <Route path="inventario">
            <Route path="productos" element={<Products />} />
          </Route>
        </Route>
      </Route>

      <Route
        path="register"
        element={
          <AuthGuard>
            <Register />
          </AuthGuard>
        }
      />

      <Route path="404" element={<Page404 />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const Ventas = Loadable(lazy(() => import('../pages/user/ventas/Ventas')));
const NuevaCompra = Loadable(lazy(() => import('../pages/user/compras/pages/NuevaCompra')));
const Clientes = Loadable(lazy(() => import('../pages/user/clientes/Clientes')));
const Proveedores = Loadable(lazy(() => import('../pages/user/proveedores/Proveedores')));
const Products = Loadable(lazy(() => import('../pages/user/product/Products')));
