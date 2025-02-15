import React, { FC } from 'react';
import { Box } from '@mui/material';

import { SearchBar } from './SearchBar';
import { CategoryFilter } from './CategoryFilter';

interface IFilters {
  searchName: string;
  setSearchName: React.Dispatch<React.SetStateAction<string>>;
  categories: string;
  setCategories: React.Dispatch<React.SetStateAction<string>>;
}

export const FiltersPanel: FC<IFilters> = ({ searchName, setSearchName, categories, setCategories }) => {
  return (
    <Box display={'flex'} flexDirection={'row'} gap={'1.5rem'}>
      <SearchBar searchName={searchName} setSearchName={setSearchName} />

      <CategoryFilter categories={categories} setCategories={setCategories} />
    </Box>
  );
};
