import { Box, Button, Grid, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { forwardRef, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function ImprimirVentas() {
  return <PrintButton />;
}

const ToPrint = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      {/* Tu componente de Material-UI que deseas imprimir */}
      <Box sx={{ border: '1px solid red' }}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Typography sx={{ fontWeight: 500, fontSize: 50 }}>RECIBO</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>Nº500</Typography>
          </Grid>
          <Grid item xs={12}>
            <BasicTable />
          </Grid>
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
      <Button variant="contained" color="primary" onClick={handlePrint}>
        Imprimir PDF
      </Button>
      <div style={{ display: 'none' }}>
        <ToPrint ref={componentRef} />
      </div>
    </div>
  );
}
