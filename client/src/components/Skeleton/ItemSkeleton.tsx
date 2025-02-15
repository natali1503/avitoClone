import { Box, Skeleton } from '@mui/material';
//@ts-expect-error: for test
import React from 'react';

export function ItemSkeleton() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        borderRadius: '4px',
        border: '1px solid rgb(224,224,224)',
        justifyContent: 'space-around',
        padding: '20px 30px',
        gap: '5rem',
        alignItems: 'center',
      }}
    >
      <Skeleton width={'8rem'} height={'8rem'} variant='rectangular' sx={{ borderRadius: '10px' }} />

      <Box display={'flex'} flexDirection={'column'} gap={'5px'}>
        <Skeleton width={'17rem'} height={'2rem'} />
        <Skeleton width={'15rem'} height={'2rem'} />
        <Skeleton width={'12rem'} height={'2rem'} />
      </Box>

      <Skeleton width={'6.5rem'} height={'4.2rem'} variant='rectangular' sx={{ borderRadius: '4px' }} />
    </Box>
  );
}
