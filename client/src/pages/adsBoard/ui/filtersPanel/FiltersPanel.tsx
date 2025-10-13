//@ts-expect-error: for test
import React, { FC } from 'react';
import { Box, Paper, Typography } from '@mui/material';

import { AdditionalFilters } from './ui/AdditionalFilters';
import { CategoryFilter } from './ui/CategoryFilter';
import { SearchBar } from './ui/SearchBar';
import { CustomButton } from '../../../../components/ui/CustomButton';
import { TUseFiltersReturn } from '../../hooks/useFilters';

interface IFiltersPanel {
  search: TUseFiltersReturn['search'];
  categoriesFilters: TUseFiltersReturn['categoriesFilters'];
  additionalFilters: TUseFiltersReturn['additionalFilters'];
  handleResetFilters: TUseFiltersReturn['handleResetFilters'];
}

export const FiltersPanel: FC<IFiltersPanel> = ({
  search,
  categoriesFilters,
  additionalFilters,
  handleResetFilters,
}) => {
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
        <SearchBar searchName={search.searchName} handleChangeSearchName={search.handleChangeSearchName} />
        <CategoryFilter
          categories={categoriesFilters.categories}
          handleChangeCategories={categoriesFilters.handleChangeCategories}
        />
        <AdditionalFilters
          listAdditionalFilters={additionalFilters.listAdditionalFilters}
          additionalFiltersState={additionalFilters.additionalFiltersState}
          handleAdditionalFilters={additionalFilters.handleAdditionalFilters}
        />
        <CustomButton text='Сбросить' onClick={handleResetFilters} sx={{ width: '100%' }} />
      </Box>
    </Paper>
  );
};
