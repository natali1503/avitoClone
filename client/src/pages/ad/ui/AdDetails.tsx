import { Box, Typography } from '@mui/material';
//@ts-expect-error: for test
import React, { FC } from 'react';

import { IDataToDisplay } from '../../../store/adInfoSlice';
import { ImageWithPlaceholder } from '../../../components/Image';
import { CustomButton } from '../../../components/ui/CustomButton';
import { DialogDelete } from '../../../components/ui/DialogDelete';
import { useAdDetails } from '../hooks/useAdDetails';

interface IDetailsAd {
  dataToDisplay: IDataToDisplay;
  id: string;
}

export const AdDetails: FC<IDetailsAd> = ({ dataToDisplay, id }) => {
  const { handleDeleteAd, handleEditAd } = useAdDetails(dataToDisplay, id);
  return (
    <Box
      display={'flex'}
      // flexDirection={'row'}
      gap={'5rem'}
      data-testid='detailsAd'
      padding={'0 4rem '}
      paddingTop={'5rem'}
      bgcolor={'rgba(245, 246, 245,0.4)'}
      flexGrow={1}
      sx={{ gap: { xs: '2rem', md: '5rem' }, flexDirection: { xs: 'column', sm: 'row' } }}
    >
      <Box
        display={'flex'}
        gap={'2rem'}
        alignItems={'center'}
        sx={{
          flexDirection: { xs: 'row', sm: 'column' },
          justifyContent: { xs: 'space-between', sm: 'flex-start' },
        }}
      >
        <Box
          sx={{
            width: { xs: '16rem', sm: '24rem', md: '30rem' },
            height: { xs: '16rem', sm: '24rem', md: '30rem' },
          }}
        >
          <ImageWithPlaceholder
            type={String(dataToDisplay.data.filter((item) => item.id === 'type')[0].value)}
            src={(dataToDisplay && dataToDisplay.photo) || ''}
            alt={`Изображение по объявлению ${dataToDisplay?.data[0].value}`}
          />
        </Box>

        <Box
          display={'flex'}
          gap={'2rem'}
          alignItems={'flex-start'}
          sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        >
          <CustomButton text='Редактировать' onClick={handleEditAd} color={'primary'} />
          <DialogDelete
            textButton='Удалить'
            dialogTitle='Подтвердите удаление объявления'
            handleClickDelete={handleDeleteAd}
          />
        </Box>
      </Box>
      <Box display={'flex'} flexDirection={'column'} gap={'2rem'} minWidth={'25rem'} flex={1}>
        {dataToDisplay &&
          dataToDisplay.data.map((el, i) => (
            <Box key={+i} display={'flex'} flexDirection={'column'} sx={{ gap: { xs: '0.5rem', md: '1rem' } }}>
              <Typography variant='h5' sx={{ fontWeight: 500 }}>
                {el?.fieldName}
              </Typography>
              <Typography style={{ fontSize: '1.8rem' }}>{el?.value}</Typography>
            </Box>
          ))}
      </Box>
    </Box>
  );
};
