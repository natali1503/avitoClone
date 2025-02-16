import { Box, Skeleton } from '@mui/material';
//@ts-expect-error: for test
import React, { FC } from 'react';

import { Title } from '../Title';

import { ItemSkeleton } from './ItemSkeleton';
import { FilterSkeleton } from './FilterSkeleton';

export const ListAnnouncementSkeleton: FC = () => {
  const dataToDisplay = Array(5).fill('');
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'2rem'}>
      <Title title='Список объявлений' />
      <Box display={'flex'} flexDirection={'column'} gap={'2rem'}>
        <Box display={'flex'} flexDirection={'row'} gap={'1.5rem'} justifyContent={'flex-end'}>
          <Skeleton width={'10rem'} height={'3rem'} variant='rectangular' sx={{ borderRadius: '4px' }} />
        </Box>

        <Box display={'flex'} flexDirection={'row'} gap={'1.5rem'}>
          <FilterSkeleton />
          <Box display={'flex'} flexDirection={'column'} gap={'1.5rem'} margin={'0 auto'}>
            {dataToDisplay && dataToDisplay.map((_, i) => <ItemSkeleton key={+i} />)}
          </Box>
        </Box>
      </Box>
      <Skeleton width={'100%'} height={'2.5rem'} variant='rectangular' sx={{ borderRadius: '4px' }} />
    </Box>
  );
};
