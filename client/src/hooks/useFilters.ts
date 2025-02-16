import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useMemo } from 'react';

import { resetFilters, setAdditionalFiltersState, setCategories, setSearchName } from '../store/filtersSlice';
import { CategoriesValues } from '../general/FormField/Categories';
import { filterAdList } from '../utils/filterAdList';
import { AppDispatch, RootState } from '../store';
import { AdResponse } from '../api/AdResponse';

export function useFilters() {
  const dispatch = useDispatch<AppDispatch>();
  const { dataToDisplay, searchName, categories, listAdditionalFilters, additionalFiltersState } = useSelector(
    (state: RootState) => state.filters,
    shallowEqual,
  );

  const filteredData: AdResponse[] | [] = useMemo(() => {
    if (!dataToDisplay || dataToDisplay.length === 0) return [];
    return filterAdList(dataToDisplay, searchName, categories, additionalFiltersState, listAdditionalFilters);
  }, [dataToDisplay, searchName, categories, additionalFiltersState, listAdditionalFilters]);

  const notFoundData = !!dataToDisplay?.length && !filteredData.length;

  function handleResetFilters() {
    dispatch(resetFilters());
  }
  function handleChangeSearchName(value: string) {
    dispatch(setSearchName(value));
  }
  function handleChangeCategories(value: CategoriesValues | '') {
    dispatch(setCategories(value));
  }
  function handleAdditionalFilters(params: { id: string; value: string }) {
    dispatch(setAdditionalFiltersState(params));
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
