import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { PageAnnouncementSkeleton } from '../components/Skeleton/PageAnnouncementSkeleton';
import { useDetailsAd } from '../hooks/useDetailsAd';
import { DetailsAd } from '../components/DetailsAd';
import { Wrapper } from '../components/UI/Wrapper';
import { Header } from '../components/UI/Header';
import { reset } from '../store/adInfoSlice';
import { AppDispatch } from '../store';

export const PageAnnouncement: FC = () => {
  const { loading, dataToDisplay, id } = useDetailsAd();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return loading ? (
    <PageAnnouncementSkeleton />
  ) : (
    <Wrapper>
      <Box
        display='flex'
        flexDirection='column'
        flexGrow={1}
        sx={{
          opacity: 0,
          animation: 'fadeIn 0.3s ease-in forwards',
          '@keyframes fadeIn': {
            to: { opacity: 1 },
          },
        }}
      >
        <Header header='Страница объявления' />
        {dataToDisplay && <DetailsAd dataToDisplay={dataToDisplay} id={id || ''} />}
      </Box>
    </Wrapper>
  );
};
