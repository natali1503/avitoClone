import { Box, Skeleton } from '@mui/material';
//@ts-expect-error: for test
import React, { FC } from 'react';

export const FilterSkeleton: FC = () => {
  return (
    <Box
      sx={{
        padding: '2rem 2rem',
        height: 'max-content',
        borderRadius: '4px',
        border: '1px solid rgb(224,224,224)',
        boxShadow: 'none',
      }}
    >
      <Box display={'flex'} flexDirection={'column'} gap={'2.5rem'}>
        <Skeleton width={'30rem'} height={'3.2rem'} variant='rectangular' sx={{ borderRadius: '10px' }} />

        <Skeleton width={'30rem'} height={'3.2rem'} variant='rectangular' sx={{ borderRadius: '10px' }} />
        <Skeleton width={'30rem'} height={'3.2rem'} variant='rectangular' sx={{ borderRadius: '10px' }} />
        <Box></Box>
        <Skeleton width={'30rem'} height={'4.2rem'} variant='rectangular' sx={{ borderRadius: '4px' }} />
      </Box>
    </Box>
  );
};
