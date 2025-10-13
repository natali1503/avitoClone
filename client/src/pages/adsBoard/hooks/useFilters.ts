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
import { IField } from '../../../general/FormField/formFieldNames';

export const useFilters = (adData?: TAdResponse[]): TUseFiltersReturn => {
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
    if (savedFilteredData?.length) return savedFilteredData;
    return filterAdList(adData, searchName, categories, additionalFiltersState, listAdditionalFilters);
  }, [adData, searchName, categories, additionalFiltersState, listAdditionalFilters]);

  const notFoundData = !!adData?.length && !filteredData.length;

  useEffect(() => {
    dispatch(setFilteredData(filteredData));
  }, [filteredData, dispatch]);

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };
  const handleChangeSearchName = (value: string) => {
    dispatch(setSearchName(value));
    dispatch(resetFilteredData());
  };
  const handleChangeCategories = (value: CategoriesValues | '') => {
    dispatch(setCategories(value));
    dispatch(resetFilteredData());
  };
  const handleAdditionalFilters = (params: { id: string; value: string }) => {
    dispatch(setAdditionalFiltersState(params));
    dispatch(resetFilteredData());
  };

  return {
    search: { searchName, handleChangeSearchName },

    categoriesFilters: { categories, handleChangeCategories },

    additionalFilters: { listAdditionalFilters, additionalFiltersState, handleAdditionalFilters },

    handleResetFilters,
    notFoundData,
    filteredData,
  };
};

export type TUseFiltersReturn = {
  search: { searchName: string; handleChangeSearchName: (value: string) => void };

  categoriesFilters: {
    categories: '' | CategoriesValues;
    handleChangeCategories: (value: CategoriesValues | '') => void;
  };

  additionalFilters: {
    listAdditionalFilters: IField[];
    additionalFiltersState: {
      [x: string]: string;
    } | null;
    handleAdditionalFilters: (params: { id: string; value: string }) => void;
  };

  handleResetFilters: () => void;
  notFoundData: boolean;
  filteredData: TAdResponse[];
};
