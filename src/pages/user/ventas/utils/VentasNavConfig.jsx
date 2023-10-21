// components

import SvgColor from '../../../../components/svg-color/SvgColor';

// ----------------------------------------------------------------------

const icon = (name, size = 1) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: size, height: size }} />;

const VentasNavConfig = size => [
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Administración',
    items: [
      // { title: 'Nueva venta', path: '/dashboard/usuario/ventas', icon: icon('ic_ecommerce', size) },
      { title: 'Historial', path: '/dashboard/usuario/ventas/historial', icon: icon('ic_recordhistory', size) },
      { title: 'Recibos', path: '/dashboard/usuario/ventas/recibos', icon: icon('ic_receipt', size) },
    ],
  },
];

export default VentasNavConfig;
