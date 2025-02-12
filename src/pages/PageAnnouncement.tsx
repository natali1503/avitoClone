import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { getAdById } from '../api-actions';
import { CustomButton } from '../components/CustomButton';
import { ImageWithPlaceholder } from '../components/Image';
import { PageAnnouncementSkeleton } from '../components/Skeleton/PageAnnouncementSkeleton';
import { Title } from '../components/Title';
import { RouterPath } from '../router/routerPath';
import { AppDispatch, RootState } from '../store';
import { formattingDataForOutput } from '../store/adInfoSlice';

export function PageAnnouncement() {
  const idUrl = useParams();
  const { loading, dataToDisplay, data } = useSelector(
    (state: RootState) => state.adInfo,
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    if (idUrl.id) {
      const signal = controller.signal;
      dispatch(getAdById({ id: idUrl.id, signal }));
    }
    return () => controller.abort();
  }, [dispatch, idUrl.id]);

  useEffect(() => {
    if (data) dispatch(formattingDataForOutput());
  }, [dispatch, data]);

  return loading ? (
    <PageAnnouncementSkeleton />
  ) : (
    <Box display={'flex'} flexDirection={'column'} gap={'5rem'}>
      <Title title={'Страница объявления'} />
      <Box display={'flex'} flexDirection={'row'} gap={'5rem'}>
        <Box width={'30rem'} height={'30rem'}>
          <ImageWithPlaceholder
            src={(dataToDisplay && dataToDisplay.photo) || ''}
            alt={`Изображение по объявлению ${dataToDisplay?.data[0].value}`}
          />
        </Box>
        <Box display={'flex'} flexDirection={'column'} gap={'2rem'}>
          {dataToDisplay &&
            dataToDisplay.data.map((el, i) => (
              <Box
                key={+i}
                display={'flex'}
                flexDirection={'column'}
                gap={'0.5rem'}
              >
                <Typography variant='h5'>{el?.fieldName}</Typography>
                <Typography>{el?.value}</Typography>
              </Box>
            ))}
        </Box>
        <CustomButton
          text='Редактировать'
          onClick={() => {
            navigate(RouterPath.Form, { state: { id: idUrl.id } });
          }}
        />
      </Box>
    </Box>
  );
}
