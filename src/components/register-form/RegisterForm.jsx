import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import VisibilityIcon from '@mui/icons-material/Visibility';

// hooks
import useIsMountedRef from '../../hooks/useIsMountedRef';
// components
import { FormProvider, RHFTextField } from '../../components/hook-form';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/slices/auth';

// ----------------------------------------------------------------------

export function RegisterForm() {
  const isMountedRef = useIsMountedRef();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('Nombre requerido'),
    lastName: Yup.string().required('Apellido requerido'),
    email: Yup.string().email('Introduce un email válido').required('Email es requerido'),
    password: Yup.string()
      .min(8, 'Contraseña muy corta, al menos 8 caracteres')
      .matches(/\d+/, 'La contraseña debe contener al menos un número')
      .matches(/[a-z]+/, 'La contraseña debe contener al menos una letra minúscula')
      .matches(/[A-Z]+/, 'La contraseña debe contener al menos una letra mayúscula')
      .test('La contraseña tiene espacios', 'La contraseña no debe incluir espacios', value => !/\s+/.test(value))
      .required('La contraseña es requerida'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,

    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async data => {
    try {
      await dispatch(registerUser({ email: data.email, password: data.password, firstName: data.firstName, lastName: data.lastName }));
      console.log(data);
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="Nombre" />
          <RHFTextField name="lastName" label="Apellido" />
        </Stack>

        <RHFTextField name="email" label="Email" />

        <RHFTextField
          name="password"
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <VisibilityIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Registrar
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
