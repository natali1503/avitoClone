import { Box, Skeleton } from '@mui/material';
//@ts-expect-error: for test
import React, { FC } from 'react';

export const AdItemSkeleton: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        borderRadius: '4px',
        border: '1px solid rgb(224,224,224)',
        padding: '2rem 4rem',
        gap: '8rem',
        alignItems: 'center',
      }}
    >
      <Skeleton width={'15rem'} height={'15rem'} variant='rectangular' sx={{ borderRadius: '10px' }} />

      <Box display={'flex'} flexDirection={'column'} gap={'0.5rem'} flex={1}>
        <Skeleton width={'33.2rem'} height={'7rem'} />
        <Skeleton width={'20rem'} height={'2rem'} />
        <Skeleton width={'12rem'} height={'2rem'} />
      </Box>

      <Skeleton width={'10.7rem'} height={'4.2rem'} variant='rectangular' sx={{ borderRadius: '4px' }} />
    </Box>
  );
};
