import React, { FC } from 'react';

import { Categories } from '../../general/FormField/Categories';
import { SelectFieldFilter } from './SelectFieldFilter';
import { useFilters } from '../../hooks/useFilters';

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
