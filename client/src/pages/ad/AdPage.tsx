import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useDetailsAd } from '../../hooks/useDetailsAd';
import { AdDetails } from './ui/AdDetails';
import { Wrapper } from '../../components/ui/Wrapper';
import { Header } from '../../components/ui/Header';
import { resetDetailsAd } from '../../store/adInfoSlice';
import { AppDispatch } from '../../store';
import { AdDetailsSkeleton } from './ui/skeleton/AdDetailsSkeleton';
import { AdNotFound } from './ui/AdNotFound';

export const AdPage: FC = () => {
  const { loading, dataToDisplay, id } = useDetailsAd();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    return () => {
      if (dataToDisplay) dispatch(resetDetailsAd());
    };
  }, [dispatch]);

  return loading ? (
    <AdDetailsSkeleton />
  ) : (
    <Wrapper>
      <Box
        display='flex'
        flexDirection='column'
        flexGrow={1}
        height={'100%'}
        sx={{
          opacity: 0,
          animation: 'fadeIn 0.3s ease-in forwards',
          '@keyframes fadeIn': {
            to: { opacity: 1 },
          },
        }}
      >
        <Header header='Страница объявления' />
        <Box sx={{ flex: 1, display: 'flex' }}>
          {dataToDisplay && id && <AdDetails dataToDisplay={dataToDisplay} id={id} />}
          {(!dataToDisplay || !id) && <AdNotFound />}
        </Box>
      </Box>
    </Wrapper>
  );
};
