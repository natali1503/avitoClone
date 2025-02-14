import { useDispatch, useSelector } from 'react-redux';
//@ts-expect-error: for test
import React, { useEffect, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { ListAnnouncementSkeleton } from '../components/Skeleton/ListAnnouncementSkeleton';
import { CustomPagination } from '../components/pagination/CustomPagination';
import { CustomButton } from '../components/CustomButton';
import { FiltersPanel } from '../components/FiltersPanel';
import { usePagination } from '../hooks/usePagination';
import { getAnnouncements } from '../api-actions';
import { RouterPath } from '../router/routerPath';
import { AppDispatch, RootState } from '../store';
import { useFilters } from '../hooks/useFilters';
import { Title } from '../components/Title';
import { Item } from '../components/Item';

export function ListAnnouncement() {
  const { loading, data } = useSelector((state: RootState) => state.announcements);
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

  const dataToDispay = useMemo(() => {
    return filteredData?.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredData, indexOfLastItem, indexOfFirstItem]);

  const isData = !!data;
  const isDataToDispay = dataToDispay.length > 0;

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
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} gap={'1.5rem'}>
          {isDataToDispay &&
            dataToDispay.map((item) => (
              <Item
                key={item.id}
                id={item.id}
                name={item.name}
                location={item.location}
                type={item.type}
                photo={item.photo}
              />
            ))}
          {notFoundData && <Typography variant='h5'>Объявлений по выбранным параметрам нет</Typography>}
          {!isData && <Typography variant='h5'>Пока объявлений нет</Typography>}
        </Box>
      </Box>

      <CustomPagination currentPage={currentPage} totalPages={totalPages || 0} setCurrentPage={setCurrentPage} />
    </Box>
  );
}
