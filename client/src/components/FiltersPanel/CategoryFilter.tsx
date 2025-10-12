//@ts-expect-error: for test
import React, { FC } from 'react';

import { Categories } from '../../general/FormField/Categories';
import { useFilters } from '../../pages/adsBoard/hooks/useFilters';
import { SelectFieldFilter } from '../../pages/adsBoard/ui/filtersPanel/ui/SelectFieldFilter';

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
