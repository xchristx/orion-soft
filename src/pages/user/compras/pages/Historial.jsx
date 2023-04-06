import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Card, Table, TableRow, TableBody, TableCell, Container, TableContainer, TablePagination, Chip } from '@mui/material';
// redux
// import { useDispatch, useSelector } from '../../../redux/store';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';
// hooks
// components
import Page from '../../../../components/Page';
import Label from '../../../../components/Label';
import Scrollbar from '../../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { HistoryListHead, HistoryListToolbar, HistoryMoreMenu } from '../components/historial';

// import { getProducts } from '../../../redux/slices/product';
import { useSelector } from 'react-redux';
import WatchComents from '../components/historial/WatchComents';
import WatchDetail from '../components/historial/WatchDetail';
// sections

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'fecha', label: 'Fecha', alignRight: false },
  { id: 'estado', label: 'Estado', alignRight: false },
  { id: 'cantidad', label: 'Cantidad', alignRight: false },
  { id: 'monto', label: 'Monto', alignRight: false },
  { id: 'detalles', label: 'Detalles', alignRight: false },
  { id: 'urgente', label: 'Urgente', alignRight: false },
  { id: 'comentarios', label: 'Comentarios', alignRight: false },
  { id: '', label: '', alignRight: false },
];

// ----------------------------------------------------------------------

export default function EcommerceProductList() {
  const theme = useTheme();
  const { historial, order, orderBy } = useSelector(s => s.product.historial);
  // const dispatch = useDispatch();
  const [historialList, setHistorialList] = useState(historial);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openComents, setOpenComents] = useState(-1);
  const [openDetails, setOpenDetails] = useState(-1);

  useEffect(() => {
    console.log(historial);
  }, [historial]);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteProducts = selected => {
    const deleteProducts = historialList.filter(product => !selected.includes(product.name));
    setSelected([]);
    setHistorialList(deleteProducts);
  };

  const handleChangeExpand = panel => {
    setOpenComents(panel);
  };
  const handleChangeExpandDetail = panel => {
    setOpenDetails(panel);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - historialList.length) : 0;

  const filteredProducts = applySortFilter(historialList, getComparator(order, orderBy), '');

  return (
    <Page title="Ecommerce: Product List">
      <Container maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading="Historial de compras"
          links={[
            { name: 'Dashboard', href: '/dashboard/usuario' },
            {
              name: 'Compras',
              href: '/dashboard/usuario/compras/nuevo',
            },
            { name: 'Lista' },
          ]}
        />

        <Card>
          <HistoryListToolbar numSelected={selected.length} onDeleteProducts={() => handleDeleteProducts(selected)} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <HistoryListHead headLabel={TABLE_HEAD} />

                <TableBody>
                  {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                    const { uid, fecha, cantidad, totalIva, totalSinIva, estado, urgente, comentarios, products } = row;

                    return (
                      <TableRow hover key={uid} tabIndex={-1} role="checkbox">
                        <TableCell align="center">{fDate(fecha)}</TableCell>
                        <TableCell align="center">
                          <Label
                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            color={
                              (estado.estado === 'pAceptar'
                                ? 'warning'
                                : estado.estado === 'aceptado'
                                ? 'info'
                                : estado.estado === 'recibido'
                                ? 'success'
                                : 'error') ||
                              (estado.estado === 'enProceso' && 'warning') ||
                              'success'
                            }
                          >
                            {estado.estado ? sentenceCase(estado.estado) : ''}
                          </Label>
                        </TableCell>
                        <TableCell align="center">{cantidad}</TableCell>

                        <TableCell align="center">
                          <Label value={totalIva + totalSinIva}>{fCurrency(totalSinIva + totalIva)}</Label>
                        </TableCell>
                        <TableCell align="center">
                          <WatchDetail
                            id={i}
                            open={openDetails}
                            setOpen={setOpenDetails}
                            product={products}
                            handleChangeExpand={handleChangeExpandDetail}
                            other={{ ...row }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Chip label={urgente ? 'Sí' : 'No'} color={urgente ? 'error' : 'default'} variant="contained" />
                        </TableCell>
                        <TableCell align="center">
                          {comentarios ? (
                            <WatchComents
                              open={openComents}
                              handleChangeExpand={handleChangeExpand}
                              setOpen={setOpenComents}
                              comment={comentarios}
                              id={i}
                            />
                          ) : (
                            <span>No</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <HistoryMoreMenu estado={estado.estado} uid={uid} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={historialList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, value) => setPage(value)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    return array.filter(_product => _product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }

  return stabilizedThis.map(el => el[0]);
}
