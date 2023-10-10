import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { forwardRef, useEffect, useState } from 'react';
// MUI
import { Alert, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Slide, TextField, Typography } from '@mui/material';
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
import { DB } from '../../../../../../App';
import styled from '@emotion/styled';
import { addReciboSaldo } from '../../../../../../redux/actions/ventasActions';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const RootStyle = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  marginTop: 15,
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

export default function AddEditRecibo({ onClose, open, edit, editInfo, ventaId, totales, ventaUid, adelantoActual }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [reciboId, setReciboId] = useState(null);

  const uid = uuid();

  const { user } = useSelector(s => s.authSlice);

  const FormSchema = Yup.object().shape({
    fecha: Yup.date().required().typeError('Este campo debe ser una fecha válida por favor'),
    cliente: Yup.string().required('Introduce el nombre de la persona que efectuará el pago'),
    adelanto: Yup.number().required('Introduce el monto de adelanto').typeError('Introduce un número valido'),
    concepto: Yup.string().required('Introduce el concepto'),
    metodoPago: Yup.string().required('Selecciona el método de pago'),
    responsable: Yup.string().required('Introduce el responsable de emisión'),
    detalleRecibo: Yup.string(),
  });
  const defaultValues = edit
    ? { ...editInfo, fecha: new Date(editInfo.feecha) }
    : {
        reciboId: '',
        fecha: new Date(),
        cliente: '',
        adelanto: '',
        concepto: '',
        metodoPago: '',
        responsable: user.firstName + ' ' + user.lastName,
        detalleRecibo: '',
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
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = methods;
  const nuevoSaldo = isNaN(parseFloat(watch('adelanto')))
    ? parseFloat(totales.saldoActual)
    : parseFloat(totales.saldoActual) - parseFloat(watch('adelanto'));
  const onSubmitAdd = async data => {
    const dataToAdd = {
      ...data,
      fecha: new Date(data.fecha).getTime(),
      reciboId,
      estado: 'valido',
      uid,
    };
    dispatch(addReciboSaldo({ data: dataToAdd, uid: ventaUid, totalAdelanto: parseFloat(adelantoActual) + parseFloat(data.adelanto) }));
    reset();
    onClose();
  };
  const onSubmitEdit = async data => {
    const dataToPost = {
      ...data,
      fecha: new Date(data.fecha).getTime(),
      reciboId: { id: editInfo.reciboId },
      estado: 'valido',
      uid,
    };

    dispatch(
      console.log({ data: dataToPost, totalAdelanto: parseFloat(adelantoActual) + parseFloat(data.adelanto), staffId: editInfo.id })
    );
    reset();
    onClose();
  };
  const onSubmit = edit ? onSubmitEdit : onSubmitAdd;

  useEffect(() => {
    if (nuevoSaldo < 0) setError('saldoError', { type: 'custom', message: 'El importe es mayor al saldo actual.' });
    else clearErrors(['saldoError']);
  }, [nuevoSaldo, watch('saldo')]);

  useEffect(() => {
    const unsub = onSnapshot(doc(DB, 'idRecibo', 'idRecibo'), doc => {
      setReciboId(doc.data().id + 1);
    });
    return () => unsub();
  }, [onSnapshot]);

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={Boolean(open)}
        TransitionComponent={Transition}
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
          {edit ? 'Editar Recibo' : 'Nuevo Recibo'}
          <Typography>ID venta: {ventaId}</Typography>
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
            <Grid container spacing={1.5}>
              {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
              <Grid item xs={6} sm={6}>
                <TextField
                  fullWidth
                  disabled
                  value={editInfo ? editInfo.reciboId : reciboId}
                  variant="filled"
                  name="reciboId"
                  label="ID recibo"
                  type="number"
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <Controller
                  control={control}
                  name="fecha"
                  render={({ field, formState }) => (
                    <DatePickerMUI label={'Fecha'} value={field.value} onChange={field.onChange} error={formState.errors.fecha} />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <RHFTextField variant="filled" name="cliente" label="Recibí de:" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFTextField
                  variant="filled"
                  name="adelanto"
                  label="La suma de:"
                  type="number"
                  InputProps={{
                    endAdornment: <Typography sx={{ ml: 2, fontWeight: 700, zIndex: 500 }}>Bs.</Typography>,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFTextField variant="filled" name="concepto" label="Por concepto de:" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFSelect variant="filled" name="metodoPago" label="Método de pago">
                  <option></option>
                  {['EFECTIVO', 'TRANSFERECIA BANCARIA', 'QR', 'TIGO MONEY'].map((el, i) => (
                    <option key={i} value={el}>
                      {el}
                    </option>
                  ))}
                </RHFSelect>
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFTextField variant="filled" disabled name="responsable" label="Responsable" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFTextField variant="filled" name="detalleRecibo" label="Detalle" />
              </Grid>
            </Grid>
          </FormProvider>
          <RootStyle>
            <WrapperStyle>
              <LabelStyle>Cantidad:</LabelStyle>
              <Typography sx={{ p: 0.5 }}>{`${totales.cantidadTotal.toLocaleString('es-MX')} prs.`}</Typography>
            </WrapperStyle>
            <WrapperStyle>
              <LabelStyle>Saldo actual:</LabelStyle>
              <Typography sx={{ p: 0.5 }}>{`${totales.saldoActual.toLocaleString('es-MX')} bs.`}</Typography>
            </WrapperStyle>
            <WrapperStyle>
              <LabelStyle>Nuevo saldo:</LabelStyle>
              <Typography sx={{ p: 0.5 }}>
                {`${(isNaN(parseFloat(watch('adelanto')))
                  ? totales.saldoActual
                  : totales.saldoActual - parseFloat(watch('adelanto'))
                ).toLocaleString('es-MX')} bs.`}
              </Typography>
            </WrapperStyle>
          </RootStyle>
          {!!errors.saldoError && <Alert severity="error">{errors.saldoError.message}</Alert>}
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
AddEditRecibo.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.any.isRequired,
  edit: PropTypes.bool.isRequired,
  title: PropTypes.string,
  lotId: PropTypes.string,
  editInfo: PropTypes.object,
  totales: PropTypes.object,
  ventaId: PropTypes.number,
  ventaUid: PropTypes.string,
  adelantoActual: PropTypes.number,
};
