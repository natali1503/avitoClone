import CloseIcon from '@mui/icons-material/Close';
import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { FC } from 'react';

import { Categories } from '../../general/FormField/Categories';

interface ICategoryFilter {
  categories: string;
  setCategories: React.Dispatch<React.SetStateAction<string>>;
}

export const CategoryFilter: FC<ICategoryFilter> = ({ categories, setCategories }) => {
  function handleChangeSelect(event: SelectChangeEvent) {
    const value = event.target.value as string;
    setCategories(value);
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
        <InputLabel>Категории объявления</InputLabel>
        <Select
          onChange={handleChangeSelect}
          value={categories}
          endAdornment={
            categories && (
              <IconButton size='small' onClick={() => setCategories('')} sx={{ mr: '1rem' }}>
                <CloseIcon />
              </IconButton>
            )
          }
          sx={{ fontSize: '1.4rem', minWidth: '30rem' }}
        >
          {Categories.map((item, i) => (
            <MenuItem key={+i} value={item.id}>
              {item.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
