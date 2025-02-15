import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';

import { AdResponse } from '../../api/AdResponse';

import { Item } from './Item';

interface IListItems {
  dataToDisplay: AdResponse[] | null;
  notFoundData: boolean;
}

export const ListItems: FC<IListItems> = ({ dataToDisplay, notFoundData }) => {
  const isData = !!dataToDisplay;
  const isdataToDisplay = isData && dataToDisplay.length > 0;

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      gap={'1.5rem'}
      data-testid='listItems'
      margin={'0 auto'}
    >
      {isdataToDisplay &&
        dataToDisplay.map((item) => (
          <Item
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
      {!isData && <Typography variant='h5'>Пока объявлений нет</Typography>}
    </Box>
  );
};
