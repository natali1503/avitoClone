import React, { FC } from 'react';

import { Categories, CategoriesValues } from '../../general/FormField/Categories';
import { SelectFieldFilter } from './SelectFieldFilter';

interface ICategoryFilter {
  categories: CategoriesValues | '';
  setCategories: (value: CategoriesValues | '') => void;
}

export const CategoryFilter: FC<ICategoryFilter> = ({ categories, setCategories }) => {
  return (
    <SelectFieldFilter
      fieldName='Категории объявления'
      items={Categories}
      setValue={setCategories}
      value={categories}
    />
  );
};
