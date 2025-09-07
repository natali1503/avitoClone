import { Box, Skeleton } from '@mui/material';
//@ts-expect-error: for test
import React, { FC } from 'react';

import { FilterSkeleton } from './FilterSkeleton';
import { Wrapper } from '../../../../components/ui/Wrapper';
import { Header } from '../../../../components/ui/Header';
import { AdItemSkeleton } from '../adsList/AdItemSkeleton';

export const ListAnnouncementSkeleton: FC = () => {
  const dataToDisplay = Array(3).fill('');
  return (
    <Wrapper>
      <Header header='Список объявлений' />
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={'2rem'}
        flex={1}
        padding={' 2rem'}
        bgcolor={'rgba(245, 246, 245,0.4)'}
      >
        <Box display={'flex'} flexDirection={'row'} gap={'1.5rem'} justifyContent={'flex-end'}>
          <Skeleton width={'22rem'} height={'4.2rem'} variant='rectangular' sx={{ borderRadius: '4px' }} />
        </Box>

        <Box display={'flex'} flexDirection={'row'} gap={'1.5rem'}>
          <FilterSkeleton />
          <Box display={'flex'} flexDirection={'column'} gap={'1.5rem'} margin={'0 auto'}>
            {dataToDisplay && dataToDisplay.map((_, i) => <AdItemSkeleton key={+i} />)}
          </Box>
        </Box>
      </Box>
      <Box
        width={'100%'}
        height={'7.1rem'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        flexDirection={'row'}
        gap={'1px'}
      >
        <Skeleton width={'3.1rem'} height={'3.1rem'} variant='rectangular' sx={{ borderRadius: '4px' }} />
        <Skeleton width={'3.1rem'} height={'3.1rem'} variant='rectangular' sx={{ borderRadius: '4px' }} />
        <Skeleton width={'3.1rem'} height={'3.1rem'} variant='rectangular' sx={{ borderRadius: '4px' }} />
      </Box>
    </Wrapper>
  );
};
