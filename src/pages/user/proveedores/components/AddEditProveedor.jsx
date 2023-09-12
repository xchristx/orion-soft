import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { forwardRef } from 'react';
// MUI
import { Alert, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Slide } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SaveIcon from '@mui/icons-material/Save';
import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
// react-hook-form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// react -redux
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';

// Components
import Iconify from '../../../../components/Iconify';
import { IconButtonAnimate } from '../../../../components/animate/IconButtonAnimate';
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import { addProvedor, editProvedor } from '../../../../redux/actions/proveedoresActions';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddEditProveedor({ onClose, open, edit, editInfo }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const uid = uuid();

  const FormSchema = Yup.object().shape({
    nit: Yup.number(),
    nombre: Yup.string().required().typeError('Introduce el nombre del proveedor'),
    celular: Yup.number().required('Introduce el celular del proveedor').typeError('Introduce un número valido'),
    email: Yup.string().email('Introduce un email válido'),
    producto: Yup.string().required('Introduce el producto principal del proveedor'),
    notas: Yup.string(),
  });
  const defaultValues = edit
    ? { ...editInfo }
    : {
        nombre: '',
        apellido: '',
        celular: '',
        email: '',
        tipo: '',
        notas: '',
      };
  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,

    formState: { errors, isSubmitting },
  } = methods;
  const onSubmitAdd = async data => {
    const dataToAdd = {
      ...data,
      celular: parseInt(data.celular),
      uid,
    };
    dispatch(addProvedor(dataToAdd));
    reset();
    onClose();
  };
  const onSubmitEdit = async data => {
    const dataToEdit = {
      ...data,
      celular: parseInt(data.celular),
    };

    dispatch(editProvedor(dataToEdit));
    reset();
    onClose();
  };
  const onSubmit = edit ? onSubmitEdit : onSubmitAdd;

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
          {edit ? 'Editar Proveedor' : 'Nuevo Proveedor'}
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
              <Grid item xs={12} sm={6}>
                <RHFTextField variant="filled" name="nombre" label="Nombre" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFTextField variant="filled" name="nit" label="NIT" type="number" />
              </Grid>

              <Grid item xs={12} sm={6}>
                <RHFTextField
                  variant="filled"
                  name="celular"
                  label="Teléfono/Celular"
                  type="number"
                  InputProps={{
                    endAdornment: <WhatsAppIcon />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFTextField variant="filled" name="email" label="email" type="email" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RHFTextField variant="filled" name="producto" label="Producto principal" />
              </Grid>

              <Grid item xs={12} sm={6}>
                <RHFTextField variant="filled" name="notas" label="Notas/comentarios" />
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
AddEditProveedor.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.any.isRequired,
  edit: PropTypes.bool.isRequired,
  title: PropTypes.string,
  lotId: PropTypes.string,
  editInfo: PropTypes.object,
};
