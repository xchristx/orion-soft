import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { forwardRef, useEffect, useState } from 'react';
// MUI
import { Alert, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Box, Slide, Typography, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
// react-hook-form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// react -redux
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addProducto, editProducto } from '../../../../redux/actions/productActions';

// Components
import Iconify from '../../../../components/Iconify';
import { IconButtonAnimate } from '../../../../components/animate/IconButtonAnimate';
import { FormProvider, RHFRadioGroup, RHFSelect, RHFTextField } from '../../../../components/hook-form';
import ImgCardUpload from './ImgCardUpload';
import useResponsive from '../../../../hooks/useResponsive';
import { useSnackbar } from 'notistack';
import styled from '@emotion/styled';
import ProductAddSizesDialog from '../../compras/components/product-detail/ProductAddSizesDialog';
import { ColorManyPicker } from '../../../../components/color-utils';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CUEROS = ['Oscaria grabado', 'Hunting', 'Volcado', 'Graso Industrial', 'Graso', 'Nobuck'];
const GOMAS = [
  'RBB',
  'Maximus',
  'Montalvo Mik',
  'Explorer',
  'Cat Guigar',
  'Pantanera',
  'RBB2PM',
  'Cater guigar',
  'Vestir amazonas',
  'Security Guigar',
  'Dragon guigar',
  'Army guigar',
];
const PUNTERA = ['Acero', 'Composite', 'Termoplastica'];
const PLANTARMAR = ['Costra', 'Fibra', 'Plantex'];
const FORRO = ['Castor', 'Cuero', 'S/Forro'];
const PLANTINTERNA = ['Antimicrobiano', 'Castor', 'Cuero', 'Poliuretano'];
export const FILTER_COLOR_OPTIONS = ['#5b1f00', '#000000', '#FDEBD0', '#AEB6BF', '#F4D03F', '#5DADE2'];

// ----------------------------------------------------------------------

