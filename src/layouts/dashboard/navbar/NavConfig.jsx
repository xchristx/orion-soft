// components
import SvgColor from '../../../components/svg-color/SvgColor';

// ----------------------------------------------------------------------

const icon = (name, size = 1) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: size, height: size }} />;

const navConfig = size => [
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Administración',
    items: [
      // // MANAGEMENT : COMPRAS
      // {
      //   title: 'Compras',
      //   path: '/dashboard/usuario/compras',
      //   icon: icon('ic_cart', size),
      //   children: [
      //     { title: 'nuevo pedido', path: '/dashboard/usuario/compras/nuevo' },
      //     { title: 'historial', path: '/dashboard/usuario/compras/historial' },
      //     { title: 'nuevo pedido especial', path: '/dashboard/usuario/compras/especial' },
      //   ],
      // },

      // MANAGEMENT : VENTAS
      {
        title: 'Ventas',
        path: '/dashboard/usuario/ventas',
        icon: icon('ic_ecommerce', size),
        children: [
          { title: 'nueva venta', path: '/dashboard/usuario/ventas/nuevo' },
          { title: 'historial', path: '/dashboard/usuario/ventas/historial' },
          { title: 'recibos', path: '/dashboard/usuario/ventas/recibos' },
        ],
      },

      // MANAGEMENT : BLOG
      {
        title: 'Inventario',
        path: '/dashboard/usuario/inventario/productos',
        icon: icon('ic_inventory', size),
        children: [{ title: 'productos', path: '/dashboard/usuario/inventario/productos' }],
      },

      { title: 'Clientes', path: '/dashboard/usuario/clientes', icon: icon('ic_user', size) },
      { title: 'Proveedores', path: '/dashboard/usuario/proveedores', icon: icon('ic_proveedores', size) },
    ],
  },
];

export default navConfig;
