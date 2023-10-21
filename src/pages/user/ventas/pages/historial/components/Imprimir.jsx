import { Box, Grid, MenuItem, Typography } from '@mui/material';

import logo from '../../../../../../../public/assets/images/logoOrion.jpg';

import { forwardRef, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Iconify from '../../../../../../components/Iconify';

export default function ImprimirVentas() {
  return <PrintButton />;
}
const ICON = {
  mr: 2,
  width: 20,
  height: 20,
};
export const ToPrint = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      {/* Tu componente de Material-UI que deseas imprimir */}
      <Box sx={{ border: '1px solid red', width: '21.59cm', height: '27.94cm', padding: '0.5cm', justifyContent: 'space-between' }}>
        <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 600, fontSize: 40, color: '#000' }}>RECIBO</Typography>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center  ' }}>
            <Typography>Nº500</Typography>
          </Grid>
          <Grid item xs={4}>
            <img src={logo} alt="Orion Logo" style={{ height: '100px', margin: ' 0 auto' }} />
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
      </Box>
    </div>
  );
});

function PrintButton() {
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
        <ToPrint ref={componentRef} />
      </div>
    </div>
  );
}