const onSelected = (selected, item) => (selected.includes(item) ? selected.filter(value => value !== item) : [...selected, item]);

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function AddEditRecibo({ onClose, open, edit, editInfo }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const fullScreen = useResponsive('down', 'md');
  const { enqueueSnackbar } = useSnackbar();

  const { data } = useSelector(s => s.proveedores);

  const [openSizesDialog, setOpenSizesDialog] = useState(false);
  const [isEmptySizes, setIsEmptySizes] = useState(false);
  const [cantidad, setCantidad] = useState({ value: edit ? editInfo.cantidad : 0, hasError: null, errMessage: '' });

  const [sizes, setSizes] = useState(edit ? editInfo.tallas : [...Array(13)].map((el, i) => ({ size: i + 34, value: 0 })));

  const [imagen, setImagen] = useState(edit ? editInfo.img : []);
  const [imagenError, setImagenError] = useState();
  const uid = uuid();

  const FormSchema = Yup.object().shape({
    nombre: Yup.string().required('Introduce el nombre del producto'),
    proveedor: Yup.string().required('Selecciona el proveedor'),
    facturado: Yup.number().typeError('Introduce un número valido'),
    noFacturado: Yup.number().required('Introduce el precio por sin factura favor').typeError('Introduce un número valido'),
    tipo: Yup.string().required('Selecciona el tipo de cliente'),
    description: Yup.string(),
    cuero: Yup.string().required('Selecciona el cuero'),
    goma: Yup.string().required('Selecciona la goma'),
    puntera: Yup.string().required('Selecciona la puntera'),
    plantillaArmar: Yup.string().required('Selecciona la plantilla de armar'),
    forro: Yup.string().required('Selecciona el forro'),
    plantillaInterna: Yup.string().required('Selecciona la plantilla interna'),
    plancha: Yup.string().required('Selecciona si tiene plancha'),
    lengueta: Yup.string().required('Selecciona el tipo de lengueta'),
    aleteado: Yup.string().required('Selecciona si es aleteado'),
    otros: Yup.string(),
    colores: Yup.array().min(1),
  });
  const defaultValues = edit
    ? {
        ...editInfo,
        facturado: editInfo.precio.facturado,
        noFacturado: editInfo.precio.noFacturado,
        proveedor: editInfo.proveedor.uid,
        colores: editInfo.detalles.colores,
        plantillaArmar: editInfo.detalles.plantillaArmar,
        plantillaInterna: editInfo.detalles.plantillaInterna,
        lengueta: editInfo.detalles.lengueta,
        otros: editInfo.detalles.otros,
        puntera: editInfo.detalles.puntera,
        cuero: editInfo.detalles.cuero,
        goma: editInfo.detalles.goma,
        aleteado: editInfo.detalles.aleteado,
        forro: editInfo.detalles.forro,
        plancha: editInfo.detalles.plancha,
      }
    : {
        nombre: '',
        facturado: '',
        noFacturado: '',
        tipo: '',
        notas: '',
        description: '',
        cuero: '',
        gomas: '',
        images: '',
        puntera: '',
        plantillaArmar: '',
        forro: '',
        plantillaInterna: '',
        plancha: '',
        lenguetacuero: '',
        aleteado: '',
        otros: '',
        colores: [],
      };
  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = methods;
  const onSubmitAdd = async formData => {
    const { plantillaArmar, plantillaInterna, lengueta, otros, puntera, cuero, goma, aleteado, forro, plancha, colores } = formData;

    const dataToAdd = {
      detalles: {
        plantillaArmar,
        plantillaInterna,
        lengueta,
        puntera,
        cuero,
        goma,
        aleteado,
        forro,
        plancha,
        otros,
        colores,
      },
      precio: { facturado: parseInt(formData.facturado), noFacturado: parseInt(formData.noFacturado) },
      img: imagen,
      tallas: sizes.filter(el => el.value > 0),
      uid,
      descripcion: formData.descripcion,
      cantidad: cantidad.value,
      proveedor: data.find(el => el.uid === formData.proveedor),
      tipo: formData.tipo,
      nombre: formData.nombre,
    };
    dispatch(addProducto(dataToAdd));
    reset();
    setSizes([...Array(13)].map((el, i) => ({ size: i + 34, value: 0 })));
    setImagen([]);
    onClose();
  };
  const onSubmitEdit = async formData => {
    const { plantillaArmar, plantillaInterna, lengueta, otros, puntera, cuero, goma, aleteado, forro, plancha, colores } = formData;

    const dataToAdd = {
      detalles: {
        plantillaArmar,
        plantillaInterna,
        lengueta,
        puntera,
        cuero,
        goma,
        aleteado,
        forro,
        plancha,
        otros,
        colores,
      },
      precio: { facturado: parseInt(formData.facturado), noFacturado: parseInt(formData.noFacturado) },
      img: imagen,
      tallas: sizes.filter(el => el.value > 0),
      uid,
      descripcion: formData.descripcion,
      cantidad: cantidad.value,
      proveedor: data.find(el => el.uid === formData.proveedor),
      tipo: formData.tipo,
      nombre: formData.nombre,
    };
    dispatch(editProducto(dataToAdd));
    reset();
    setSizes([...Array(13)].map((el, i) => ({ size: i + 34, value: 0 })));
    setImagen([]);
    onClose();
  };
  const onSubmit = edit ? onSubmitEdit : onSubmitAdd;
  useEffect(() => {
    if (imagenError) {
      enqueueSnackbar('Error al subir la imagen!');
    }
  }, [imagenError]);
  useEffect(() => {
    const quantity = sizes.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);
    setCantidad({ ...cantidad, value: quantity });
  }, [sizes]);

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
          {edit ? 'Editar Producto' : 'Nuevo Producto'}
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
              <Box gridColumn={{ xs: 'span 12', sm: 'span 6' }} gridRow={{ xs: 'span 0', sm: 'span 6' }}>
                <ImgCardUpload setError={setImagenError} setState={setImagen} images={imagen} />
              </Box>
              <Box gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
                <RHFTextField variant="filled" name="nombre" label="Nombre" />
              </Box>
              <Box gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
                <RHFTextField variant="filled" name="descripcion" label="Descripción" multiline rows={3} />
              </Box>
              <Box gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
                <RHFSelect variant="filled" name="proveedor" label="Proveedor">
                  <option></option>
                  {data.map(el => (
                    <option key={el.uid} value={el.uid}>
                      {el.nombre?.toUpperCase()}
                    </option>
                  ))}
                </RHFSelect>
              </Box>
              <Box gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
                <RHFSelect variant="filled" name="tipo" label="Tipo">
                  <option></option>
                  {['SEGURIDAD', 'SIN PUNTA DE ACERO', 'VESTIR', 'OTRO'].map((el, i) => (
                    <option key={i} value={el}>
                      {el}
                    </option>
                  ))}
                </RHFSelect>
              </Box>

              <Box gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
                <RHFTextField
                  variant="filled"
                  name="noFacturado"
                  label="Precio"
                  type="number"
                  InputProps={{
                    endAdornment: (
                      <Box component="span" sx={{ fontWeight: 800 }}>
                        Bs.
                      </Box>
                    ),
                  }}
                />
              </Box>
              <Box gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
                <RHFTextField
                  variant="filled"
                  name="facturado"
                  label="Precio Facturado"
                  type="number"
                  InputProps={{
                    endAdornment: (
                      <Box component="span" sx={{ fontWeight: 800 }}>
                        Bs.
                      </Box>
                    ),
                  }}
                />
              </Box>
              <Box maxWidth gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
                <Box sx={{ position: 'relative' }}>
                  <TextField
                    variant="filled"
                    disabled
                    label="Cantidad"
                    value={cantidad.value}
                    sx={{ position: 'relative', width: '100%' }}
                    InputProps={{
                      endAdornment: (
                        <Box component="span" sx={{ fontWeight: 800 }}>
                          Prs.
                        </Box>
                      ),
                    }}
                  />
                  <Box sx={{ position: 'absolute', right: '20%', top: -2 }}>
                    <ProductAddSizesDialog
                      open={openSizesDialog}
                      setOpen={setOpenSizesDialog}
                      isEmptySizes={isEmptySizes}
                      setIsEmptySizes={setIsEmptySizes}
                      sizes={sizes}
                      setSizes={setSizes}
                      buttonVariant="outlined"
                    />
                  </Box>
                </Box>
              </Box>
              <Box gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
                <RHFSelect variant="filled" name="cuero" label="Cuero:">
                  <option></option>
                  {CUEROS.map(cuero => (
                    <option key={cuero} value={cuero}>
                      {cuero}
                    </option>
                  ))}

                  <option>Otro, especificar en descripcion</option>
                </RHFSelect>
              </Box>
              <Box gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
                <RHFSelect variant="filled" name="goma" label="Goma:">
                  <option></option>
                  {GOMAS.map(goma => (
                    <option key={goma} value={goma}>
                      {goma}
                    </option>
                  ))}
                  <option>Otro, especificar en descripcion</option>
                </RHFSelect>
              </Box>
              <Box gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
                <RHFSelect variant="filled" name="lengueta" label="Lengueta:">
                  <option></option>

                  {['CASTOR', 'NAPPA', 'DESCARNE'].map(goma => (
                    <option key={goma} value={goma}>
                      {goma}
                    </option>
                  ))}
                  <option>Otro, especificar en descripcion</option>
                </RHFSelect>
              </Box>

              <Box sx={{ boxShadow: 20, borderRadius: 2, px: 2 }} maxWidth gridColumn={{ xs: 'span 6', sm: 'span 3' }}>
                <LabelStyle>Plancha metálica</LabelStyle>
                <RHFRadioGroup
                  name="plancha"
                  options={['Si', 'No']}
                  sx={{
                    '& .MuiFormControlLabel-root': { mr: 4 },
                  }}
                />
              </Box>
              <Box sx={{ boxShadow: 20, borderRadius: 2, px: 2 }} maxWidth gridColumn={{ xs: 'span 6', sm: 'span 3' }}>
                <LabelStyle>Aleteado</LabelStyle>
                <RHFRadioGroup
                  name="aleteado"
                  options={['Si', 'No']}
                  sx={{
                    '& .MuiFormControlLabel-root': { mr: 4 },
                  }}
                />
              </Box>
              <Box sx={{ boxShadow: 20, borderRadius: 2, px: 2 }} maxWidth gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
                <LabelStyle>Puntera</LabelStyle>
                <RHFRadioGroup
                  name="puntera"
                  options={PUNTERA}
                  sx={{
                    '& .MuiFormControlLabel-root': { mr: 4 },
                  }}
                />
              </Box>
              <Box sx={{ boxShadow: 20, borderRadius: 2, px: 2 }} maxWidth gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
                <LabelStyle>Plantilla de Armar</LabelStyle>
                <RHFRadioGroup
                  name="plantillaArmar"
                  options={PLANTARMAR}
                  sx={{
                    '& .MuiFormControlLabel-root': { mr: 4 },
                  }}
                />
              </Box>
              <Box sx={{ boxShadow: 20, borderRadius: 2, px: 2 }} maxWidth gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
                <LabelStyle>Forro</LabelStyle>
                <RHFRadioGroup
                  name="forro"
                  options={FORRO}
                  sx={{
                    '& .MuiFormControlLabel-root': { mr: 4 },
                  }}
                />
              </Box>
              <Box sx={{ boxShadow: 20, borderRadius: 2, px: 2 }} maxWidth gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
                <LabelStyle>Plantilla Interna</LabelStyle>
                <RHFRadioGroup
                  name="plantillaInterna"
                  options={PLANTINTERNA}
                  sx={{
                    '& .MuiFormControlLabel-root': { mr: 4 },
                  }}
                />
              </Box>
              <Box sx={{ boxShadow: 20, borderRadius: 2, px: 2 }} maxWidth gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
                <LabelStyle>Colores</LabelStyle>
                <Controller
                  name="colores"
                  control={control}
                  render={({ field }) => (
                    <ColorManyPicker
                      colors={FILTER_COLOR_OPTIONS}
                      onChangeColor={color => field.onChange(onSelected(field.value, color))}
                    />
                  )}
                />
                {!!errors.colores && <Alert severity="error">{'Elige los colores del productos'}</Alert>}
              </Box>

              <Box gridColumn={{ xs: 'span 12' }}>
                <RHFTextField variant="filled" name="otros" label="Otros" multiline rows={3} />
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
