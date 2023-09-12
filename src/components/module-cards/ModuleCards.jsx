import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { ModuleCard } from '../module-card/ModuleCard';

export const ModuleCards = ({ navConfig, size }) => {
  const user = navConfig(size);
  const modules = user;
  return (
    <>
      <Grid container spacing={4} sx={[{ textAlign: 'center', mt: 1 }]}>
        {modules[0].items.map((module, i) => (
          <ModuleCard key={i} title={module.title} icon={module.icon} path={module.path} />
        ))}
      </Grid>
    </>
  );
};
ModuleCards.propTypes = {
  navConfig: PropTypes.func,
  size: PropTypes.number,
};
