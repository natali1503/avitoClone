import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { RouterPath } from '../router/routerPath';
import { IDataToDisplay } from '../store/adInfoSlice';
import { deleteAdById } from '../api/api-actions';

import { CustomButton } from './CustomButton';
import { ImageWithPlaceholder } from './Image';

interface IDetailsAd {
  dataToDisplay: IDataToDisplay;
  id: string;
}

export const DetailsAd: FC<IDetailsAd> = ({ dataToDisplay, id }) => {
  const navigate = useNavigate();

  return (
    <Box display={'flex'} flexDirection={'row'} gap={'5rem'} data-testid='detailsAd'>
      <Box width={'30rem'} height={'30rem'}>
        <ImageWithPlaceholder
          src={(dataToDisplay && dataToDisplay.photo) || ''}
          alt={`Изображение по объявлению ${dataToDisplay?.data[0].value}`}
        />
      </Box>
      <Box display={'flex'} flexDirection={'column'} gap={'2rem'} minWidth={'25rem'}>
        {dataToDisplay &&
          dataToDisplay.data.map((el, i) => (
            <Box key={+i} display={'flex'} flexDirection={'column'} gap={'0.5rem'}>
              <Typography variant='h5'>{el?.fieldName}</Typography>
              <Typography>{el?.value}</Typography>
            </Box>
          ))}
      </Box>
      <Box display={'flex'} flexDirection={'column'} gap={'2rem'}>
        <CustomButton
          text='Редактировать'
          onClick={() => {
            navigate(RouterPath.Form, { state: { id } });
          }}
        />
        <CustomButton
          text='Удалить'
          onClick={() => {
            const controller = new AbortController();
            const signal = controller.signal;
            deleteAdById(id, signal);
            navigate(RouterPath.List);
          }}
          color='warning'
          sx={{ minWidth: '100%' }}
        />
      </Box>
    </Box>
  );
};
