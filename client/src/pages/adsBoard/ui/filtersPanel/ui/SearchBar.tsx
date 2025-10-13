import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import React, { FC } from 'react';

interface ISearchBar {
  searchName: string;
  handleChangeSearchName: (value: string) => void;
}

export const SearchBar: FC<ISearchBar> = ({ searchName, handleChangeSearchName }) => {
  function handleChange(e: React.ChangeEvent<{ value: unknown }>) {
    const value = e.target.value as string;
    handleChangeSearchName(value.toLocaleLowerCase());
  }

  return (
    <Box sx={{ minWidth: 0 }}>
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
        fullWidth
        sx={{
          '& .MuiInputBase-input': {
            fontSize: { xs: '1.4rem', md: '1.6rem' },
            '::placeholder': {
              fontSize: { xs: '1.4rem', md: '1.6rem' },
            },
          },
        }}
      />
    </Box>
  );
};
