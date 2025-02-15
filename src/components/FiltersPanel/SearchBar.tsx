import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import React, { FC } from 'react';

interface ISearchBar {
  searchName: string;
  setSearchName: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchBar: FC<ISearchBar> = ({ searchName, setSearchName }) => {
  function handleChange(e: React.ChangeEvent<{ value: unknown }>) {
    const value = e.target.value as string;
    setSearchName(value.toLocaleLowerCase());
  }

  return (
    <Box>
      <TextField
        placeholder='Введите название объявления'
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
                  setSearchName('');
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
