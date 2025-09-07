//@ts-expect-error: for test
import React, { FC, useEffect, useLayoutEffect, useMemo } from 'react';
import { Box } from '@mui/material';

import { CustomPagination } from '../../components/pagination/CustomPagination';
import { Wrapper } from '../../components/ui/Wrapper';
import { Header } from '../../components/ui/Header';
import { CustomButton } from '../../components/ui/CustomButton';
import { FiltersPanel } from './ui/filtersPanel/FiltersPanel';
import { AdsList } from './ui/adsList/AdsList';
import { ListAnnouncementSkeleton } from './ui/skeleton/ListAnnouncementSkeleton';
import { useAdsBoard } from './hooks/useAdsBoard';

export const AdsBoardPage: FC = () => {
  const { adData, pagination, handleCreateAd } = useAdsBoard();

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
          <FiltersPanel />
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
