//@ts-expect-error: for test
import React, { FC } from 'react';
import { Box } from '@mui/material';

import { CustomPagination } from '../../components/pagination/CustomPagination';

import { FiltersPanel } from './ui/filtersPanel/FiltersPanel';
import { AdsList } from './ui/adsList/AdsList';
import { ListAnnouncementSkeleton } from './ui/skeleton/ListAnnouncementSkeleton';
import { useAdsBoard } from './hooks/useAdsBoard';
import { Wrapper } from '../../components/tempName/Wrapper';
import { Header } from '../../components/tempName/Header';
import { CustomButton } from '../../components/tempName/CustomButton';

export const AdsBoardPage: FC = () => {
  const { adData, pagination, handleCreateAd, handleResetFilters, search, categoriesFilters, additionalFilters } =
    useAdsBoard();

  return adData.loading ? (
    <ListAnnouncementSkeleton />
  ) : (
    <Wrapper>
      <Header header='Список объявлений' />
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={'2rem'}
        flex={1}
        padding={' 2rem'}
        bgcolor={'rgba(245, 246, 245,0.4)'}
      >
        <Box display={'flex'} flexDirection={'row'} gap={'1.5rem'} justifyContent={'flex-end'}>
          <CustomButton text='Разместить объявление' dataTestId='creatingAd' onClick={handleCreateAd} />
        </Box>
        <Box display={'flex'} flexDirection={'row'} gap={'1.5rem'}>
          <FiltersPanel
            search={search}
            categoriesFilters={categoriesFilters}
            additionalFilters={additionalFilters}
            handleResetFilters={handleResetFilters}
          />
          <AdsList dataToDisplay={adData.dataToDisplay} notFoundData={adData.notFoundData} />
        </Box>
      </Box>
      <CustomPagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages || 0}
        setCurrentPage={pagination.setCurrentPage}
      />
    </Wrapper>
  );
};
