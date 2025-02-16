import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
//@ts-expect-error: for test
import React, { FC } from 'react';

import { TypeFormData } from '../general/TypeFormData';
import { IDataToDisplay } from '../store/adInfoSlice';
import { RouterPath } from '../router/routerPath';
import { deleteAdById } from '../api/api-actions';
import { useDraft } from '../hooks/useDraft';

import { ImageWithPlaceholder } from './Image';
import { CustomButton } from './CustomButton';

interface IDetailsAd {
  dataToDisplay: IDataToDisplay;
  id: string;
}

export const DetailsAd: FC<IDetailsAd> = ({ dataToDisplay, id }) => {
  const navigate = useNavigate();
  const initValue = dataToDisplay.data.reduce(
    (acc, el) => {
      const typedKey = el.id as keyof TypeFormData;
      acc[typedKey] = el.value;
      return acc;
    },
    {} as Record<keyof TypeFormData, string | number>,
  ) as TypeFormData;

  const { editMode, initEditMode } = useDraft();

  return (
    <Box display={'flex'} flexDirection={'row'} gap={'5rem'} data-testid='detailsAd'>
      <Box width={'30rem'} height={'30rem'}>
        <ImageWithPlaceholder
          src={(dataToDisplay && dataToDisplay.photo) || ''}
          alt={`Изображение по объявлению ${dataToDisplay?.data[0].value}`}
        />
      </Box>
      <Box display={'flex'} flexDirection={'column'} gap={'2rem'} minWidth={'25rem'} flex={1}>
        {dataToDisplay &&
          dataToDisplay.data.map((el, i) => (
            <Box key={+i} display={'flex'} flexDirection={'column'} gap={'0.5rem'}>
              <Typography variant='h5' sx={{ fontWeight: 500 }}>
                {el?.fieldName}
              </Typography>
              <Typography>{el?.value}</Typography>
            </Box>
          ))}
      </Box>
      <Box display={'flex'} flexDirection={'column'} gap={'2rem'}>
        <CustomButton
          text='Редактировать'
          onClick={() => {
            navigate(RouterPath.Form, { state: { id } });
            initEditMode(initValue);
            console.log(editMode);
          }}
        />
        <CustomButton
          text='Удалить'
          onClick={async () => {
            const controller = new AbortController();
            const signal = controller.signal;
            await deleteAdById(id, signal);
            navigate(RouterPath.List);
          }}
          color='warning'
          sx={{ minWidth: '100%' }}
        />
      </Box>
    </Box>
  );
};
