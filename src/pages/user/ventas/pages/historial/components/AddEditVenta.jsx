import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { forwardRef, useEffect, useState } from 'react';
// MUI
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  tableCellClasses,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
// react-hook-form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// firebase
import { doc, onSnapshot } from 'firebase/firestore';

// react -redux
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

// Components
import Iconify from '../../../../../../components/Iconify';
import { IconButtonAnimate } from '../../../../../../components/animate/IconButtonAnimate';
import { FormProvider, RHFMultiCheckbox, RHFSelect, RHFTextField } from '../../../../../../components/hook-form';
import DatePickerMUI from '../../../../../../components/DatePickerMUI';
import AddVentaDetails from './AddVentaDetails';
import styled from '@emotion/styled';
import { DB } from '../../../../../../App';
import Scrollbar from '../../../../../../components/scrollbar/Scrollbar';
import AddEditCliente from '../../../../clientes/components/AddEditCliente';
import SkeletonVenta from '../../../../../../components/skeleton/SkeletonVenta';
import { addVenta } from '../../../../../../redux/actions/ventasActions';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const RootStyle = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
});

const WrapperStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  overflow: 'hidden',
  alignItems: 'stretch',
  margin: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.primary.main}`,
}));

const LabelStyle = styled(props => <Typography component="span" variant="subtitle2" {...props} />)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.neutral,
  borderRight: `solid 1px ${theme.palette.divider}`,
}));
const tableHeadLabels = [
  { id: 'detalle', label: 'Detalle' },
  { id: 'precio', label: 'Precio' },
  { id: 'cantidad', label: 'Cantidad' },
  { id: 'subtotal', label: 'Subtotal' },
  { id: 'tallas', label: 'Tallas' },
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

const responsables = [
  'J. Sebastian Corrales Lazarte',
  'Yessenia Valencia Huanca',
  'Luz Gardenia Aguilera Coronado',
  'Paola Melani Callata Saavedra',
];

export default function AddEditVenta({ onClose, open, edit, editInfo }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [totales, setTotales] = useState({});
  const [ventaId, setVentaId] = useState(null);
  const [reciboId, setReciboId] = useState(null);

  const [openClienteModal, setOpenClienteModal] = useState(false);

  const uid = uuid();
  const uidRecibo = uuid();

  const { user } = useSelector(s => s.authSlice);
  const { data: clientesData, isLoading } = useSelector(s => s.clientes);

  const FormSchema = Yup.object().shape({
    fecha: Yup.date().required().typeError('Este campo debe ser una fecha válida por favor'),
    cliente: Yup.string().required('Introduce el nombre del cliente'),
    adelanto: Yup.number().required('Introduce el monto de adelanto').typeError('Introduce un número valido'),
    concepto: Yup.string().when('adelanto', (adelanto, schema) => {
      if (parseInt(adelanto) > 1) {
        return schema.required('Introduzca el concepto de pago');
      }
      return schema;
    }),
    metodoPago: Yup.array().when('adelanto', (adelanto, schema) => {
      if (parseInt(adelanto) > 1) {
        return schema.min(1);
      }
      return schema;
    }),
    personaQuePaga: Yup.string().when('adelanto', (adelanto, schema) => {
      if (parseInt(adelanto) > 1) {
        return schema.required('Introduzca la persona que efectúa el pago');
      }
      return schema;
    }),
    telefono: Yup.number().when('adelanto', (adelanto, schema) => {
      if (parseInt(adelanto) > 1) {
        return schema.required('Introduzca el teléfono').typeError('introduzca el numero telefonico por favor');
      }
      return schema;
    }),
    responsable: Yup.string().required('Introduce el responsable de emisión'),
    detalleRecibo: Yup.string(),
    notasVenta: Yup.string(),
    detalleVenta: Yup.array().min(1),
  });
  const defaultValues = edit
    ? { ...editInfo }
    : {
        reciboId: '',
        fecha: new Date(),
        cliente: '',
        telefono: '',
        adelanto: '',
        concepto: '',
        metodoPago: [],
        responsable: user.firstName + ' ' + user.lastName,
        detalleRecibo: '',
        personaQuePaga: '',
        notasVenta: '',
        detalleVenta: [],
      };
  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = methods;
  const onSubmitAdd = async data => {
    const reciboData = {
      reciboId,
      ventaId,
      fecha: new Date(data.fecha).getTime(),
      cliente: data.personaQuePaga,
      telefono: data.telefono,
      adelanto: data.adelanto,
      concepto: data.concepto,
      metodoPago: data.metodoPago,
      responsable: data.responsable,
      detalleRecibo: data.detalleRecibo,
      estado: 'valido',
      uid: uidRecibo,
      cantidadTotal: totales.cantidadTotal,
      montoTotal: totales.montoTotal,
    };

    const pagos = parseFloat(data.adelanto) > 0 ? [reciboData] : [];
    const dataToAdd = {
      adelanto: data.adelanto,
      notasVenta: data.notasVenta,
      detalleVenta: data.detalleVenta,
      cliente: clientesData.find(el => el.uid === data.cliente),
      fecha: new Date(data.fecha).getTime(),
      ventaId: { id: ventaId },
      cantidadTotal: totales.cantidadTotal,
      montoTotal: totales.montoTotal,
      uid,
      recibosVenta: pagos,
    };
    dispatch(addVenta(dataToAdd));
    reset();
    onClose();
  };
  const onSubmitEdit = async data => {
    const dataToPost = {
      ...data,
      fecha: new Date(data.fecha).getTime(),
    };

    dispatch(console.log({ data: dataToPost, staffId: editInfo.id }));
    reset();
    onClose();
  };
  const onSubmit = edit ? onSubmitEdit : onSubmitAdd;

  useEffect(() => {
    const unsub = onSnapshot(doc(DB, 'idVenta', 'idVenta'), doc => {
      setVentaId(doc.data().id + 1);
    });
    return () => unsub();
  }, [onSnapshot]);
  useEffect(() => {
    const unsub = onSnapshot(doc(DB, 'idRecibo', 'idRecibo'), doc => {
      setReciboId(doc.data().id + 1);
    });
    return () => unsub();
  }, [onSnapshot]);

  useEffect(() => {
    if (watch('adelanto') > totales.montoTotal) {
      setError('importe', { type: 'importeMax', message: 'Adelanto no puede ser mayor a monto total, saldo negativo' });
    } else clearErrors('importe');
  }, [watch('adelanto'), totales.montoTotal, setError]);

  useEffect(() => {
    if (watch('cliente')) {
      setValue('telefono', clientesData?.find(el => el.uid === watch('cliente'))?.celular);
      const cliente = clientesData.find(el => el.uid === watch('cliente'));
      setValue('personaQuePaga', cliente?.nombre + ' ' + cliente?.apellido);
    }
  }, [watch('cliente')]);
  console.log(errors);

  return (
    <div>
      <Dialog
        fullWidth
        fullScreen={true}
        maxWidth="xl"
        open={Boolean(open)}
        TransitionComponent={Transition}
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
          {edit ? 'Editar Venta' : 'Nueva Venta'}
          <IconButtonAnimate
            onClick={() => {
              onClose();
              reset();
            }}
          >
            <Iconify icon="mdi:close-circle" sx={{ '&&:hover': { color: theme.palette.error.main } }} />
          </IconButtonAnimate>
        </DialogTitle>
        <Divider />
        <DialogContent>
          {isLoading ? (
            <SkeletonVenta />
          ) : (
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
              <Grid container spacing={1.5}>
                <Grid item xs={12}>
                  <Alert sx={{ display: 'flex', alignItems: 'center', my: 0, py: 0 }} severity={'info'}>
                    ¿Cliente no registrado?{' '}
                    <Button variant="outlined" onClick={() => setOpenClienteModal(true)}>
                      Añadir cliente
                    </Button>
                  </Alert>
                  <AddEditCliente open={openClienteModal} edit={false} onClose={() => setOpenClienteModal(false)} />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField disabled value={ventaId} variant="filled" name="reciboId" label="ID*" type="number" fullWidth />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Controller
                    control={control}
                    name="fecha"
                    render={({ field, formState }) => (
                      <DatePickerMUI label={'Fecha*'} value={field.value} onChange={field.onChange} error={formState.errors.fecha} />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={4} sx={{ display: 'flex', alignItems: 'center' }}>
                  <AddVentaDetails edit={!!watch('detalleVenta')?.length} setValue={setValue} setTotales={setTotales} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFSelect variant="filled" name="cliente" label="Cliente*">
                    <option></option>
                    {clientesData.map(el => (
                      <option key={el.uid} value={el.uid}>
                        {el.nombre + ' ' + el.apellido}
                      </option>
                    ))}
                  </RHFSelect>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFTextField
                    variant="filled"
                    name="adelanto"
                    label="Recibí la suma de:*"
                    type="number"
                    InputProps={{
                      endAdornment: <Typography sx={{ ml: 2, fontWeight: 700, zIndex: 500 }}>Bs.</Typography>,
                    }}
                  />
                </Grid>
                {!!errors.importe && (
                  <Grid item xs={12}>
                    {' '}
                    <Alert severity="error">{errors.importe.message}</Alert>
                  </Grid>
                )}

                {parseInt(watch('adelanto')) > 1 && (
                  <>
                    <Grid item xs={12}>
                      <Divider sx={{ bgcolor: 'primary.main' }} />
                      <Typography my={1}>Datos para el recibo:</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <RHFTextField name="personaQuePaga" label="Persona que efectua el pago." />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <RHFTextField name="telefono" label="Celular:" type="number" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <RHFTextField name="concepto" label="Por concepto de:*" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <RHFMultiCheckbox
                        name="metodoPago"
                        options={['EFECTIVO', 'TRANSFERENCIA BANCARIA O QR', 'TIGO MONEY', ' CHEQUE']}
                        sx={{ width: 1 }}
                      />
                      {!!errors.metodoPago && <p style={{ color: 'red', fontSize: '0.8rem' }}>Selecciona el método de pago</p>}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <RHFTextField name="detalleRecibo" label="Detalle para el recibo" />
                    </Grid>
                    <Grid item xs={12}>
                      <Divider sx={{ bgcolor: 'primary.main' }} />
                    </Grid>
                  </>
                )}

                <Grid item xs={12} sm={6}>
                  <RHFSelect variant="filled" name="responsable" label="Responsable*">
                    <option></option>
                    {responsables.map((el, i) => (
                      <option key={i} value={el}>
                        {el}
                      </option>
                    ))}
                  </RHFSelect>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFTextField name="notasVenta" label="Notas de la venta (no se muestra en el recibo)" />
                </Grid>

                <Grid item xs={12}>
                  {watch('detalleVenta')?.length && totales.cantidadTotal ? (
                    <>
                      <RootStyle>
                        <WrapperStyle>
                          <LabelStyle>Cantidad:</LabelStyle>
                          <Typography sx={{ p: 0.5 }}>{`${totales.cantidadTotal.toLocaleString('es-MX')} prs.`}</Typography>
                        </WrapperStyle>
                        <WrapperStyle>
                          <LabelStyle>Monto:</LabelStyle>
                          <Typography sx={{ p: 0.5 }}>{`${totales.montoTotal.toLocaleString('es-MX')} bs.`}</Typography>
                        </WrapperStyle>
                        <WrapperStyle>
                          <LabelStyle>Saldo:</LabelStyle>
                          <Typography sx={{ p: 0.5 }}>
                            {`${(isNaN(parseFloat(watch('adelanto')))
                              ? totales.montoTotal
                              : totales.montoTotal - parseFloat(watch('adelanto'))
                            ).toLocaleString('es-MX')} bs.`}
                          </Typography>
                        </WrapperStyle>
                      </RootStyle>
                      <TableContainer sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Scrollbar sx={{ maxHeight: '100%' }}>
                          <Table aria-label="simple* table">
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
                              {watch('detalleVenta').map(el => (
                                <TableRow key={el.uid}>
                                  <TableCell align="center">{el.detalle.nombre}</TableCell>
                                  <TableCell align="center">{parseFloat(el.precio).toLocaleString('es-MX')} bs.</TableCell>
                                  <TableCell align="center">{el.cantidad} prs.</TableCell>
                                  <TableCell align="center">{(el.cantidad * el.precio).toLocaleString('es-MX')} bs.</TableCell>

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
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Scrollbar>
                      </TableContainer>
                    </>
                  ) : (
                    <Alert severity={errors.detalleVenta ? 'error' : 'warning'}>Aun no se han agregado productos </Alert>
                  )}
                </Grid>
              </Grid>
            </FormProvider>
          )}
        </DialogContent>
        <DialogActions>
          <LoadingButton disabled={isLoading} variant="contained" loading={isSubmitting} onClick={handleSubmit(onSubmit)}>
            <SaveIcon /> {edit ? 'Guardar Cambios' : 'Guardar'}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
AddEditVenta.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.any.isRequired,
  edit: PropTypes.bool.isRequired,
  title: PropTypes.string,
  lotId: PropTypes.string,
  editInfo: PropTypes.object,
};
