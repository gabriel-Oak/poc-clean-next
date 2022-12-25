import { Grid, Skeleton, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { FC } from 'react';

const CharacterSkeleton: FC = () => (
  <Box>
    <Grid container spacing={2}>
      <Grid item xs={12} md={5}>
        <Skeleton variant="rectangular" height={300} />
      </Grid>

      <Grid item xs={12} md={7}>
        <Box maxWidth={500}>
          <Skeleton variant="rounded" height={40} />
        </Box>

        <Box maxWidth={300} mt={3}>
          <Skeleton variant="text" />
        </Box>

        <Box maxWidth={350} mt={2}>
          <Skeleton variant="text" />
        </Box>

        <Box maxWidth={200} mt={2}>
          <Skeleton variant="text" />
        </Box>

        <Box maxWidth={300} mt={2}>
          <Skeleton variant="text" />
        </Box>

        <Box maxWidth={250} mt={2}>
          <Skeleton variant="text" />
        </Box>

        <Box maxWidth={300} mt={2}>
          <Skeleton variant="text" />
        </Box>
      </Grid>
    </Grid>
  </Box>
);

export default CharacterSkeleton;