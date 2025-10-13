import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
//@ts-expect-error: for test
import React, { FC } from 'react';

import { IItem } from '../../../../../general/FormField/formFieldNames';

interface ISelectFieldFilter<T> {
  value: string;
  fieldName: string;
  items: IItem[];
  setValue: (newValue: T | '') => void;
}
const labelId = 'category-label';

export const SelectFieldFilter = <T,>({ value, fieldName, items, setValue }: ISelectFieldFilter<T>) => {
  function handleChange(event: SelectChangeEvent) {
    const value = event.target.value as T;
    setValue(value);
  }
  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      <FormControl
        fullWidth
        sx={{
          minWidth: 0,
        }}
        variant='outlined'
      >
        <InputLabel
          id={labelId}
          sx={{
            '&.MuiFormLabel-root': { fontSize: '1.4rem', top: '-8px' },
            '&.Mui-focused': { fontSize: '1.6rem', top: '0' },
            '&.MuiFormLabel-filled': { fontSize: '1.6rem', top: '0' },
          }}
        >
          {fieldName}
        </InputLabel>

        <Select
          labelId={labelId}
          label={fieldName}
          value={value}
          onChange={handleChange}
          fullWidth
          sx={{
            minWidth: 0,
            fontSize: '1.4rem',
            '& .MuiSelect-select': {
              padding: { xs: '1rem', md: '1.6rem' },
            },
          }}
        >
          {items.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.text}
            </MenuItem>
          ))}
        </Select>
        {value && (
          <IconButton
            size='small'
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onClick={() => setValue('')}
            sx={{
              position: 'absolute',
              right: '2.8rem',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1,
            }}
          >
            <CloseIcon sx={{ width: { xs: '1.8rem', md: '2.2rem' }, height: { xs: '1.8rem', md: '2.2rem' } }} />
          </IconButton>
        )}
      </FormControl>
    </Box>
  );
};
