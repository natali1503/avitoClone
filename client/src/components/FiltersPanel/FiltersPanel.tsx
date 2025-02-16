import React, { FC } from 'react';
import { Box, Paper, Typography } from '@mui/material';

import { AdditionalFilters } from './AdditionalFilters';
import { useFilters } from '../../hooks/useFilters';
import { CategoryFilter } from './CategoryFilter';
import { CustomButton } from '../CustomButton';
import { SearchBar } from './SearchBar';

export const FiltersPanel: FC = () => {
  const { handleResetFilters } = useFilters();

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
        <SearchBar />

        <CategoryFilter />
        <AdditionalFilters />
        <CustomButton text='Сбросить' onClick={handleResetFilters} sx={{ width: '100%' }} />
      </Box>
    </Paper>
  );
};
