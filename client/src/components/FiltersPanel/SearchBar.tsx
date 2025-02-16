import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import React, { FC } from 'react';
import { useFilters } from '../../hooks/useFilters';

export const SearchBar: FC = () => {
  const { searchName, handleChangeSearchName } = useFilters();

  function handleChange(e: React.ChangeEvent<{ value: unknown }>) {
    const value = e.target.value as string;
    handleChangeSearchName(value.toLocaleLowerCase());
  }

  return (
    <Box>
      <TextField
        placeholder='Название объявления'
        value={searchName}
        onChange={handleChange}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchName && (
              <IconButton
                size='small'
                onClick={() => {
                  handleChangeSearchName('');
                }}
              >
                <CloseIcon />
              </IconButton>
            ),
          },
        }}
        variant='standard'
        sx={{ fontSize: '1.4rem', minWidth: '15rem', width: '30rem' }}
      />
    </Box>
  );
};
