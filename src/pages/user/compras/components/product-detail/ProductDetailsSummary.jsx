import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// form
import { Controller, useForm } from 'react-hook-form';
// @mui
import { styled } from '@mui/material/styles';
import { Stack, Button, Divider, Typography } from '@mui/material';

// utils
import { fCurrency } from '../../../../../utils/formatNumber';
// components
import Iconify from '../../../../../components/Iconify';
import SocialsButton from '../../../../../components/SocialsButton';
import { ColorSinglePicker } from '../../../../../components/color-utils';
import { FormProvider } from '../../../../../components/hook-form';
import ProductPropiedadesTable from './ProductPropiedadesTable';
import { getDetail } from '../../../../../utils/getDetail';
import { useEffect, useState } from 'react';
import ProductAddSizesDialog from './ProductAddSizesDialog';
import { Box } from '@mui/system';
import useResponsive from '../../../../../hooks/useResponsive';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8),
  },
}));

// ----------------------------------------------------------------------

ProductDetailsSummary.propTypes = {
  cart: PropTypes.array,
  onAddCart: PropTypes.func,
  onGotoStep: PropTypes.func,
  product: PropTypes.any,
};

export default function ProductDetailsSummary({ cart, product, onAddCart, onGotoStep, ...other }) {
  const navigate = useNavigate();
  const isDesktop = useResponsive('up', 'sm');

  const { id, nombre, img, disponible, precio, colores, tallas, status = '' } = product;

  const [open, setOpen] = useState(false);
  const [sizes, setSizes] = useState([...Array(13)].map((el, i) => ({ size: i + 34, value: 0 })));
  const [isEmptySizes, setIsEmptySizes] = useState(false);

  const alreadyProduct = cart.map(item => item.nombre).includes(nombre);

  const isMaxQuantity = cart.filter(item => item.nombre === nombre).map(item => item.quantity)[0] >= disponible;

  const defaultValues = {
    id,
    nombre,
    img,
    disponible,
    precio,
    colores: colores[0],
    tallas: tallas[4],
    quantity: disponible < 1 ? 0 : 1,
  };

  const methods = useForm({
    defaultValues,
  });

  const { watch, control, handleSubmit } = methods;

  const values = watch();

  const onSubmit = async data => {
    try {
      if (!alreadyProduct) {
        onAddCart({
          ...data,
          subtotal: data.price * data.quantity,
        });
      }
      onGotoStep(0);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCart = async () => {
    try {
      onAddCart({
        ...values,
        subtotal: values.price * values.quantity,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const empty = sizes.every(el => {
      return el.value === 0;
    });
    if (!empty) setIsEmptySizes(true);
    else setIsEmptySizes(false);
  }, [sizes]);

  return (
    <RootStyle {...other}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Typography
          variant="overline"
          sx={{
            mt: 2,
            mb: 1,
            display: 'block',
            color: status === 'sale' ? 'error.main' : 'info.main',
          }}
        >
          {status}
        </Typography>

        <Stack direction="row" sx={{ mb: 3, justifyContent: 'space-between' }} spacing={5}>
          <Typography variant="h4" paragraph>
            {nombre}
          </Typography>
          <Typography variant="h5" component="span" color="error">
            {`C/F ${precio && fCurrency(precio / 0.93)}`}
          </Typography>
          <Typography variant="h5" component="span">
            {`S/F ${precio && fCurrency(precio)}`}
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 3 }}>
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
            Color
          </Typography>

          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <ColorSinglePicker
                colors={colores}
                value={field.value}
                onChange={field.onChange}
                sx={{
                  ...(colores.length > 4 && {
                    maxWidth: 144,
                    justifyContent: 'flex-end',
                  }),
                }}
              />
            )}
          />
        </Stack>
        <ProductPropiedadesTable rows={getDetail(product)} />

        <Divider sx={{ borderStyle: 'dashed' }} />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', pr: 2 }}>
          <ProductAddSizesDialog open={open} setOpen={setOpen} sizes={sizes} isEmptySizes={isEmptySizes} setSizes={setSizes} />
        </Box>

        <Stack direction={isDesktop ? 'row' : 'column'} spacing={2} sx={{ mt: 5 }}>
          <Button
            fullWidth
            disabled={isMaxQuantity}
            size="large"
            color="warning"
            variant="contained"
            startIcon={<Iconify icon={'ic:round-add-shopping-cart'} />}
            onClick={handleAddCart}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Añadir al carrito
          </Button>

          <Button fullWidth size="large" type="submit" variant="contained">
            Pedir ahora
          </Button>
        </Stack>

        <Stack alignItems="center" sx={{ mt: 3 }}>
          <SocialsButton initialColor />
        </Stack>
      </FormProvider>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------
