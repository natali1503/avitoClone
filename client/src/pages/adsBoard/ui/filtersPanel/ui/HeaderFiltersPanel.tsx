//@ts-expect-error: for test
import React, { FC, useEffect, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

interface IHeaderFiltersPanel {
  isBreakpointOverlap: boolean;
  stateFiltersPanel: 'open' | 'close';
  handleToggleStateFiltersPanel: () => void;
  handleResetFilters: () => void;
}

export const HeaderFiltersPanel: FC<IHeaderFiltersPanel> = ({
  isBreakpointOverlap,
  stateFiltersPanel,
  handleToggleStateFiltersPanel,
  handleResetFilters,
}) => {
  return (
    <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
      <Typography
        sx={{
          typography: { xs: 'body1', md: 'h6' },
        }}
      >
        Фильтрация
      </Typography>
      {isBreakpointOverlap && (
        <Box display={'flex'} flexDirection={'row'}>
          <IconButton onClick={handleToggleStateFiltersPanel}>
            {stateFiltersPanel === 'open' ? (
              <MenuOpenIcon aria-label='reset-filters' />
            ) : (
              <MenuIcon aria-label='reset-filters' />
            )}
          </IconButton>
          <IconButton onClick={handleResetFilters}>
            <FilterAltOffIcon aria-label='reset-filters' />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};
