import React, { FC } from 'react';
import { Box } from '@mui/material';

import { SelectFieldFilter } from './SelectFieldFilter';
import { TextFieldFilter } from './TextFieldFilter';
import { useFilters } from '../../hooks/useFilters';

export const AdditionalFilters: FC = () => {
  const { listAdditionalFilters, additionalFiltersState, handleAdditionalFilters } = useFilters();

  function handleChange(id: string, value: string) {
    console.log(id, value);

    handleAdditionalFilters({ id, value });
  }

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'1.5rem'}>
      {listAdditionalFilters.map((el, i) => {
        if (el.typeField === 'input' && el.required) {
          return (
            <TextFieldFilter
              fieldName={el.fieldName}
              value={(additionalFiltersState && additionalFiltersState[el.id]) || ''}
              setValue={(newValue: string) => handleChange(el.id, newValue)}
              key={+i}
            />
          );
        } else if (el.typeField === 'select' && el.required && el.items) {
          return (
            <SelectFieldFilter
              fieldName={el.fieldName}
              items={el.items}
              value={(additionalFiltersState && additionalFiltersState[el.id]) || ''}
              setValue={(newValue: string) => handleChange(el.id, newValue)}
              key={+i}
            />
          );
        }
        return null;
      })}
    </Box>
  );
};
