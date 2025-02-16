import React, { FC } from 'react';
import { Box, Paper, Typography } from '@mui/material';

import { SearchBar } from './SearchBar';
import { CategoryFilter } from './CategoryFilter';
import { IField } from '../../general/FormField/formFieldNames';
import { CategoriesValues } from '../../general/FormField/Categories';
import { AdditionalFilters } from './AdditionalFilters';
import { CustomButton } from '../CustomButton';

interface IFilters {
  search: {
    searchName: string;
    handleChangeSearchName: (value: string) => void;
  };
  categories: {
    categories: CategoriesValues | '';
    handleChangeCategories: (value: CategoriesValues | '') => void;
  };
  additionalFilters: {
    listAdditionalFilters: IField[];
    additionalFiltersState: { [key in string]: string } | null;
    handleAdditionalFilters: (params: { id: string; value: string }) => void;
  };

  resetFilters: () => void;
}

export const FiltersPanel: FC<IFilters> = ({ search, categories, additionalFilters, resetFilters }) => {
  return (
    <Paper
      sx={{
        padding: '2rem 2rem',
        height: 'max-content',
        borderRadius: '4px',
        border: '1px solid rgb(224,224,224)',
        boxShadow: 'none',
      }}
    >
      <Box display={'flex'} flexDirection={'column'} gap={'2.5rem'}>
        <Typography variant='h6'>Фильтрация</Typography>
        <SearchBar searchName={search.searchName} setSearchName={search.handleChangeSearchName} />

        <CategoryFilter categories={categories.categories} setCategories={categories.handleChangeCategories} />
        <AdditionalFilters additionalFilters={additionalFilters} />
        <CustomButton text='Сбросить' onClick={resetFilters} sx={{ width: '100%' }} />
      </Box>
    </Paper>
  );
};
