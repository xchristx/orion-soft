import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Typography } from '@mui/material';
// components
import {
  FormProvider,
  RHFSwitch,
  RHFSelect,
  RHFEditor,
  RHFTextField,
  RHFRadioGroup,
  // RHFUploadMultiFile,
} from '../../../../../components/hook-form';
import { getPrice } from '../../../../../utils/getPrice';
import { fCurrency } from '../../../../../utils/formatNumber';
import { RHFUploadMultiFile } from '../../../../../components/hook-form/RHFUpload';

// ----------------------------------------------------------------------

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
const MODELOS = ['303', '405', '510', 'Vestir', '407', '360', 'Chocolatera'];
const PUNTERA = ['Acero', 'Composite', 'Termoplastica'];
const PLANTARMAR = ['Costra', 'Fibra', 'Plantex'];
const FORRO = ['Castor', 'Cuero', 'S/Forro'];
const PLANTINTERNA = ['Antimicrobiano', 'Castor', 'Cuero', 'Poliuretano'];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

ProductNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function ProductNewForm({ isEdit, currentProduct }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    images: Yup.array().min(1, 'Images is required'),
    price: Yup.number().moreThan(0, 'Price should not be $0.00'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      modelos: MODELOS[0],
      description: currentProduct?.description || '',
      cuero: CUEROS[0],
      gomas: GOMAS[0],
      images: currentProduct?.images || [],
      puntera: PUNTERA[0],
      plantarmar: PLANTARMAR[0],
      forro: FORRO[0],
      plantinterna: PLANTINTERNA[0],
      price: currentProduct?.price || 0,
      priceSale: currentProduct?.priceSale || 0,
      plancha: false,
      lenguetacuero: false,
      aleteado: false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentProduct]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  const [referencePrice, setReferencePrice] = useState(getPrice('303'));

  useEffect(() => {
    if (isEdit && currentProduct) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProduct]);

  useEffect(() => {
    setReferencePrice(getPrice(getValues()));
  }, [values]);

  const onSubmit = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    acceptedFiles => {
      setValue(
        'images',
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setValue]
  );

  const handleRemoveAll = () => {
    setValue('images', []);
  };

  const handleRemove = file => {
    const filteredItems = values.images?.filter(_file => _file !== file);
    setValue('images', filteredItems);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="name" label="Nombre:" />
              <RHFSelect name="modelos" label="Modelo:">
                {MODELOS.map(model => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
                <option>Otro, especificar en descripcion</option>
              </RHFSelect>

              <div>
                <LabelStyle>Descripción</LabelStyle>
                <RHFEditor simple name="description" />
              </div>
              <RHFSelect name="cuero" label="Cuero:">
                {CUEROS.map(cuero => (
                  <option key={cuero} value={cuero}>
                    {cuero}
                  </option>
                ))}

                <option>Otro, especificar en descripcion</option>
              </RHFSelect>
              <RHFSelect name="gomas" label="Goma:">
                {GOMAS.map(goma => (
                  <option key={goma} value={goma}>
                    {goma}
                  </option>
                ))}
                <option>Otro, especificar en descripcion</option>
              </RHFSelect>

              <div>
                <LabelStyle>Images</LabelStyle>
                <RHFUploadMultiFile
                  name="images"
                  showPreview
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                />
              </div>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <RHFSwitch name="plancha" label="Plancha metálica" />
              <RHFSwitch name="aleteado" label="Aleteado" />
              <RHFSwitch name="lenguetacuero" label="Lenguetacuero" />

              <Stack spacing={3} mt={2}>
                <div>
                  <LabelStyle>Puntera</LabelStyle>
                  <RHFRadioGroup
                    name="puntera"
                    options={PUNTERA}
                    sx={{
                      '& .MuiFormControlLabel-root': { mr: 4 },
                    }}
                  />
                </div>
                <div>
                  <LabelStyle>Plantilla de Armar</LabelStyle>
                  <RHFRadioGroup
                    name="plantarmar"
                    options={PLANTARMAR}
                    sx={{
                      '& .MuiFormControlLabel-root': { mr: 4 },
                    }}
                  />
                </div>
                <div>
                  <LabelStyle>Forro</LabelStyle>
                  <RHFRadioGroup
                    name="forro"
                    options={FORRO}
                    sx={{
                      '& .MuiFormControlLabel-root': { mr: 4 },
                    }}
                  />
                </div>
                <div>
                  <LabelStyle>Plantilla Interna</LabelStyle>
                  <RHFRadioGroup
                    name="plantinterna"
                    options={PLANTINTERNA}
                    sx={{
                      '& .MuiFormControlLabel-root': { mr: 4 },
                    }}
                  />
                </div>
              </Stack>
            </Card>

            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mb={2}>
                <Typography>
                  <b>Precio estimado de compra:</b> {fCurrency(referencePrice)}
                </Typography>
                <Typography>
                  <b>Precio estimado de venta:</b> {fCurrency(referencePrice * 1.3)}
                </Typography>
              </Stack>
            </Card>

            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {!isEdit ? 'Crear pedido' : 'Guardar Cambios'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
