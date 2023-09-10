export const recibosFormater = ({
  metodoPago,
  reciboId,
  idRecibo,
  fecha,
  cliente,
  adelanto,
  concepto,
  montoTotal,

  detalleRecibo,
  detalleVenta,
  cantidadTotal,
}) => {
  return {
    reciboId: reciboId.id,
    idRecibo,
    fecha,
    cliente,
    adelanto,
    montoTotal,
    detalleRecibo,
    detalleVenta,
    metodoPago,
    concepto,
    cantidadTotal,
  };
};
