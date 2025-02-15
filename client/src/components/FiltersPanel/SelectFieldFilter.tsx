import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { FC } from 'react';

import { IItem } from '../../general/FormField/formFieldNames';

interface ISelectFieldFilter<T> {
  value: string;
  fieldName: string;
  items: IItem[];
  setValue: React.Dispatch<React.SetStateAction<'' | T>>;
}

export const SelectFieldFilter = <T,>({ value, fieldName, items, setValue }: ISelectFieldFilter<T>) => {
  function handleChange(event: SelectChangeEvent) {
    const value = event.target.value as T;
    setValue(value);
  }

  return (
    <Box display={'flex'} flexDirection={'row'} gap={'1.5rem'}>
      <FormControl
        fullWidth
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <InputLabel
          sx={{
            '&.MuiFormLabel-root': { top: '-4px' },
            '&.MuiFormLabel-root.Mui-focused': { top: '-6px' },
          }}
        >
          {fieldName}
        </InputLabel>
        <Select
          onChange={handleChange}
          value={value}
          endAdornment={
            value && (
              <IconButton size='small' onClick={() => setValue('')} sx={{ mr: '1rem' }}>
                <CloseIcon />
              </IconButton>
            )
          }
          sx={{ fontSize: '1.4rem', minWidth: '30rem' }}
        >
          {items.map((item, i) => (
            <MenuItem key={+i} value={item.id}>
              {item.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
