import { useEffect, useState } from "react";
import { AdResponse } from "../api/AdResponse";
import { Categories } from "../FormField/formFieldNames";

type useFilterProps = {
  adList: AdResponse[] | null;
};
// Реализован поиск объявления по названию
// Реализована фильтрация по категории объявления
// Дополнительно: при выборе значения для фильтра по категории появляются дополнительные фильтры по обязательным полям выбранной категории

export function useFilters({ adList }: useFilterProps) {
  const [searchName, setSearchName] = useState("");
  const [categories, setCategories] = useState("");

  const [filteredData, setFilteredData] = useState<AdResponse[]>([]);

  function resetFilters() {
    setSearchName("");
    setCategories("");
  }

  useEffect(() => {
    if (adList) {
      const data = filterAdList(adList, searchName, categories);
      setFilteredData(data);
    }
  }, [adList, searchName, categories]);

  return {
    resetFilters,
    searchName,
    setSearchName,
    categories,
    setCategories,
    filteredData,
  };
}

function filterAdList(adList: AdResponse[], searchName: string = "", categories: string = "") {
  if (!categories && !searchName) return adList;
  let result = [...adList];
  if (categories) {
    const categorieText = Categories.filter((el) => el.id === categories)[0].text;
    result = result.filter((ad) => ad.type === categorieText);
  }
  if (searchName) {
    result = result.filter((ad) => ad.name.toLocaleLowerCase().includes(searchName));
  }
  return result;
}
