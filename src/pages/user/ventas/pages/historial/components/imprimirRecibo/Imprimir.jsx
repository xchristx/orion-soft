import PropTypes from 'prop-types';
import { Box, Grid, MenuItem, Stack, Typography } from '@mui/material';

import logo from '../../../../../../../../public/assets/images/logoOrion.jpg';

import { forwardRef, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Iconify from '../../../../../../../components/Iconify';
import { monedaLiteral } from '../../../../../../../utils/monedaANum';
import { useSelector } from 'react-redux';
import DVTable from '../detalleVentaDialog/DVTable';
import ExtractoPagos from './ExtractoDePagos';
const ICON = {
  mr: 2,
  width: 20,
  height: 20,
};
export default function ImprimirVentas({ recibo, ventaUid }) {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <MenuItem onClick={handlePrint} sx={{ color: 'success.main' }}>
        <Iconify icon={'ion:print-outline'} sx={{ ...ICON }} />
        {'Imprimir'}
      </MenuItem>
      <div style={{ display: 'none' }}>
        <ToPrint recibo={recibo} ref={componentRef} ventaUid={ventaUid} />
      </div>
    </div>
  );
}
ImprimirVentas.propTypes = {
  recibo: PropTypes.object,
  ventaUid: PropTypes.string,
};

const titleStyle = { fontSize: '16px', color: '#000', fontWeight: 600 };
const subTileStyle = { fontSize: '14px', color: '#5E6470', lineHeight: '15px' };
export const ToPrint = forwardRef(({ recibo, ventaUid }, ref) => {
  const data = !recibo
    ? (recibo = {
        adelanto: 1500.5,
        cantidadTotal: 1,
        cliente: 'Juan pablo',
        concepto: 'botines de seguridad punta de acero',
        detalleRecibo: '123',
        estado: 'valido',
        fecha: 1697921812437,
        metodoPago: ['EFECTIVO'],
        montoTotal: 140,
        reciboId: 23,
        responsable: 'Sebastian Corrales',
        uid: '2a3c18cf-4439-43ec-ba33-8376d01d662b',
        ventaId: 31,
      })
    : recibo;

  const { data: ventas } = useSelector(s => s.ventas);

  const filterVentas = ventas.find(el => el.id === ventaUid);

  return (
    <div ref={ref}>
      <Box sx={{ width: '21.59cm', height: '27.94cm', padding: '0.5cm', justifyContent: 'space-between' }}>
        {recibo.estado === 'anulado' && (
          <Typography component="h1" sx={{ fontSize: 100, position: 'absolute', textAlign: 'center', color: 'red', top: '20%' }}>
            NULO NULO NULO
          </Typography>
        )}
        <Grid container spacing={5} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid item xs={9}>
            <Stack direction="row" spacing={2}>
              <img src={logo} alt="Orion Logo" style={{ height: '100px' }} />
              <Stack>
                <Typography sx={titleStyle}>CALZADOS ORION </Typography>
                <Typography sx={subTileStyle}>Cel.: 6262 9000 </Typography>
                <Typography sx={subTileStyle}>
                  Calle Manuel Mariano Cossío entre Litoral y av. 9 de abril Zona: Las Cuadras, Cochabamba{' '}
                </Typography>
                <Typography sx={subTileStyle}>www.facebook.com/calzados.orion</Typography>
                <Typography sx={subTileStyle}>calzadosorion@gmail.com</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Stack>
              <Typography sx={{ fontWeight: 600, fontSize: 33, color: '#5E6470', lineHeight: '20px' }}>RECIBO</Typography>
              <Typography sx={{ fontSize: 20, color: '#5E6470' }}>No. {data.reciboId}</Typography>
              <Typography sx={{ ...titleStyle, lineHeight: '20px', fontSize: '14px', color: '#5E6470' }}>
                Fecha:{' '}
                <Box component="span" sx={subTileStyle}>
                  {new Date(data.fecha).toLocaleString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}
                </Box>
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={0}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            borderRadius: '12px',
            border: '0.5px solid var(--gray-100, #D7DAE0)',
            background: '#fff',
            padding: '20px',
            mt: 3,
          }}
        >
          <Grid item xs={12} sx={{ mt: '8px' }}>
            <Typography sx={titleStyle}>
              Recibí de :{' '}
              <Box component="span" sx={subTileStyle}>
                {data.cliente.toUpperCase()}
              </Box>{' '}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={titleStyle}>
              La suma de :{' '}
              <Box component="span" sx={subTileStyle}>
                {`${data.adelanto} Bs. (${monedaLiteral(data.adelanto)})`}
              </Box>{' '}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={titleStyle}>
              Por concepto de:{' '}
              <Box component="span" sx={subTileStyle}>
                {data.concepto}
              </Box>{' '}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={titleStyle}>
              Método de pago:{' '}
              <Box component="span" sx={subTileStyle}>
                {data.metodoPago.join(', ')}
              </Box>{' '}
            </Typography>
          </Grid>
          {data.detalleRecibo && (
            <Grid item xs={12}>
              <Typography sx={titleStyle}>
                Detalle:{' '}
                <Box component="span" sx={subTileStyle}>
                  {data.detalleRecibo}
                </Box>{' '}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12} sx={{ mt: 4 }}>
            <Typography>Detalle</Typography>
          </Grid>
          <Grid item xs={12}>
            <DVTable
              cantidadTotal={filterVentas.cantidadTotal}
              montoTotal={filterVentas.montoTotal}
              detalleVenta={filterVentas.detalleVenta}
              totalAdelantos={filterVentas.adelanto}
              showProcedencia={false}
            />
          </Grid>
          <Grid item xs={12} mt={'30px'}>
            {' '}
            <Typography> Resumen de pagos:</Typography>{' '}
          </Grid>
          <Grid item xs={12} sx={{ mt: '10px' }}>
            <ExtractoPagos pagos={filterVentas.recibosVenta.filter(el => el.estado === 'valido')} />
          </Grid>
        </Grid>
        <Box
          sx={{
            width: '100%',
          }}
        ></Box>
      </Box>
    </div>
  );
});
ToPrint.propTypes = {
  recibo: PropTypes.object,
  ventaUid: PropTypes.string,
};
