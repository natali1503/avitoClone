import { useEffect, useState } from 'react';

import { Categories, CategoriesValues } from '../general/FormField/Categories';
import { FieldsByType, IField } from '../general/FormField/formFieldNames';
import { AdResponse } from '../api/AdResponse';

type useFilterProps = {
  adList: AdResponse[];
};

export function useFilters({ adList }: useFilterProps) {
  const [searchName, setSearchName] = useState('');
  const [categories, setCategories] = useState<CategoriesValues | ''>('');
  const [filteredData, setFilteredData] = useState<AdResponse[]>([]);
  const [additionalFiltersState, setAdditionalFiltersState] = useState<{ [key in string]: string }>({});
  const notFoundData = (adList || []).length > 0 && filteredData.length === 0;
  const [listAdditionalFilters, setListAdditionalFilters] = useState<IField[]>([]);

  function resetFilters() {
    setSearchName('');
    setCategories('');
    setAdditionalFiltersState({});
  }

  useEffect(() => {
    if (adList) {
      const data = filterAdList(adList, searchName, categories);
      setFilteredData(data);
    }
  }, [adList, searchName, categories]);

  useEffect(() => {
    if (categories) {
      setListAdditionalFilters(FieldsByType[categories]);
      {
        id: value: '';
      }
      const tempAdditionalFiltersState = FieldsByType[categories].reduce(
        (acc, el) => {
          acc[el.id] = '';
          return acc;
        },
        {} as { [key in string]: string },
      );
      setAdditionalFiltersState(tempAdditionalFiltersState);
    } else {
      setListAdditionalFilters([]);
      setAdditionalFiltersState({});
    }
  }, [categories]);

  return {
    search: {
      searchName,
      setSearchName,
    },
    categories: { categories, setCategories },
    resetFilters,
    notFoundData,

    filteredData,
    additionalFilters: { listAdditionalFilters, additionalFiltersState, setAdditionalFiltersState },
  };
}

function filterAdList(adList: AdResponse[], searchName: string = '', categories: string = '') {
  if (!categories && !searchName) return adList;
  let result = [...adList];
  if (categories) {
    const categorieText = Categories.filter((el) => el.id === categories)[0].text;
    result = result.filter((ad) => ad.type === categorieText);
  }
  if (searchName) {
    result = result.filter((ad) => ad.name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase()));
  }
  return result;
}
