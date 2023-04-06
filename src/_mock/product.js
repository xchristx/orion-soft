export const customProduct = [
  {
    modelBase: 303,
    variant: 'normal',
    cuero: 'oscaria grabado',
    colores: ['#000, #453426'],
    precioBase: 115,
    adicionales: {
      costra: true,
      acero: true,
      aleteado: false,
      graso: false,
    },
  },
];
export const products = [
  {
    id: 1,
    nombre: '304',
    modeloBase: '303',
    codigo: '304OGRBM-FO-A',
    descripcion: 'descripcion del producto.lorem ipsum',
    variante: 'estandar',
    forro: 'castor',
    cuero: 'oscaria grabado',
    colores: ['#453426', '#000'],
    costra: true,
    dielectrico: false,
    acero: true,
    aleteado: true,
    plantillaAcero: false,
    plantillaPoliuretano: false,
    plantillaCastor: false,
    goma: 'RBBM2',
    precio: 136,
    precioIva: 200,
    img: 'https://res.cloudinary.com/dw8jw0zhx/image/upload/v1677762931/orion-soft/303-montalvo.jpg',
    adicional: '',
    disponible: 12,
    tallas: [...Array(13)].map((el, i) => ({ size: i + 34, value: 0 })),
    proveedor: 'jrc',
  },
  {
    id: 2,
    nombre: '304 Max Arena',
    modeloBase: '303',
    codigo: '304OGMA-C-FO-A',
    descripcion: 'descripcion del producto.lorem ipsum',
    variante: 'maximus arena',
    cuero: 'oscaria grabado',
    forro: 'castor',
    colores: ['#453426', '#000'],
    costra: true,
    dielectrico: false,
    acero: true,
    aleteado: true,
    plantillaAcero: false,
    plantillaPoliuretano: false,
    plantillaCastor: false,
    goma: 'MAX ARENA',
    precio: 142,
    precioIva: 200,
    img: 'https://res.cloudinary.com/dw8jw0zhx/image/upload/v1680189288/orion-soft/304-max-arena.jpg',
    adicional: '',
    disponible: 12,
    tallas: [...Array(13)].map((el, i) => ({ size: i + 34, value: 0 })),
    proveedor: 'jrc',
  },
  {
    id: 3,
    nombre: '303 económico',
    codigo: '303OGMN-FI-A',
    descripcion: 'descripcion del producto.lorem ipsum',
    modeloBase: '303',
    variante: 'economico',
    cuero: 'oscaria grabado',
    forro: '',
    colores: ['#453426', '#000'],
    costra: false,
    acero: false,
    aleteado: false,
    plantillaAcero: false,
    plantillaPoliuretano: false,
    plantillaCastor: false,
    goma: 'MAXIMUS NEGRO',
    precio: 115,
    precioIva: 200,
    img: 'https://res.cloudinary.com/dw8jw0zhx/image/upload/v1680189288/orion-soft/303-economic-pantanera.jpg',
    adicional: 'lengueta castor',
    disponible: 12,
    tallas: [...Array(13)].map((el, i) => ({ size: i + 34, value: 0 })),
    proveedor: 'jrc',
  },
  {
    id: 4,
    nombre: 'Táctico',
    modeloBase: '510',
    codigo: '510HHMA-C-FO-A-PLC',
    descripcion: 'descripcion del producto.lorem ipsum',
    variante: 'estandar',
    cuero: 'hunting',
    forro: 'castor',
    colores: ['#e1c699'],
    costra: true,
    acero: true,
    dielectrico: false,
    aleteado: false,
    plantillaAcero: false,
    plantillaPoliuretano: false,
    plantillaCastor: true,
    goma: 'MAX ARENA',
    precio: 159,
    precioIva: 200,
    img: 'https://res.cloudinary.com/dw8jw0zhx/image/upload/v1680189288/orion-soft/tactico.jpg',
    adicional: '',
    disponible: 12,
    tallas: [...Array(13)].map((el, i) => ({ size: i + 34, value: 0 })),
    proveedor: 'jrc',
  },
  {
    id: 5,
    nombre: '407 dieléctrico',
    modeloBase: '407',
    codigo: '407LIRMB-C-FOC-DI-PLP',
    descripcion: 'descripcion del producto.lorem ipsum',
    variante: 'dieléctrico',
    cuero: 'liso industrial',
    forro: 'cuero nappa',
    colores: ['#000', '#453426', '#D2691E'],
    costra: true,
    dielectrico: true,
    acero: false,
    aleteado: false,
    plantillaAcero: false,
    plantillaPoliuretano: true,
    plantillaCastor: true,
    goma: 'RBBM2',
    precio: 185,
    precioIva: 200,
    img: 'https://res.cloudinary.com/dw8jw0zhx/image/upload/v1680189288/orion-soft/407-die-graso.jpg',
    adicional: 'cuello de cuero, lengueta cuero suave, lengueta acolchada',
    disponible: 12,
    tallas: [...Array(13)].map((el, i) => ({ size: i + 34, value: 0 })),
    proveedor: 'jrc',
  },
];
