import React, { FC } from 'react';
import { Box } from '@mui/material';

import { IField } from '../../general/FormField/formFieldNames';

import { TextFieldFilter } from './TextFieldFilter';
import { SelectFieldFilter } from './SelectFieldFilter';

interface IAdditionalFilters {
  additionalFilters: {
    listAdditionalFilters: IField[];
    additionalFiltersState: { [key in string]: string } | null;
    handleAdditionalFilters: (params: { id: string; value: string }) => void;
  };
}

export const AdditionalFilters: FC<IAdditionalFilters> = ({ additionalFilters }) => {
  const { listAdditionalFilters, additionalFiltersState, handleAdditionalFilters } = additionalFilters;

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
