import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useLayoutEffect, useMemo } from 'react';

import { AppDispatch, RootState } from '../../../store';
import { getAnnouncements } from '../../../api/api-actions';
import { usePagination } from '../../../hooks/usePagination';
import { RouterPath } from '../../../router/routerPath';

import { useFilters } from './useFilters';

export const useAdsBoard = () => {
  const { loading, data } = useSelector((state: RootState) => {
    return state.announcements;
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { filteredData, notFoundData, ...rest } = useFilters(data);
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

  const dataToDisplay = useMemo(() => {
    return filteredData?.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredData, indexOfLastItem, indexOfFirstItem]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredData, setCurrentPage]);

  const handleCreateAd = () => {
    navigate(RouterPath.CreateAd);
  };

  return {
    adData: {
      loading,
      dataToDisplay,
      notFoundData,
    },
    pagination: { currentPage, totalPages, setCurrentPage },
    handleCreateAd,
    ...rest,
  };
};
