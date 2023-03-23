import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import VisibilityIcon from '@mui/icons-material/Visibility';
// routes
// components
import { FormProvider, RHFTextField, RHFCheckbox } from '../../components/hook-form';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../redux/slices/auth';
// utils
import { getValidationError } from '../../utils/getValidationError';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'admin@orion.com',
    password: 'Admin1234',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = data => {
    dispatch(fetchUser({ email: data.email, password: data.password })).then(e => {
      if (e.error) {
        reset();
        if (e.error.code === 'auth/network-request-failed') {
          setError('beforeSubmit', { type: e.error.code, message: getValidationError(e.error.code) });
          return;
        }
        setError('afterSubmit', { type: e.error.code, message: getValidationError(e.error.code) });
      } else navigate('/dashboard/usuario');
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        {!!errors.beforeSubmit && <Alert severity="error">{errors.beforeSubmit.message}</Alert>}

        <RHFTextField name="email" label="Correo electrónico" />

        <RHFTextField
          name="password"
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <VisibilityIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Recordar" />
        <Link component={RouterLink} variant="subtitle2" to="/">
          ¿Olvidaste la Contraseña?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}
