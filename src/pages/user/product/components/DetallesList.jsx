import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Iconify from '../../../../components/Iconify';
import { Box, Grid, Stack } from '@mui/material';
import { ColorPreview } from '../../../../components/color-utils';

export default function DetallesList({ detalles }) {
  const { colores, plantillaArmar, plantillaInterna, lengueta, otros, puntera, cuero, goma, aleteado, forro, plancha } = detalles;

  const lista = [
    {
      nombre: puntera,
      mostrar: Boolean(puntera),
      secondary: 'Puntera',
      icon: 'streamline:interface-security-shield-4-shield-protection-security-defend-crime-war-cover',
    },
    {
      nombre: plantillaArmar,
      mostrar: Boolean(plantillaArmar),
      secondary: 'Plantilla de armar',
      icon: 'openmoji:footprints',
    },
    {
      nombre: cuero,
      mostrar: Boolean(cuero),
      secondary: 'Cuero',
      icon: 'healthicons:animal-cow',
    },
    {
      nombre: goma,
      mostrar: Boolean(goma),
      secondary: 'Goma',
      icon: 'ri:footprint-fill',
    },
    {
      nombre: plantillaInterna,
      mostrar: Boolean(plantillaArmar),
      secondary: 'Plantilla interna',
      icon: 'fluent-emoji-high-contrast:footprints',
    },
    {
      nombre: lengueta,
      mostrar: Boolean(lengueta),
      secondary: 'Lengueta',
      icon: 'fluent-emoji-high-contrast:hiking-boot',
    },
    {
      nombre: forro,
      mostrar: Boolean(forro),
      secondary: 'Forro',
      icon: 'mdi:fabric-outline',
    },
    {
      nombre: lengueta,
      mostrar: Boolean(lengueta),
      secondary: 'Lengueta',
      icon: 'jam:triangle-f',
    },
    {
      nombre: 'Plancha metálica',
      mostrar: Boolean(plancha),
      secondary: 'Acero',
      icon: 'game-icons:metal-bar',
    },
    {
      nombre: 'Aleteado',
      mostrar: Boolean(aleteado),
      secondary: '',
      icon: 'game-icons:fluffy-wing',
    },
    {
      nombre: 'Otros',
      mostrar: Boolean(otros),
      secondary: otros,
      icon: 'icon-park-outline:other',
    },
  ];

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', display: 'flex', justifyContent: 'center' }}>
      <Grid container spacing={1}>
        {lista.map(
          (el, i) =>
            el.mostrar && (
              <Grid item xs={12} md={6} key={i}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Iconify icon={el.icon} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={el.nombre} secondary={el.secondary} />
                </ListItem>
              </Grid>
            )
        )}
        <Grid item xs={12} md={6}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Iconify icon={'material-symbols:invert-colors-outline'} />
              </Avatar>
            </ListItemAvatar>
            <Stack m={0} p={0}>
              <Box component="span" sx={{ fontWeight: 600 }}>
                Colores
              </Box>
              <ColorPreview colors={colores} />
            </Stack>
          </ListItem>
        </Grid>
      </Grid>
    </List>
  );
}
DetallesList.propTypes = {
  detalles: PropTypes.object,
};
