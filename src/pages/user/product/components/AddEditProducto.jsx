import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { forwardRef, useEffect, useState } from 'react';
// MUI
import { Alert, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Box, Slide } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SaveIcon from '@mui/icons-material/Save';
import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
// react-hook-form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// react -redux
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addProducto, editProducto } from '../../../../redux/actions/productActions';

// Components
import Iconify from '../../../../components/Iconify';
import { IconButtonAnimate } from '../../../../components/animate/IconButtonAnimate';
import { FormProvider, RHFSelect, RHFTextField } from '../../../../components/hook-form';
import ImgCardUpload from './ImgCardUpload';
import useResponsive from '../../../../hooks/useResponsive';
import { useSnackbar } from 'notistack';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddEditRecibo({ onClose, open, edit, editInfo }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const fullScreen = useResponsive('down', 'md');
  const { enqueueSnackbar } = useSnackbar();

  const { data } = useSelector(s => s.proveedores);

  const [imagen, setImagen] = useState([]);
  const [imagenError, setImagenError] = useState();
  const uid = uuid();

  const FormSchema = Yup.object().shape({
    nombre: Yup.string().required().typeError('Introduce el nombre del cliente'),
    apellido: Yup.string().required('Introduce el apellido del cliente'),
    celular: Yup.number().required('Introduce el celular del cliente').typeError('Introduce un número valido'),
    email: Yup.string().email('Introduce un email válido'),
    tipo: Yup.string().required('Selecciona el tipo de cliente'),
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
    dispatch(addProducto(dataToAdd));
    reset();
    onClose();
  };
  const onSubmitEdit = async data => {
    const dataToEdit = {
      ...data,
      celular: parseInt(data.celular),
    };

    dispatch(editProducto(dataToEdit));
    reset();
    onClose();
  };
  const onSubmit = edit ? onSubmitEdit : onSubmitAdd;
  useEffect(() => {
    if (imagenError) {
      enqueueSnackbar('Error al subir la imagen!');
    }
  }, [imagenError]);
  return (
    <div>
      <Dialog
        fullWidth
        fullScreen={fullScreen}
        maxWidth="lg"
        open={Boolean(open)}
        TransitionComponent={Transition}
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
          {edit ? 'Editar Recibo' : 'Nuevo Recibo'}
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
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
              <Box gridColumn={{ xs: 'span 12', sm: 'span 6' }} gridRow={{ xs: 'span 0', sm: 'span 5' }}>
                <ImgCardUpload setError={setImagenError} setState={setImagen} images={imagen} />
              </Box>
              <Box gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
                <RHFTextField variant="filled" name="nombre" label="Nombre" />
              </Box>
              <Box gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
                <RHFSelect variant="filled" name="proveedor" label="Proveedor">
                  <option></option>
                  {data.map(el => (
                    <option key={el.uid} value={el.nombre}>
                      {el.nombre?.toUpperCase()}
                    </option>
                  ))}
                </RHFSelect>
              </Box>

              <Box gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
                <RHFTextField
                  variant="filled"
                  name="celular"
                  label="Teléfono/Celular"
                  type="number"
                  InputProps={{
                    endAdornment: <WhatsAppIcon />,
                  }}
                />
              </Box>
              <Box gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
                <RHFTextField variant="filled" name="email" label="email" type="email" />
              </Box>

              <Box gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
                <RHFTextField variant="filled" name="notas" label="Notas/comentarios" />
              </Box>
            </Box>
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
AddEditRecibo.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.any.isRequired,
  edit: PropTypes.bool.isRequired,
  title: PropTypes.string,
  lotId: PropTypes.string,
  editInfo: PropTypes.object,
};
