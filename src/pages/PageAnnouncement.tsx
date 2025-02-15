import { Box } from '@mui/material';

import { PageAnnouncementSkeleton } from '../components/Skeleton/PageAnnouncementSkeleton';
import { DetailsAd } from '../components/DetailsAd';
import { useDetailsAd } from '../hooks/useDetailsAd';
import { Title } from '../components/Title';

export function PageAnnouncement() {
  const { loading, dataToDisplay, id } = useDetailsAd();

  return loading ? (
    <PageAnnouncementSkeleton />
  ) : (
    <Box display={'flex'} flexDirection={'column'} gap={'5rem'}>
      <Title title={'Страница объявления'} />
      {dataToDisplay && <DetailsAd dataToDisplay={dataToDisplay} id={id || ''} />}
    </Box>
  );
}
