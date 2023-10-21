import PropTypes from 'prop-types';
import { Chip, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import ReciboMoreMenu from '../../../recibos/components/ReciboMoreMenu';
const reciboTableHeadLabels = [
  { id: 'id', label: 'Id recibo' },
  { id: 'fecha', label: 'Fecha' },
  { id: 'masDetalles', label: 'Más detalles' },
  { id: 'cliente', label: 'Cliente' },
  { id: 'montoPagado', label: 'Monto Pagado' },
  { id: 'estado', label: 'Estado' },
  { id: 'moreMenu', label: '', alignRight: false },
];

const DPagosTable = ({ pagos, handleAnularRecibo, detalleVenta }) => {
  console.log(pagos);
  return (
    <Table>
      <TableHead>
        <TableRow>
          {reciboTableHeadLabels.map(el => (
            <TableCell align="center" sx={{ px: el.id === 'moreMenu' ? 0 : 1, m: 0 }} key={el.id}>
              {el.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {pagos?.length > 0 &&
          pagos.map(recibo => (
            <TableRow key={recibo.uid}>
              <TableCell align="center">{recibo.reciboId}</TableCell>
              <TableCell align="center">
                {new Date(recibo.fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}
              </TableCell>
              <TableCell align="center">Ver Recibo</TableCell>
              <TableCell align="center">{recibo.cliente}</TableCell>
              <TableCell
                align="center"
                sx={{
                  textDecoration: recibo.estado === 'valido' ? 'none' : 'line-through',
                  color: recibo.estado === 'valido' ? '' : 'error.main',
                }}
              >
                {recibo.adelanto} Bs.
              </TableCell>
              <TableCell align="center">
                <Chip label={recibo.estado} color={recibo.estado === 'valido' ? 'success' : 'error'} />
              </TableCell>
              <TableCell>
                <ReciboMoreMenu
                  detalleVenta={detalleVenta}
                  disabled={Boolean(recibo.estado === 'anulado')}
                  handleAnularRecibo={() => handleAnularRecibo(recibo.uid)}
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default DPagosTable;
DPagosTable.propTypes = {
  pagos: PropTypes.array,
  detalleVenta: PropTypes.array,
  handleAnularRecibo: PropTypes.func,
};
