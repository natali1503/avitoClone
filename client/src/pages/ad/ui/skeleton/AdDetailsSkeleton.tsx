import { Box, Skeleton } from '@mui/material';
import { FC } from 'react';

import { Wrapper } from '../../../../components/tempName/Wrapper';
import { Header } from '../../../../components/tempName/Header';

export const AdDetailsSkeleton: FC = () => {
  const fields = Array(8).fill('');

  return (
    <Wrapper>
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={'5rem'}
        // sx={{
        //   opacity: 1,
        //   animation: 'fadeOut 0.3s ease-in forwards',
        //   '@keyframes fadeOut': {
        //     to: { opacity: 0 },
        //   },
        // }}
      >
        <Header header='Страница объявления' />
        <Box display={'flex'} flexDirection={'row'} gap={'5rem'} data-testid='detailsAd' padding={'0 4rem'}>
          <Box width={'30rem'} height={'30rem'}>
            <Skeleton width={'30rem'} height={'30rem'} variant='rectangular' sx={{ borderRadius: '4px' }} />
          </Box>
          <Box display={'flex'} flexDirection={'column'} gap={'2rem'} minWidth={'25rem'} flex={1}>
            {fields.map((_, i) => (
              <Box key={+i} display={'flex'} flexDirection={'column'} gap={'1rem'}>
                <Skeleton width={'15rem'} height={'2.9rem'} variant='rectangular' />
                <Skeleton width={'27rem'} height={'2.6rem'} variant='rectangular' />
              </Box>
            ))}
          </Box>
          <Box display={'flex'} flexDirection={'column'} gap={'2rem'}>
            <Skeleton width={'18rem'} height={'4.2rem'} variant='rectangular' />
            <Skeleton width={'18rem'} height={'4.2rem'} variant='rectangular' />
          </Box>
        </Box>
      </Box>
    </Wrapper>
  );
};
