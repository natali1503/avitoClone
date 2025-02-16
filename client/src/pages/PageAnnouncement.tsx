import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { PageAnnouncementSkeleton } from '../components/Skeleton/PageAnnouncementSkeleton';
import { DetailsAd } from '../components/DetailsAd';
import { useDetailsAd } from '../hooks/useDetailsAd';
import { Title } from '../components/Title';
import { AppDispatch } from '../store';
import { reset } from '../store/adInfoSlice';

export function PageAnnouncement() {
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
    <Box display={'flex'} flexDirection={'column'} gap={'5rem'}>
      <Title title={'Страница объявления'} />
      {dataToDisplay && <DetailsAd dataToDisplay={dataToDisplay} id={id || ''} />}
    </Box>
  );
}
