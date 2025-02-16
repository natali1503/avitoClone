import { useEffect, useState } from 'react';

import { Categories, CategoriesValues } from '../general/FormField/Categories';
import { FieldsByType, IField } from '../general/FormField/formFieldNames';
import { AdResponse } from '../api/AdResponse';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { resetFilters, setAdditionalFiltersState, setCategories, setSearchName } from '../store/filtersSlice';

type useFilterProps = {
  adList: AdResponse[];
};

export function useFilters({ adList }: useFilterProps) {
  const { searchName, categories, listAdditionalFilters, additionalFiltersState } = useSelector((state: RootState) => {
    return state.filters;
  });

  const dispatch = useDispatch<AppDispatch>();
  const [filteredData, setFilteredData] = useState<AdResponse[]>([]);
  const notFoundData = (adList || []).length > 0 && filteredData.length === 0;

  useEffect(() => {
    if (adList) {
      const data = filterAdList(adList, searchName, categories, additionalFiltersState, listAdditionalFilters);
      setFilteredData(data);
    }
  }, [adList, searchName, categories, additionalFiltersState, listAdditionalFilters]);

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
    search: {
      searchName,
      handleChangeSearchName,
    },
    categories: { categories, handleChangeCategories },
    handleResetFilters,
    notFoundData,
    filteredData,
    additionalFilters: { listAdditionalFilters, additionalFiltersState, handleAdditionalFilters },
  };
}

function filterAdList(
  adList: AdResponse[],
  searchName: string = '',
  categories: string = '',
  additionalFiltersState: { [key in string]: string } | null = null,
  listAdditionalFilters: IField[],
) {
  if (!categories && !searchName) return adList;
  let result = [...adList];
  if (categories) {
    const categorieText = Categories.filter((el) => el.id === categories)[0].text;
    result = result.filter((ad) => ad.type === categorieText);
  }
  if (searchName) {
    result = result.filter((ad) => ad.name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase()));
  }
  if (additionalFiltersState) {
    result = result.filter((ad) => {
      return Object.entries(additionalFiltersState).every(([idFilter, valueFilter]) => {
        const typeField = listAdditionalFilters.filter((el) => el.id === idFilter)[0].typeField;
        const type = listAdditionalFilters.filter((el) => el.id === idFilter)[0].type;
        const valueAd = ad[idFilter as keyof AdResponse];
        if (typeField === 'input' && valueFilter) {
          if (type === 'string') {
            return String(valueAd).toLocaleLowerCase().includes(valueFilter.toLocaleLowerCase());
          }
          if (type === 'number') {
            return Number(valueAd) === Number(valueFilter);
          } else return true;
        }
        if (typeField === 'select' && valueFilter) {
          const itemsField = listAdditionalFilters.filter((el) => el.id === idFilter)[0].items;
          return valueAd === itemsField?.filter((el) => el.id === valueFilter)[0]?.text;
        } else return true;
      });
    });
  }
  return result;
}
