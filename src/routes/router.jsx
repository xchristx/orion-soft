import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard/DashboardLayout';
// Guards
import AuthGuard from '../guards/AuthGuard';
// Components
import LoadingScreen from '../components/LoadingScreen';
import DashboardUser from '../pages/user/mainview/Mainview';
import { ToPrint } from '../pages/user/ventas/pages/historial/components/imprimirRecibo/Imprimir';

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
            <Route index element={<VentasMemu />} />
            <Route path="historial" element={<Ventas />} />
            <Route path="recibos" element={<Recibos />} />
            <Route path="imprimir" element={<ToPrint />} />
          </Route>
          {/* <Route path="compras">
            <Route path="nuevo" element={<NuevaCompra />} />
            <Route path="producto/:nombre" element={<ProductDetails />} />
            <Route path="historial" element={<Historial />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="especial" element={<NuevaCompraEspecial />} />
          </Route> */}
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

// Ventas
const VentasMemu = Loadable(lazy(() => import('../pages/user/ventas/VentasMenu')));
const Ventas = Loadable(lazy(() => import('../pages/user/ventas/pages/historial/HistorialVentas')));
const Recibos = Loadable(lazy(() => import('../pages/user/ventas/pages/recibos/Recibos')));

// auth
const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
// Compras
// const NuevaCompra = Loadable(lazy(() => import('../pages/user/compras/pages/NuevaCompra')));
// const Historial = Loadable(lazy(() => import('../pages/user/compras/pages/Historial')));
// const ProductDetails = Loadable(lazy(() => import('../pages/user/compras/pages/ProductDetails')));
// const Checkout = Loadable(lazy(() => import('../pages/user/compras/pages/Checkout')));
// const NuevaCompraEspecial = Loadable(lazy(() => import('../pages/user/compras/pages/NuevaCompraEspecial')));

const Clientes = Loadable(lazy(() => import('../pages/user/clientes/Clientes')));
const Proveedores = Loadable(lazy(() => import('../pages/user/proveedores/Proveedores')));
const Products = Loadable(lazy(() => import('../pages/user/product/Products')));

const Page404 = Loadable(lazy(() => import('../pages/Page404')));
