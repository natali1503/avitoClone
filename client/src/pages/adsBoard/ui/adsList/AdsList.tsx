import { Box, Typography } from '@mui/material';
//@ts-expect-error: for test
import React, { FC } from 'react';

import { TAdResponse } from '../../../../entities/ad/types';

import { AdItem } from './AdItem';

interface IAdsList {
  dataToDisplay: TAdResponse[];
  notFoundData: boolean;
}

export const AdsList: FC<IAdsList> = ({ dataToDisplay, notFoundData }) => {
  const isData = dataToDisplay?.length === 0 && !notFoundData;
  const isDataToDisplay = dataToDisplay.length > 0;

  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      flexWrap={'wrap'}
      gap={'1.5rem'}
      data-testid='AdsList'
      justifyContent={'center'}
      flexGrow={1}
    >
      {isDataToDisplay &&
        dataToDisplay.map((item) => (
          <AdItem
            key={item.id}
            id={item.id}
            name={item.name}
            location={item.location}
            type={item.type}
            photo={item.photo}
            dataTestId={`itemAd-${item.id}`}
          />
        ))}
      {notFoundData && <Typography variant='h5'>Объявлений по выбранным параметрам нет</Typography>}
      {isData && (
        <Box sx={{ width: '100%' }} display={'flex'} justifyContent={'center'}>
          <Typography variant='h5'>Пока объявлений нет</Typography>
        </Box>
      )}
    </Box>
  );
};
