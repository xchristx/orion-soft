import PropTypes from 'prop-types';
import { Chip, TableBody, TableCell, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import VentasMoreMenu from './VentaMoreMenu';
import { DetalleVentaDialog } from './detalleVentaDialog/DetalleVentaDialog';
import { deleteVenta } from '../../../../../../redux/actions/ventasActions';
import AddEditRecibo from '../../recibos/components/AddEditRecibo';
import { useState } from 'react';

export default function VentaTableBody({ fRecords, page, rowsPerPage, emptyRows }) {
  const dispatch = useDispatch();
  const [openRecibo, setOpenRecibo] = useState('');

  const onCloseRecibo = () => setOpenRecibo('');
  const handleOpenRecibo = id => setOpenRecibo(id);

  const { data: clientes } = useSelector(s => s.clientes);

  const handleDelete = async id => {
    dispatch(deleteVenta(id));
  };

  return (
    <>
      <TableBody>
        {fRecords?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
          const { id, ventaId, fecha, cliente, adelanto, montoTotal, detalleVenta, cantidadTotal, recibosVenta } = row;
          const saldo = parseFloat(montoTotal) - parseFloat(adelanto);
          const clienteDB = clientes?.find(el => cliente.uid === el.uid);
          const clienteToRender = clienteDB || cliente;
          console.log(cliente);

          const estadoPagoLabel =
            saldo === 0
              ? { label: 'Pagado', color: 'success' }
              : saldo === parseFloat(montoTotal)
              ? { label: 'No pagado', color: 'error' }
              : saldo < parseFloat(montoTotal)
              ? { label: 'Pago parcial', color: 'warning' }
              : { label: 'Pago parcial', color: 'warning' };
          return (
            <TableRow hover key={id} tabIndex={-1}>
              <TableCell align="center">{ventaId || '---'}</TableCell>
              <TableCell align="center">
                {new Date(fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}
              </TableCell>
              <TableCell align="center">{clienteToRender.nombre || '---'}</TableCell>
              <TableCell align="center">{adelanto.toLocaleString('es-MX')}</TableCell>

              <TableCell align="center">{montoTotal.toLocaleString('es-MX')}</TableCell>
              <TableCell align="center">{(montoTotal - adelanto).toLocaleString('es-MX')}</TableCell>
              <TableCell align="center">{<Chip label="No entregado" />}</TableCell>
              <TableCell align="center">{<Chip label={estadoPagoLabel.label} color={estadoPagoLabel.color} />}</TableCell>
              <TableCell align="center">
                <DetalleVentaDialog
                  detalleVenta={detalleVenta}
                  totalAdelantos={adelanto}
                  montoTotal={montoTotal}
                  cantidadTotal={cantidadTotal}
                  pagos={recibosVenta}
                  ventaUid={id}
                  cliente={clienteToRender}
                />{' '}
              </TableCell>

              <TableCell>
                <VentasMoreMenu
                  saldo={saldo}
                  onDelete={() => handleDelete(id)}
                  editInfo={row}
                  handleOpenRecibo={() => handleOpenRecibo(id)}
                />
                <AddEditRecibo
                  open={openRecibo === id}
                  onClose={onCloseRecibo}
                  edit={false}
                  ventaId={ventaId}
                  ventaUid={id}
                  adelantoActual={adelanto}
                  totales={{ saldoActual: saldo, cantidadTotal }}
                  cliente={cliente.nombre + ' ' + cliente.apellido}
                  telefono={cliente.celular}
                />
              </TableCell>
            </TableRow>
          );
        })}
        {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={5} />
          </TableRow>
        )}
      </TableBody>
    </>
  );
}

VentaTableBody.propTypes = {
  isLoading: PropTypes.bool,
  fRecords: PropTypes.array,
  products: PropTypes.array,
  currentFarm: PropTypes.object,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  emptyRows: PropTypes.number,
};
