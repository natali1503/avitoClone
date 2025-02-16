import { useDispatch, useSelector } from 'react-redux';
//@ts-expect-error: for test
import React, { FC, useEffect, useLayoutEffect, useMemo } from 'react';
import { useNavigate, useNavigationType } from 'react-router-dom';
import { Box } from '@mui/material';

import { ListAnnouncementSkeleton } from '../components/Skeleton/ListAnnouncementSkeleton';
import { CustomPagination } from '../components/pagination/CustomPagination';
import { FiltersPanel } from '../components/FiltersPanel/FiltersPanel';
import { ListItems } from '../components/ListAnnouncement/ListItems';
import { CustomButton } from '../components/CustomButton';
import { usePagination } from '../hooks/usePagination';
import { getAnnouncements } from '../api/api-actions';
import { RouterPath } from '../router/routerPath';
import { AppDispatch, RootState } from '../store';
import { useFilters } from '../hooks/useFilters';
import { Title } from '../components/Title';
import { useDraft } from '../hooks/useDraft';

export const ListAnnouncement: FC = () => {
  const { loading } = useSelector((state: RootState) => {
    return state.announcements;
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const { filteredData, notFoundData } = useFilters();
  const { currentPage, totalPages, indexOfLastItem, indexOfFirstItem, setCurrentPage } = usePagination({
    quantityAd: filteredData.length || 0,
  });
  //Получение всех объявлений
  useLayoutEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getAnnouncements(signal));
    return () => controller.abort();
  }, [dispatch]);

  const { clearDraft } = useDraft();
  const dataToDisplay = useMemo(() => {
    return filteredData?.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredData, indexOfLastItem, indexOfFirstItem]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredData, setCurrentPage]);

  useEffect(() => {
    if (navigationType === 'POP') {
      clearDraft();
    }
  }, [navigationType, clearDraft]);

  return loading ? (
    <ListAnnouncementSkeleton />
  ) : (
    <Box display={'flex'} flexDirection={'column'} gap={'2rem'}>
      <Title title='Список объявлений' />
      <Box display={'flex'} flexDirection={'column'} gap={'2rem'} flex={1}>
        <Box display={'flex'} flexDirection={'row'} gap={'1.5rem'} justifyContent={'flex-end'}>
          <CustomButton
            text='Разместить объявление'
            dataTestId='creatingAd'
            onClick={() => navigate(RouterPath.Form)}
          />
        </Box>
        <Box display={'flex'} flexDirection={'row'} gap={'1.5rem'}>
          <FiltersPanel />

          <ListItems dataToDisplay={dataToDisplay} notFoundData={notFoundData} />
        </Box>
      </Box>

      <CustomPagination currentPage={currentPage} totalPages={totalPages || 0} setCurrentPage={setCurrentPage} />
    </Box>
  );
};
