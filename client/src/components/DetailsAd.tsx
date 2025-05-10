import { useNavigate, useNavigationType } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
//@ts-expect-error: for test
import React, { FC } from 'react';

import { TypeFormData } from '../general/TypeFormData';
import { IDataToDisplay } from '../store/adInfoSlice';
import { RouterPath } from '../router/routerPath';
import { deleteAdById } from '../api/api-actions';
import { useDraft } from '../hooks/useDraft';

import { ImageWithPlaceholder } from './Image';
import { CustomButton } from './UI/CustomButton';
import { DialogDelete } from './UI/DialogDelete';

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
  const { initEditMode, finishingEditing } = useDraft();

  const navigationType = useNavigationType();
  // useEffect(() => {
  //   if (navigationType === 'POP') {
  //     console.log('POP');

  //     finishingEditing();
  //   }
  // }, [navigationType, finishingEditing]);

  async function handleClickDelete() {
    const controller = new AbortController();
    const signal = controller.signal;
    await deleteAdById(id, signal);
    navigate(RouterPath.List);
  }
  console.log(dataToDisplay);

  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      gap={'5rem'}
      data-testid='detailsAd'
      padding={'0 4rem '}
      paddingTop={'5rem'}
      bgcolor={'rgba(245, 246, 245,0.4)'}
      flexGrow={1}
    >
      <Box width={'30rem'} height={'30rem'}>
        <ImageWithPlaceholder
          type={String(dataToDisplay.data.filter((item) => item.id === 'type')[0].value)}
          src={(dataToDisplay && dataToDisplay.photo) || ''}
          alt={`Изображение по объявлению ${dataToDisplay?.data[0].value}`}
        />
      </Box>
      <Box display={'flex'} flexDirection={'column'} gap={'2rem'} minWidth={'25rem'} flex={1}>
        {dataToDisplay &&
          dataToDisplay.data.map((el, i) => (
            <Box key={+i} display={'flex'} flexDirection={'column'} gap={'1rem'}>
              <Typography variant='h5' sx={{ fontWeight: 500 }}>
                {el?.fieldName}
              </Typography>
              <Typography style={{ fontSize: '1.8rem' }}>{el?.value}</Typography>
            </Box>
          ))}
      </Box>
      <Box display={'flex'} flexDirection={'column'} gap={'2rem'}>
        <CustomButton
          text='Редактировать'
          onClick={() => {
            navigate(RouterPath.Form, { state: { id } });
            initEditMode(initValue);
          }}
          color={'primary'}
        />
        <DialogDelete
          textButton='Удалить'
          dialogTitle='Подтвердите удаление объявления'
          handleClickDelete={handleClickDelete}
        />
      </Box>
    </Box>
  );
};
