//@ts-expect-error: for test
import React, { FC } from 'react';

import { Categories } from '../../general/FormField/Categories';
import { useFilters } from '../../hooks/useFilters';

import { SelectFieldFilter } from './SelectFieldFilter';

export const CategoryFilter: FC = () => {
  const { categories, handleChangeCategories } = useFilters();

  return (
    <SelectFieldFilter
      fieldName='Категории объявления'
      items={Categories}
      setValue={handleChangeCategories}
      value={categories}
    />
  );
};
