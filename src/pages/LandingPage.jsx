import { Container, Box, Typography, Grid } from '@mui/material';

const LandingPage = () => {
  return (
    <Container maxWidth="false" sx={{ background: 'linear-gradient(87deg, #2dce89 0, #2dcecc 100%)' }}>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Box>
            <Typography variant="h3" color={'white'}>
              An integral solution for regenerative agriculture.
            </Typography>
            <Typography color="white">
              An initiative of the Regenerative Agriculture Program of Plan21 with the support of the Technological Institute of Costa Rica
              that is part of the projects supported by the IBM Sustainability Accelerator.
            </Typography>
            {/* <Button variant="text">Text</Button>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button> */}
          </Box>
        </Grid>
        <Grid item md={3}></Grid>
      </Grid>

      {/* <Grid container padding={5} spacing={5} sx={[{ textAlign: 'center', mt: 4 }]}>
        <Grid item xs={5} height="400">
          <Card sx={[{ '&:hover': { transform: 'translate(0, -20px)' } }, { height: '400px', boxShadow: 10, transition: 'transform .2s' }]}>
            <CardMedia sx={{ pt: 2, color: '#5e72e4' }}>{icon('ic_huellaCarbono')}</CardMedia>
            <CardContent>
              <Typography variant="h4" color={'#5e72e4'}>
                CARBON FOOTPRINT
              </Typography>
              <Typography>Our platform provides an interface capable of calculating the carbon footprint of your production.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={5} height="400">
          <Card sx={[{ '&:hover': { transform: 'translate(0, -20px)' } }, { height: '400px', boxShadow: 10, transition: 'transform .2s' }]}>
            <CardMedia sx={{ pt: 2, color: '#2dce89' }}>{icon('ic_evaporation')}</CardMedia>
            <CardContent>
              <Typography variant="h4" color={'#2dce89'}>
                EVAPOTRANSPIRATION
              </Typography>
              <Typography>
                Water is a limited resource, calculate the water consumption of your production, for better management.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={5} height="400">
          <Card sx={[{ '&:hover': { transform: 'translate(0, -20px)' } }, { height: '400px', boxShadow: 10, transition: 'transform .2s' }]}>
            <CardMedia sx={{ pt: 2, color: '#fb6340' }}>{icon('ic_lock')}</CardMedia>
            <CardContent>
              <Typography variant="h4" color={'#fb6340'}>
                CERTIFICATION
              </Typography>
              <Typography>
                Water is a limited resource, calculate the water consumption of your production, for better management.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={5} height="400">
          <Card sx={[{ '&:hover': { transform: 'translate(0, -20px)' } }, { height: '400px', boxShadow: 10, transition: 'transform .2s' }]}>
            <CardMedia sx={{ pt: 2, color: '#11cdef' }}>{icon('ic_lock')}</CardMedia>
            <CardContent>
              <Typography variant="h4" color={'#11cdef'}>
                CLIMATE (AGROLLY)
              </Typography>
              <Typography>
                Water is a limited resource, calculate the water consumption of your production, for better management.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid> */}
    </Container>
  );
};
export default LandingPage;
