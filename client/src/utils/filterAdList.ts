import { AdResponse } from '../api/AdResponse';
import { Categories } from '../general/FormField/Categories';
import { IField } from '../general/FormField/formFieldNames';

export function filterAdList(
  adList: AdResponse[],
  searchName: string = '',
  categories: string = '',
  additionalFiltersState: { [key in string]: string } | null = null,
  listAdditionalFilters: IField[],
): AdResponse[] {
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
