import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useNavigationType } from 'react-router-dom';
import { useEffect, useLayoutEffect, useMemo } from 'react';

import { AppDispatch, RootState } from '../../../store';
import { getAnnouncements } from '../../../api/api-actions';
import { useDraft } from '../../../hooks/useDraft';
import { usePagination } from '../../../hooks/usePagination';
import { RouterPath } from '../../../router/routerPath';

import { useFilters } from './useFilters';

export const useAdsBoard = () => {
  const { loading, data } = useSelector((state: RootState) => {
    return state.announcements;
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const navigationType = useNavigationType();

  const { filteredData, notFoundData } = useFilters(data);
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

  const handleCreateAd = () => {
    navigate(RouterPath.Form);
  };

  return {
    adData: {
      loading,
      dataToDisplay,
      notFoundData,
    },
    pagination: { currentPage, totalPages, setCurrentPage },
    handleCreateAd,
  };
};
