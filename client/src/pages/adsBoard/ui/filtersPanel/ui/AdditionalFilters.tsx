//@ts-expect-error: for test
import React, { FC } from 'react';
import { Grid } from '@mui/material';

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
    <Grid container spacing={4}>
      {listAdditionalFilters.map((el, i) => {
        if (el.typeField === 'input' && el.required) {
          return (
            <Grid item xs={6} md={12} key={+i}>
              <TextFieldFilter
                fieldName={el.fieldName}
                value={(additionalFiltersState && additionalFiltersState[el.id]) || ''}
                setValue={(newValue: string) => handleChange(el.id, newValue)}
              />
            </Grid>
          );
        } else if (el.typeField === 'select' && el.required && el.items) {
          return (
            <Grid item xs={6} md={12} key={+i}>
              <SelectFieldFilter
                fieldName={el.fieldName}
                items={el.items}
                value={(additionalFiltersState && additionalFiltersState[el.id]) || ''}
                setValue={(newValue: string) => handleChange(el.id, newValue)}
              />
            </Grid>
          );
        }
        return null;
      })}
    </Grid>
  );
};
