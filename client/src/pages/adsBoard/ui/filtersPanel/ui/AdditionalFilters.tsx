//@ts-expect-error: for test
import React, { FC } from 'react';
import { Box } from '@mui/material';

import { SelectFieldFilter } from './SelectFieldFilter';
import { TextFieldFilter } from './TextFieldFilter';
import { IField } from '../../../../../general/FormField/formFieldNames';

interface IAdditionalFilters {
  listAdditionalFilters: IField[];
  additionalFiltersState: {
    [x: string]: string;
  } | null;
  handleAdditionalFilters: (params: { id: string; value: string }) => void;
}

export const AdditionalFilters: FC<IAdditionalFilters> = ({
  listAdditionalFilters,
  additionalFiltersState,
  handleAdditionalFilters,
}) => {
  function handleChange(id: string, value: string) {
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
