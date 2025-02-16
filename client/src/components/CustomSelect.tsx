import { Control, Controller } from 'react-hook-form';
//@ts-expect-error: for test
import React, { FC } from 'react';
import { Box, FormControl, FormHelperText, FormLabel, MenuItem, Select } from '@mui/material';

import { IItem } from '../general/FormField/formFieldNames';
import { TypeFormData } from '../general/TypeFormData';

interface ICustomSelect {
  id: keyof TypeFormData;
  control: Control<TypeFormData>;
  fieldName: string;
  items: IItem[];
  required?: boolean;
  error: boolean;
  errorMessage?: string;
  dataTestId: string;
}

export const CustomSelect: FC<ICustomSelect> = ({
  id,
  control,
  fieldName,
  items,
  required,
  error,
  errorMessage,
  dataTestId,
}) => {
  return (
    <FormControl
      fullWidth
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <FormLabel sx={{ width: '12rem' }}>{fieldName}</FormLabel>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Controller
          name={id}
          control={control}
          rules={required ? { required: 'Заполните обязательное поле' } : undefined}
          render={({ field }) => (
            <Select
              {...field}
              data-testid={dataTestId}
              onChange={(e) => {
                const selectedItem = items.filter((item) => item.id === e.target.value)[0];
                field.onChange(selectedItem.text);
              }}
              value={items.find((item) => item.text === field.value)?.id || ''}
              error={error}
              fullWidth
              sx={{ fontSize: '1.4rem', width: '25rem' }}
            >
              {items.map((item, i) => (
                <MenuItem key={+i} value={item.id} data-testid={`${dataTestId}-${item.id}`}>
                  {item.text}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {error && <FormHelperText>{errorMessage}</FormHelperText>}
      </Box>
    </FormControl>
  );
};
