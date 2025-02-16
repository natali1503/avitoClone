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
    setListAdditionalFilters([]);
  }

  useEffect(() => {
    if (adList) {
      const data = filterAdList(adList, searchName, categories, additionalFiltersState, listAdditionalFilters);
      setFilteredData(data);
    }
  }, [adList, searchName, categories, additionalFiltersState, listAdditionalFilters]);

  //Заполнение дополнительных фильтров при изменении категории
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
