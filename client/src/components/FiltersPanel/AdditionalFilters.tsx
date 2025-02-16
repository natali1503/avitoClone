import React, { FC } from 'react';
import { Box } from '@mui/material';

import { SearchBar } from './SearchBar';
import { CategoryFilter } from './CategoryFilter';
import { IField } from '../../general/FormField/formFieldNames';
import { CategoriesValues } from '../../general/FormField/Categories';
import { TextFieldFilter } from './TextFieldFilter';
import { SelectFieldFilter } from './SelectFieldFilter';

interface IAdditionalFilters {
  additionalFilters: {
    listAdditionalFilters: IField[];
    additionalFiltersState: { [key in string]: string };
    setAdditionalFiltersState: React.Dispatch<
      React.SetStateAction<{
        [x: string]: string;
      }>
    >;
  };
}

export const AdditionalFilters: FC<IAdditionalFilters> = ({ additionalFilters }) => {
  const { listAdditionalFilters, additionalFiltersState, setAdditionalFiltersState } = additionalFilters;

  function handleChange(id: string, value: string) {
    setAdditionalFiltersState((state) => ({ ...state, [id]: value }));
  }

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'1.5rem'}>
      {listAdditionalFilters.map((el, i) => {
        if (el.typeField === 'input' && el.required) {
          return (
            <TextFieldFilter
              fieldName={el.fieldName}
              value={additionalFiltersState[el.id] || ''}
              setValue={(newValue: string) => handleChange(el.id, newValue)}
              key={+i}
            />
          );
        } else if (el.typeField === 'select' && el.required && el.items) {
          return (
            <SelectFieldFilter
              fieldName={el.fieldName}
              items={el.items}
              value={additionalFiltersState[el.id] || ''}
              setValue={(newValue: string) => handleChange(el.id, newValue)}
              key={+i}
            />
          );
        }
      })}
    </Box>
  );
};
