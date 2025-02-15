import { useDispatch, useSelector } from 'react-redux';
//@ts-expect-error: for test
import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

import { ListAnnouncementSkeleton } from '../components/Skeleton/ListAnnouncementSkeleton';
import { CustomPagination } from '../components/pagination/CustomPagination';
import { CustomButton } from '../components/CustomButton';
import { FiltersPanel } from '../components/FiltersPanel';
import { usePagination } from '../hooks/usePagination';
import { RouterPath } from '../router/routerPath';
import { AppDispatch, RootState } from '../store';
import { useFilters } from '../hooks/useFilters';
import { Title } from '../components/Title';
import { getAnnouncements } from '../store/announcementsSlice';
import { ListItems } from '../components/ListAnnouncement/ListItems';
// import { getAnnouncements } from '../api-actions';

export function ListAnnouncement() {
  const { loading, data } = useSelector((state: RootState) => {
    return state.announcements;
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { searchName, setSearchName, categories, setCategories, filteredData, notFoundData } = useFilters({
    adList: data,
  });
  const { currentPage, totalPages, indexOfLastItem, indexOfFirstItem, setCurrentPage } = usePagination({
    quantityAd: filteredData.length || 0,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getAnnouncements(signal));
    return () => controller.abort();
  }, [dispatch]);

  const dataToDisplay = useMemo(() => {
    return filteredData?.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredData, indexOfLastItem, indexOfFirstItem]);

  return loading ? (
    <ListAnnouncementSkeleton />
  ) : (
    <Box display={'flex'} flexDirection={'column'} gap={'2rem'}>
      <Title title='Список объявлений' />
      <Box display={'flex'} flexDirection={'column'} gap={'2rem'}>
        <Box display={'flex'} flexDirection={'row'} gap={'1.5rem'} justifyContent={'space-between'}>
          <FiltersPanel
            searchName={searchName}
            setSearchName={setSearchName}
            categories={categories}
            setCategories={setCategories}
          />
          <CustomButton
            text='Разместить объявление'
            dataTestId='creatingAd'
            onClick={() => navigate(RouterPath.Form)}
          />
        </Box>
        <ListItems dataToDisplay={dataToDisplay} notFoundData={notFoundData} />
      </Box>

      <CustomPagination currentPage={currentPage} totalPages={totalPages || 0} setCurrentPage={setCurrentPage} />
    </Box>
  );
}
