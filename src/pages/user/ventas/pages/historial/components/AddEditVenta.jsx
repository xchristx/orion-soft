import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { forwardRef, useEffect, useState } from 'react';
// MUI
import {
  Alert,
  Chip,
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
import { FormProvider, RHFSelect, RHFTextField } from '../../../../../../components/hook-form';
import DatePickerMUI from '../../../../../../components/DatePickerMUI';
import AddVentaDetails from './AddVentaDetails';
import styled from '@emotion/styled';
import { addRecibo } from '../../../../../../redux/actions/recibosActions';
import { DB } from '../../../../../../App';
import Scrollbar from '../../../../../../components/scrollbar/Scrollbar';
import useResponsive from '../../../../../../hooks/useResponsive';

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
  border: `solid 1px ${theme.palette.divider}`,
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

export default function AddEditVenta({ onClose, open, edit, editInfo }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isDesktop = useResponsive('up', 'lg');

  const [totales, setTotales] = useState({});
  const [reciboId, setReciboId] = useState(null);

  const uid = uuid();

  const { user } = useSelector(s => s.authSlice);
  const { data: clientesData } = useSelector(s => s.clientes);

  const FormSchema = Yup.object().shape({
    fecha: Yup.date().required().typeError('Este campo debe ser una fecha válida por favor'),
    cliente: Yup.string().required('Introduce el nombre del cliente'),
    adelanto: Yup.number().required('Introduce el monto de adelanto').typeError('Introduce un número valido'),
    concepto: Yup.string().required('Introduce el concepto'),
    metodoPago: Yup.string().required('Selecciona el método de pago'),
    responsable: Yup.string().required('Introduce el responsable de emisión'),
    detalleRecibo: Yup.string(),
    detalleVenta: Yup.array().min(1),
  });
  const defaultValues = edit
    ? { ...editInfo }
    : {
        reciboId: '',
        fecha: new Date(),
        cliente: '',
        adelanto: '',
        concepto: '',
        metodoPago: '',
        responsable: user.firstName + ' ' + user.lastName,
        detalleRecibo: '',
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
    formState: { errors, isSubmitting },
  } = methods;
  const onSubmitAdd = async data => {
    const dataToAdd = {
      ...data,
      fecha: new Date(data.fecha).getTime(),
      reciboId: { id: reciboId },
      cantidadTotal: totales.cantidadTotal,
      montoTotal: totales.montoTotal,
      uid,
    };
    dispatch(addRecibo(dataToAdd));
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
      setReciboId(doc.data().id + 1);
    });
    return () => unsub();
  }, [onSnapshot]);

  return (
    <div>
      <Dialog
        fullWidth
        fullScreen={!isDesktop}
        maxWidth="lg"
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
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
            <Grid container spacing={1.5}>
              <Grid item xs={6} sm={4}>
                <TextField disabled value={reciboId} variant="filled" name="reciboId" label="ID*" type="number" fullWidth />
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
                      {el.nombre}
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
              <Grid item xs={12} sm={6}>
                <RHFTextField variant="filled" name="concepto" label="Por concepto de:*" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFSelect variant="filled" name="metodoPago" label="Método de pago*">
                  <option></option>
                  {['EFECTIVO', 'TRANSFERECIA BANCARIA', 'QR', 'TIGO MONEY'].map((el, i) => (
                    <option key={i} value={el}>
                      {el}
                    </option>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFTextField variant="filled" disabled name="responsable" label="Responsable*" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFTextField variant="filled" name="detalleRecibo" label="Detalle*" />
              </Grid>

              <Grid item xs={12}>
                {watch('detalleVenta')?.length && totales.cantidadTotal ? (
                  <>
                    <RootStyle>
                      <WrapperStyle>
                        <LabelStyle>Cantidad:</LabelStyle>
                        <Chip size="medium" label={`${totales.cantidadTotal.toLocaleString('es-MX')} pares.`} />
                      </WrapperStyle>
                      <WrapperStyle>
                        <LabelStyle>Monto:</LabelStyle>
                        <Chip size="medium" label={`${totales.montoTotal.toLocaleString('es-MX')} bs.`} />
                      </WrapperStyle>
                      <WrapperStyle>
                        <LabelStyle>Ssaldo:</LabelStyle>
                        <Chip size="medium" label={`${(totales.montoTotal - parseFloat(watch('adelanto'))).toLocaleString('es-MX')} bs.`} />
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
                                <TableCell align="center">{el.detalle}</TableCell>
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
        </DialogContent>
        <DialogActions>
          <LoadingButton variant="contained" loading={isSubmitting} onClick={handleSubmit(onSubmit)}>
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
