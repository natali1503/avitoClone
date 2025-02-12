import { Box, Skeleton } from '@mui/material';
import { FC } from 'react';

import { Title } from '../Title';

import { ItemSkeleton } from './ItemSkeleton';

export const ListAnnouncementSkeleton: FC = () => {
  const dataToDispay = Array(5).fill('');
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'2rem'}>
      <Title title='Список объявлений' />
      <Box display={'flex'} flexDirection={'column'} gap={'2rem'}>
        <Box
          display={'flex'}
          flexDirection={'row'}
          gap={'1.5rem'}
          justifyContent={'space-between'}
        >
          <Skeleton
            width={'70rem'}
            height={'3rem'}
            variant='rectangular'
            sx={{ borderRadius: '4px' }}
          />
          <Skeleton
            width={'10rem'}
            height={'3rem'}
            variant='rectangular'
            sx={{ borderRadius: '4px' }}
          />
        </Box>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          gap={'1.5rem'}
        >
          {dataToDispay &&
            dataToDispay.map((_, i) => <ItemSkeleton key={+i} />)}
        </Box>
      </Box>
      <Skeleton
        width={'80rem'}
        height={'2.5rem'}
        variant='rectangular'
        sx={{ borderRadius: '4px' }}
      />
    </Box>
  );
};
