import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// form
import { Controller, useForm } from 'react-hook-form';
// @mui
import { styled } from '@mui/material/styles';
import { Stack, Button, Divider, Typography, Radio, RadioGroup, FormControlLabel } from '@mui/material';
//
import { v4 as uuid } from 'uuid';
// components
import Iconify from '../../../../../components/Iconify';
import { ColorSinglePicker } from '../../../../../components/color-utils';
import { FormProvider } from '../../../../../components/hook-form';
import ProductPropiedadesTable from './ProductPropiedadesTable';
import { getDetail } from '../../../../../utils/getDetail';
import { useEffect, useState } from 'react';
import ProductAddSizesDialog from './ProductAddSizesDialog';
import { Box } from '@mui/system';
import useResponsive from '../../../../../hooks/useResponsive';
import { useDispatch } from 'react-redux';
import { setCantidadProduct } from '../../../../../redux/slices/product';
import { fCurrency } from '../../../../../utils/formatNumber';

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

export default function ProductDetailsSummary({ cart, product, onAddCart, ...other }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDesktop = useResponsive('up', 'sm');

  const { nombre, img, disponible, precio, colores, tallas, status = '', cantidad } = product;
  const uid = uuid();

  const [open, setOpen] = useState(false);
  const [isEmptySizes, setIsEmptySizes] = useState(false);
  const [sizes, setSizes] = useState(tallas);
  const [iva, setIva] = useState(false);

  const defaultValues = {
    precio,
    color: colores[0],
  };

  const methods = useForm({
    defaultValues,
  });

  const { watch, control, handleSubmit } = methods;

  const values = watch();

  const onSubmit = async data => {
    try {
      onAddCart({
        ...data,
        ...product,
        subtotal: data.precio * cantidad,
        tallas: sizes,
        cantidad,
        uid,
        iva,
        nombre,
        img,
        disponible,
      });
      setSizes(tallas);
      navigate('/dashboard/usuario/compras/checkout');
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCart = async () => {
    try {
      onAddCart({
        ...values,
        subtotal: values.precio * cantidad,
        tallas: sizes,
        cantidad,
        uid,
        iva,
        nombre,
        img,
        disponible,
      });
      setSizes(tallas);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const empty = sizes.every(el => {
      return el.value === 0;
    });
    if (!empty) {
      setIsEmptySizes(true);
    } else {
      setIsEmptySizes(false);
    }
    const quantity = sizes.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);
    dispatch(setCantidadProduct(quantity));
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
          <Stack direction="row" spacing={2}>
            <Typography variant="h5" component="span">
              Precio:
            </Typography>
            <Controller
              name="precio"
              control={control}
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <Stack onClick={() => setIva(false)}>
                    <Typography component="span" sx={{ pl: 1.5, m: 0 }}>
                      s/iva
                    </Typography>
                    <FormControlLabel sx={{ p: 0, m: 0 }} value={precio} label={fCurrency(precio)} control={<Radio />} />
                  </Stack>
                  <Divider sx={{ m: 1 }} orientation="vertical" variant="middle" flexItem />
                  <Stack onClick={() => setIva(true)}>
                    <Typography>c/iva</Typography>
                    <FormControlLabel value={Math.round(precio / 0.93)} label={fCurrency(Math.round(precio / 0.93))} control={<Radio />} />
                  </Stack>
                </RadioGroup>
              )}
            />
          </Stack>
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
          <ProductAddSizesDialog open={open} setOpen={setOpen} sizes={sizes} setSizes={setSizes} isEmptySizes={isEmptySizes} />
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction={isDesktop ? 'row' : 'column'} spacing={2} sx={{ mt: 5 }}>
          <Button
            fullWidth
            disabled={!isEmptySizes}
            size="large"
            color="warning"
            variant="contained"
            startIcon={<Iconify icon={'ic:round-add-shopping-cart'} />}
            onClick={handleAddCart}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Añadir al carrito
          </Button>

          <Button disabled={!(isEmptySizes && cantidad && precio)} fullWidth size="large" type="submit" variant="contained">
            Pedir ahora
          </Button>
        </Stack>
      </FormProvider>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------
