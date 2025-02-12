import { Box, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAnnouncements } from '../api-actions';
import { CustomButton } from '../components/CustomButton';
import { FiltersPanel } from '../components/FiltersPanel';
import { Item } from '../components/Item';
import { CustomPagination } from '../components/pagination/CustomPagination';
import { ListAnnouncementSkeleton } from '../components/Skeleton/ListAnnouncementSkeleton';
import { Title } from '../components/Title';
import { useFilters } from '../hooks/useFilters';
import { usePagination } from '../hooks/usePagination';
import { RouterPath } from '../router/routerPath';
import { AppDispatch, RootState } from '../store';

export function ListAnnouncement() {
  const { loading, data } = useSelector(
    (state: RootState) => state.announcements,
  );
  const dispatch = useDispatch<AppDispatch>();

  const { searchName, setSearchName, categories, setCategories, filteredData } =
    useFilters({
      adList: data,
    });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getAnnouncements(signal));
    return () => controller.abort();
  }, [dispatch]);

  const {
    currentPage,
    totalPages,
    indexOfLastItem,
    indexOfFirstItem,
    setCurrentPage,
  } = usePagination({
    quantityAd: filteredData.length || 0,
  });
  const dataToDispay = useMemo(() => {
    return filteredData?.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredData, indexOfLastItem, indexOfFirstItem]);

  return loading ? (
    <ListAnnouncementSkeleton />
  ) : (
    <Box display={'flex'} flexDirection={'column'} gap={'2rem'}>
      <Title title='Список объявлений' />
      <Box display={'flex'} flexDirection={'column'} gap={'2rem'}>
        <Box
          display={'flex'}
          flexDirection={'row'}
          gap={'1.5rem'}
          justifyContent={'space-between'}
        >
          <FiltersPanel
            searchName={searchName}
            setSearchName={setSearchName}
            categories={categories}
            setCategories={setCategories}
          />
          <CustomButton text='Разместить объявление' href={RouterPath.Form} />
        </Box>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          gap={'1.5rem'}
        >
          {dataToDispay &&
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
          {dataToDispay.length === 0 && (
            <Typography variant='h5'>
              Объявлений по выбранным параметрам нет
            </Typography>
          )}
        </Box>
      </Box>
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages || 0}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
}
