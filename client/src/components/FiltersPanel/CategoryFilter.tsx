import React, { FC } from 'react';

import { Categories, CategoriesValues } from '../../general/FormField/Categories';
import { SelectFieldFilter } from './SelectFieldFilter';

interface ICategoryFilter {
  categories: string;
  setCategories: React.Dispatch<React.SetStateAction<'' | CategoriesValues>>;
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
