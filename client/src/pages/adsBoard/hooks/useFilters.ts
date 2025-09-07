import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useEffect, useMemo } from 'react';

import {
  resetFilteredData,
  resetFilters,
  setAdditionalFiltersState,
  setCategories,
  setFilteredData,
  setSearchName,
} from '../../../store/filtersSlice';
import { CategoriesValues } from '../../../general/FormField/Categories';
import { filterAdList } from '../../../utils/filterAdList';
import { AppDispatch, RootState } from '../../../store';
import { TAdResponse } from '../../../entities/ad/types';

export function useFilters(adData: TAdResponse[]) {
  const dispatch = useDispatch<AppDispatch>();
  const {
    searchName,
    categories,
    listAdditionalFilters,
    additionalFiltersState,
    filteredData: savedFilteredData,
  } = useSelector((state: RootState) => state.filters, shallowEqual);

  const filteredData: TAdResponse[] | [] = useMemo(() => {
    if (!adData || adData.length === 0) return [];
    if (savedFilteredData.length) return savedFilteredData;
    return filterAdList(adData, searchName, categories, additionalFiltersState, listAdditionalFilters);
  }, [adData, searchName, categories, additionalFiltersState, listAdditionalFilters]);

  const notFoundData = !!adData?.length && !filteredData.length;

  useEffect(() => {
    dispatch(setFilteredData(filteredData));
  }, [filteredData, dispatch]);

  function handleResetFilters() {
    dispatch(resetFilters());
  }
  function handleChangeSearchName(value: string) {
    dispatch(setSearchName(value));
    dispatch(resetFilteredData());
  }
  function handleChangeCategories(value: CategoriesValues | '') {
    dispatch(setCategories(value));
    dispatch(resetFilteredData());
  }
  function handleAdditionalFilters(params: { id: string; value: string }) {
    dispatch(setAdditionalFiltersState(params));
    dispatch(resetFilteredData());
  }

  return {
    searchName,
    handleChangeSearchName,

    categories,
    handleChangeCategories,

    handleResetFilters,
    notFoundData,
    filteredData,

    listAdditionalFilters,
    additionalFiltersState,
    handleAdditionalFilters,
  };
}
