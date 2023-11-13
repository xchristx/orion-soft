// @mui
import { Grid, Skeleton } from '@mui/material';

// ----------------------------------------------------------------------

export default function SkeletonVenta() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Skeleton variant="text" height={56} sx={{ borderRadius: 1 }} />
      </Grid>
      {[1, 2, 3].map(el => (
        <Grid key={el} item xs={6} md={4}>
          <Skeleton variant="rectangular" sx={{ borderRadius: 1 }} height={56} />
        </Grid>
      ))}
      {[1, 2, 3, 4, 5, 6].map(el => (
        <Grid key={el} item xs={12} md={6}>
          <Skeleton variant="rectangular" sx={{ borderRadius: 1 }} height={56} />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Skeleton variant="text" height={56} sx={{ borderRadius: 1 }} />
      </Grid>
    </Grid>
  );
}
