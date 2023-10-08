export const ventasFormater = ({
  metodoPago,
  ventaId,
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
    ventaId: ventaId.id,
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
