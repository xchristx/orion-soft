import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Box } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Logo2 from '../../assets/mainviewImg/orion-logo.jpg';
import LoginForm from '../../components/loginForm/LoginForm';
import { Link as RouterLink } from 'react-router-dom';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> Login | orion </title>
      </Helmet>

      <StyledRoot>
        <Box sx={{ px: 2.5, py: 2, position: 'fixed', objectFit: 'cover' }}>
          <img height="70px" src={Logo2} alt="ivy-logo" />
        </Box>

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hola, bienvenido
            </Typography>
            <Box component="img" src="/src/assets/mainviewImg/toro.png" alt="login" maxHeight={500} />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Orion Soft
            </Typography>

            <Typography variant="body2" sx={{ mb: 5 }}>
              ¿Aun no tienes una cuenta? {'  '}
              <Link component={RouterLink} to="/register" variant="subtitle2">
                Empecemos
              </Link>
            </Typography>
            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
