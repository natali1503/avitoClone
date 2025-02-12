import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { FC } from 'react';

import { Categories } from '../general/FormField/Categories';

interface IFilters {
  searchName: string;
  setSearchName: React.Dispatch<React.SetStateAction<string>>;
  categories: string;
  setCategories: React.Dispatch<React.SetStateAction<string>>;
}

export const FiltersPanel: FC<IFilters> = ({
  searchName,
  setSearchName,
  categories,
  setCategories,
}) => {
  function handleChange(e: React.ChangeEvent<{ value: unknown }>) {
    const value = e.target.value as string;
    setSearchName(value.toLocaleLowerCase);
  }

  function handleChangeSelect(event: SelectChangeEvent) {
    const value = event.target.value as string;
    setCategories(value);
  }

  return (
    <Box display={'flex'} flexDirection={'row'} gap={'1.5rem'}>
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
              <IconButton
                size='small'
                onClick={() => setCategories('')}
                sx={{ mr: '1rem' }}
              >
                <CloseIcon />
              </IconButton>
            )
          }
          sx={{ fontSize: '1.4rem', minWidth: '30rem', height: '3rem' }}
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
