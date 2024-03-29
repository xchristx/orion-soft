import PropTypes from 'prop-types';

import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';

import Iconify from '../../../../../../components/Iconify';
import useResponsive from '../../../../../../hooks/useResponsive';
import { useEffect, useState } from 'react';
import ProductAddSizesDialog from '../../../../compras/components/product-detail/ProductAddSizesDialog';
import styled from '@emotion/styled';
import { v4 as uuid } from 'uuid';
import Scrollbar from '../../../../../../components/scrollbar/Scrollbar';

const tableHeadLabels = [
  { id: 'detalle', label: 'Detalle' },
  { id: 'precio', label: 'Precio' },
  { id: 'cantidad', label: 'Cantidad' },
  { id: 'subtotal', label: 'Subtotal' },
  { id: 'tallas', label: 'Tallas' },
  { id: 'borrar', label: '' },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.black,
    margin: 0,
    padding: 0,
    paddingLeft: 10,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
    margin: 0,
    padding: 0,
    paddingLeft: 10,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function AddReciboDetails({ edit = false, editInfo, setValue, setTotales }) {
  const [open, setOpen] = useState(false);
  const [openSizesDialog, setOpenSizesDialog] = useState(false);
  const [isEmptySizes, setIsEmptySizes] = useState(false);

  const [sizes, setSizes] = useState([...Array(13)].map((el, i) => ({ size: i + 34, value: 0 })));
  const [precio, setPrecio] = useState({ value: '', hasError: null, errMessage: '' });
  const [detalleProd, setDetalleProd] = useState({ value: '', hasError: null, errMessage: '' });
  const [cantidad, setCantidad] = useState({ value: '', hasError: null, errMessage: '' });
  const [hasErros, setHasErros] = useState(true);
  const [errorsListener, setErrorsListener] = useState(false);

  const [cantidadTotal, setCantidadTotal] = useState('');
  const [montoTotal, setMontoTotal] = useState('');

  const [dataToPost, setDataToPost] = useState([]);
  const isMobile = useResponsive('down', 'md');
  const uid = uuid();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const validarFomr = () => {
    if (isNaN(parseFloat(precio.value))) {
      if (errorsListener) setPrecio({ ...precio, hasError: true, errMessage: 'Campo inválido' });
      setHasErros(true);
    } else setPrecio({ ...precio, hasError: false, errMessage: '' });
    if (!detalleProd.value) {
      if (errorsListener) setDetalleProd({ ...detalleProd, hasError: true, errMessage: 'Campo inválido' });
      setHasErros(true);
    } else setDetalleProd({ ...detalleProd, hasError: false, errMessage: '' });
    if (cantidad.value <= 0) {
      if (errorsListener) setCantidad({ ...cantidad, hasError: true, errMessage: 'Campo inválido' });
      setHasErros(true);
    } else setCantidad({ ...cantidad, hasError: false, errMessage: '' });
  };

  const onAddRow = () => {
    setErrorsListener(true);

    if (!hasErros) {
      setDataToPost([...dataToPost, { detalle: detalleProd, precio, cantidad, uid, tallas: sizes.filter(el => el.value > 0) }]);
      setSizes([...Array(13)].map((el, i) => ({ size: i + 34, value: 0 })));
      setDetalleProd({ value: '', hasError: null, errMessage: '' });
      setPrecio({ value: '', hasError: null, errMessage: '' });
      setCantidad({ value: '', hasError: null, errMessage: '' });
      setErrorsListener(false);
    }
  };

  const handleSave = () => {
    setValue(
      'detalleVenta',
      dataToPost.map(el => ({
        detalle: el.detalle.value,
        precio: el.precio.value,
        cantidad: el.cantidad.value,
        uid: el.uid,
        tallas: el.tallas,
      }))
    );
    setTotales({ cantidadTotal, montoTotal });
    setOpen(false);
  };

  const handleDelete = id => setDataToPost(dataToPost.filter(row => row.uid !== id));

  useEffect(() => {
    const quantity = sizes.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);
    setCantidad({ ...cantidad, value: quantity });
  }, [sizes]);

  useEffect(() => {
    const quantityTotal = dataToPost.reduce((acc, curr) => {
      return acc + curr.cantidad.value;
    }, 0);
    const montoTotal = dataToPost.reduce((acc, curr) => {
      return acc + curr.cantidad.value * curr.precio.value;
    }, 0);
    setCantidadTotal(quantityTotal);
    setMontoTotal(montoTotal);
  }, [dataToPost]);

  useEffect(() => {
    validarFomr();
  }, [errorsListener, precio.value, detalleProd.value, cantidad.value]);
  useEffect(() => {
    if (detalleProd.hasError === false && precio.hasError === false && cantidad.hasError === false) setHasErros(false);
  }, [validarFomr]);

  return (
    <>
      <Button fullWidth variant="outlined" onClick={handleClickOpen}>
        {edit ? 'editar productos' : 'Añadir productos'}
      </Button>

      <Dialog
        fullScreen={isMobile}
        fullWidth
        maxWidth="xl"
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{'Añadir Productos'}</DialogTitle>
        <DialogContent>
          <Box component="form">
            <Grid container spacing={1.5}>
              <Grid item xs={12}>
                <TableContainer sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Scrollbar sx={{ maxHeight: '100%' }}>
                    {dataToPost.length ? (
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            {tableHeadLabels.map(el => (
                              <TableCell align="center" sx={{ px: el.id === 'borrar' ? 0 : 1, m: 0 }} key={el.id}>
                                {el.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {dataToPost.map(el => (
                            <TableRow key={el.uid}>
                              <TableCell align="center">{el.detalle.value}</TableCell>
                              <TableCell align="center">{parseFloat(el.precio.value).toLocaleString('es-MX')} bs.</TableCell>
                              <TableCell align="center">{el.cantidad.value} prs.</TableCell>
                              <TableCell align="center">{(el.cantidad.value * el.precio.value).toLocaleString('es-MX')} bs.</TableCell>

                              <TableCell>
                                <Table>
                                  <TableHead>
                                    <StyledTableRow>
                                      {el.tallas.map((el, i) => (
                                        <StyledTableCell align="center" key={i}>
                                          {' '}
                                          {el.size}{' '}
                                        </StyledTableCell>
                                      ))}
                                    </StyledTableRow>
                                  </TableHead>
                                  <TableBody>
                                    <StyledTableRow>
                                      {el.tallas.map((el, i) => (
                                        <StyledTableCell align="center" key={i}>
                                          {' '}
                                          {el.value}{' '}
                                        </StyledTableCell>
                                      ))}
                                    </StyledTableRow>
                                  </TableBody>
                                </Table>
                              </TableCell>
                              <TableCell sx={{ m: 0, p: 0 }}>
                                <IconButton onClick={() => handleDelete(el.uid)}>
                                  <Iconify icon={'eva:trash-2-outline'} />
                                </IconButton>{' '}
                              </TableCell>
                            </TableRow>
                          ))}
                          <StyledTableRow>
                            <StyledTableCell align="right" colSpan={2}>
                              <Typography sx={{ pr: 4 }}>Total:</Typography>
                            </StyledTableCell>
                            <StyledTableCell align="center" sx={{ bgcolor: 'gray', borderRadius: 5, color: 'white' }}>
                              {cantidadTotal.toLocaleString('es-MX')} prs.
                            </StyledTableCell>
                            <StyledTableCell align="center" sx={{ bgcolor: 'gray', borderRadius: 5, color: 'white' }}>
                              {montoTotal.toLocaleString('es-MX')} bs.
                            </StyledTableCell>
                          </StyledTableRow>
                        </TableBody>
                      </Table>
                    ) : (
                      <Alert severity="warning">Aun no se han agregado productos </Alert>
                    )}
                  </Scrollbar>
                </TableContainer>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  variant="filled"
                  value={detalleProd.value}
                  error={detalleProd.hasError}
                  helperText={detalleProd.errMessage}
                  onChange={e => setDetalleProd({ ...detalleProd, value: e.target.value })}
                  label="Detalle"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField fullWidth variant="filled" value={cantidad.value} disabled label="Cantidad" />
              </Grid>

              <Grid item xs={12} sm={3}>
                <TextField
                  variant="filled"
                  fullWidth
                  label="Precio"
                  type="number"
                  error={precio.hasError}
                  helperText={precio.errMessage}
                  value={precio.value}
                  onChange={e => {
                    setPrecio({ ...precio, value: e.target.value });
                  }}
                  InputProps={{
                    inputMode: 'numeric',
                    pattern: '[a-z]{1,15}',
                    endAdornment: <Typography sx={{ ml: 2, fontWeight: 700, zIndex: 500 }}>Bs.</Typography>,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <ProductAddSizesDialog
                  open={openSizesDialog}
                  setOpen={setOpenSizesDialog}
                  isEmptySizes={isEmptySizes}
                  setIsEmptySizes={setIsEmptySizes}
                  sizes={sizes}
                  setSizes={setSizes}
                  buttonVariant="text"
                />
                <Button variant="outlined" color="info" onClick={onAddRow}>
                  Agregar
                </Button>
              </Grid>
              <Grid item xs={12}>
                {errorsListener && cantidad.hasError && <Alert severity="error">No se han agregado tallas</Alert>}
              </Grid>
              <Grid item xs={12}>
                {cantidad.value > 0 && (
                  <Table>
                    <TableHead>
                      <TableRow>
                        {sizes.map(
                          (el, i) =>
                            el.value > 0 && (
                              <TableCell align="center" sx={{ p: 0 }} key={i}>
                                {' '}
                                {el.size}{' '}
                              </TableCell>
                            )
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        {sizes.map(
                          (el, i) =>
                            el.value > 0 && (
                              <TableCell align="center" sx={{ p: 0 }} key={i}>
                                {' '}
                                {el.value}{' '}
                              </TableCell>
                            )
                        )}
                      </TableRow>
                    </TableBody>
                  </Table>
                )}
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={() => handleSave()} autoFocus>
            Guardas productos
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
AddReciboDetails.propTypes = {
  edit: PropTypes.bool,
  editInfo: PropTypes.array,
  setValue: PropTypes.func,
  setTotales: PropTypes.func,
};
function Incrementer({ available, quantity, onIncrementQuantity, onDecrementQuantity, handleChangeInput }) {
  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032',
      }}
    >
      <IconButton size="small" color="inherit" disabled={quantity <= 0} onClick={onDecrementQuantity}>
        <Iconify icon={'eva:minus-fill'} width={14} height={14} />
      </IconButton>

      <TextField value={quantity} variant="standard" size="small" sx={{ width: 20 }} onChange={handleChangeInput} />

      <IconButton size="small" color="inherit" disabled={quantity >= available} onClick={onIncrementQuantity}>
        <Iconify icon={'eva:plus-fill'} width={14} height={14} />
      </IconButton>
    </Box>
  );
}

Incrementer.propTypes = {
  available: PropTypes.number,
  quantity: PropTypes.number,
  onIncrementQuantity: PropTypes.func,
  onDecrementQuantity: PropTypes.func,
  handleChangeInput: PropTypes.func,
};
