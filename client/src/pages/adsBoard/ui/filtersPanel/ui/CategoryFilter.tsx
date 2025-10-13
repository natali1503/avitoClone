//@ts-expect-error: for test
import React, { FC } from 'react';

import { Categories, CategoriesValues } from '../../../../../general/FormField/Categories';

import { SelectFieldFilter } from './SelectFieldFilter';

interface ICategoryFilter {
  categories: '' | CategoriesValues;
  handleChangeCategories: (value: CategoriesValues | '') => void;
}

export const CategoryFilter: FC<ICategoryFilter> = ({ categories, handleChangeCategories }) => {
  return (
    <SelectFieldFilter
      fieldName='Категории объявления'
      items={Categories}
      setValue={handleChangeCategories}
      value={categories}
    />
  );
};
