import { Box, Skeleton } from '@mui/material';
import { FC } from 'react';

import { Title } from '../Title';

export const PageAnnouncementSkeleton: FC = () => {
  const fields = Array(8).fill('');

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'5rem'}>
      <Title title={'Страница объявления'} />
      <Box display={'flex'} flexDirection={'row'} gap={'5rem'}>
        <Box width={'30rem'} height={'30rem'}>
          <Skeleton
            width={'30rem'}
            height={'30rem'}
            variant='rectangular'
            sx={{ borderRadius: '10px' }}
          />
        </Box>
        <Box display={'flex'} flexDirection={'column'} gap={'2rem'}>
          {fields.map((_, i) => (
            <Box
              key={+i}
              display={'flex'}
              flexDirection={'column'}
              gap={'0.5rem'}
            >
              <Skeleton width={'15rem'} height={'2rem'} />
              <Skeleton width={'17rem'} height={'1.4rem'} />
            </Box>
          ))}
        </Box>
        <Skeleton width={'10.5rem'} height={'4.2rem'} />
      </Box>
    </Box>
  );
};
