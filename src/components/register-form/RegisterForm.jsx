import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import VisibilityIcon from '@mui/icons-material/Visibility';

// components
import { FormProvider, RHFTextField } from '../../components/hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { hasError, registerUser } from '../../redux/slices/auth';
import { getValidationError } from '../../utils/getValidationError';

// ----------------------------------------------------------------------

export function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector(s => s.authSlice);

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
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = data => {
    dispatch(registerUser({ email: data.email, password: data.password, firstName: data.firstName, lastName: data.lastName })).then(
      data => {
        if (data.error) {
          console.log(data);
          setError('afterSubmit', data.error);
          dispatch(hasError(getValidationError(data.error.code)));
        } else navigate('/');
      }
    );
  };
  useEffect(() => {
    dispatch(hasError(false));
  }, []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

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
