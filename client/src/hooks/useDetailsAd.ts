import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { AppDispatch, RootState } from '../store';
import { getAdById } from '../api/api-actions';
import { formattingDataForOutput } from '../store/adInfoSlice';

export function useDetailsAd() {
  const params = useParams();
  const { loading, dataToDisplay, data } = useSelector((state: RootState) => state.adInfo);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const controller = new AbortController();
    if (params.id) {
      const signal = controller.signal;
      dispatch(getAdById({ id: params.id, signal }));
    }
    return () => controller.abort();
  }, [dispatch, params.id]);

  useEffect(() => {
    if (data) dispatch(formattingDataForOutput());
  }, [dispatch, data]);

  return {
    loading,
    dataToDisplay,
    id: params.id,
  };
}
