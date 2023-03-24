export const customProduct = [
  {
    modelBase: 303,
    variant: 'normal',
    cuero: 'oscaria grabado',
    colores: ['negro, café'],
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
    nombre: '304',
    modeloBase: '303',
    codigo: `${this.nombre}randomCode`,
    descripcion: 'lorem ipsum',
    variante: 'estandar',
    forro: 'castor',
    cuero: 'oscaria grabado',
    colores: ['café', 'negro'],
    costra: true,
    dielectrico: false,
    acero: true,
    aleteado: true,
    plantillaAcero: false,
    plantillaPoliuretano: false,
    plantillaCastor: false,
    goma: 'RBBM2',
    precio: 136,
    precio_iva: this.precio * 0.93,
    img: '',
    adicional: '',
    disponible: 12,
    tallas: [{ 35: 2 }, { 38: 4 }, { 40: 5 }, { 41: 1 }],
  },
  {
    nombre: '304 Max Arena',
    modeloBase: '303',
    codigo: `${this.nombre}randomCode`,
    descripcion: 'lorem ipsum',
    variante: 'maximus arena',
    cuero: 'oscaria grabado',
    forro: 'castor',
    colores: ['café', 'negro'],
    costra: true,
    dielectrico: false,
    acero: true,
    aleteado: true,
    plantillaAcero: false,
    plantillaPoliuretano: false,
    plantillaCastor: false,
    goma: 'MAX ARENA',
    precio: 142,
    precio_iva: this.precio * 0.93,
    img: '',
    adicional: '',
    disponible: 12,
    tallas: [{ 35: 2 }, { 38: 4 }, { 40: 5 }, { 41: 1 }],
  },
  {
    nombre: '303 económico',
    codigo: `${this.nombre}randomCode`,
    descripcion: 'lorem ipsum',
    modeloBase: '303',
    variante: 'economico',
    cuero: 'oscaria grabado',
    forro: '',
    colores: ['café', 'negro'],
    costra: false,
    acero: false,
    aleteado: false,
    plantillaAcero: false,
    plantillaPoliuretano: false,
    plantillaCastor: false,
    goma: 'RBBM2',
    precio: 115,
    precio_iva: this.precio * 0.93,
    img: '',
    adicional: 'lengueta castor',
    disponible: 12,
    tallas: [{ 35: 2 }, { 38: 4 }, { 40: 5 }, { 41: 1 }],
  },
  {
    nombre: 'Táctico',
    modeloBase: '510',
    codigo: `${this.nombre}randomCode`,
    descripcion: 'lorem ipsum',
    variante: 'estandar',
    cuero: 'hunting',
    forro: 'castor',
    colores: ['arena'],
    costra: true,
    acero: true,
    dielectrico: false,
    aleteado: false,
    plantillaAcero: false,
    plantillaPoliuretano: false,
    plantillaCastor: true,
    goma: 'MAX ARENA',
    precio: 159,
    precio_iva: this.precio * 0.93,
    img: '',
    adicional: '',
    disponible: 12,
    tallas: [{ 35: 2 }, { 38: 4 }, { 40: 5 }, { 41: 1 }],
  },
  {
    nombre: '407 dieléctrico',
    modeloBase: '407',
    codigo: `${this.nombre}randomCode`,
    descripcion: 'lorem ipsum',
    variante: 'dieléctrico',
    cuero: 'liso industrial',
    forro: 'cuero nappa',
    colores: ['bic negro/cafe', 'café', 'negro', 'canela'],
    costra: true,
    dielectrico: true,
    acero: false,
    aleteado: false,
    plantillaAcero: false,
    plantillaPoliuretano: true,
    plantillaCastor: true,
    goma: 'RBBM2',
    precio: 185,
    precio_iva: this.precio * 0.93,
    img: '',
    adicional: 'cuello de cuero, lengueta cuero suave, lengueta acolchada',
    disponible: 12,
    tallas: [{ 35: 2 }, { 38: 4 }, { 40: 5 }, { 41: 1 }],
  },
];
