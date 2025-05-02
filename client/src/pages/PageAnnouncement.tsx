import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { PageAnnouncementSkeleton } from '../components/Skeleton/PageAnnouncementSkeleton';
import { useDetailsAd } from '../hooks/useDetailsAd';
import { DetailsAd } from '../components/DetailsAd';
import { Wrapper } from '../components/Wrapper';
import { Header } from '../components/Header';
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
      <Box display={'flex'} flexDirection={'column'} gap={'5rem'}>
        <Header header='Страница объявления' />
        {dataToDisplay && <DetailsAd dataToDisplay={dataToDisplay} id={id || ''} />}
      </Box>
    </Wrapper>
  );
};
