//@ts-expect-error: for test
import React, { FC, useEffect, useState } from 'react';
import { Box, Grid, Paper } from '@mui/material';
import { AdditionalFilters } from './ui/AdditionalFilters';
import { CategoryFilter } from './ui/CategoryFilter';
import { SearchBar } from './ui/SearchBar';
import { CustomButton } from '../../../../components/ui/CustomButton';

import { TUseFiltersReturn } from '../../hooks/useFilters';

import { HeaderFiltersPanel } from './ui/HeaderFiltersPanel';
import { useBreakpointOverlap } from '../../../../hooks/useBreakpointOverlap';

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
  const [stateFiltersPanel, setStateFiltersPanel] = useState<'open' | 'close'>('open');
  const { isBreakpointOverlap } = useBreakpointOverlap();

  const handleToggleStateFiltersPanel = () => {
    setStateFiltersPanel((prev) => {
      return prev === 'open' ? 'close' : 'open';
    });
  };

  useEffect(() => {
    if (!isBreakpointOverlap && stateFiltersPanel === 'close') handleToggleStateFiltersPanel();
  }, [isBreakpointOverlap]);
  return (
    <Paper
      sx={{
        padding: '2rem 2rem',
        height: 'max-content',
        borderRadius: '4px',
        border: '1px solid rgb(224,224,224)',
        boxShadow: 'none',
        width: { xs: '100%', sm: '100%', md: '100%' },
      }}
    >
      <Box display={'flex'} flexDirection={'column'} gap={'2.5rem'}>
        <HeaderFiltersPanel
          isBreakpointOverlap={isBreakpointOverlap}
          stateFiltersPanel={stateFiltersPanel}
          handleToggleStateFiltersPanel={handleToggleStateFiltersPanel}
          handleResetFilters={handleResetFilters}
        />

        {stateFiltersPanel === 'open' && (
          <Box display={'flex'} flexDirection={{ xs: 'row', md: 'column' }} gap={'2rem'}>
            <Box display='flex' flexDirection={'column'} flexWrap={'nowrap'} gap='2rem' width='100%'>
              <Grid container spacing={4}>
                <Grid item xs={6} md={12}>
                  <SearchBar searchName={search.searchName} handleChangeSearchName={search.handleChangeSearchName} />
                </Grid>
                <Grid item xs={6} md={12}>
                  <CategoryFilter
                    categories={categoriesFilters.categories}
                    handleChangeCategories={categoriesFilters.handleChangeCategories}
                  />
                </Grid>
              </Grid>

              <AdditionalFilters
                listAdditionalFilters={additionalFilters.listAdditionalFilters}
                additionalFiltersState={additionalFilters.additionalFiltersState}
                handleAdditionalFilters={additionalFilters.handleAdditionalFilters}
              />
            </Box>
          </Box>
        )}
        {!isBreakpointOverlap && <CustomButton text='Сбросить' onClick={handleResetFilters} sx={{ width: '100%' }} />}
      </Box>
    </Paper>
  );
};
