import { Grid } from '@mui/material';
import navConfig from '../../layouts/dashboard/navbar/NavConfig';
import { ModuleCard } from '../module-card/ModuleCard';

export const ModuleCards = () => {
  const user = navConfig(100);
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
