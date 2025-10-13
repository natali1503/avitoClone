import { Box, Typography } from '@mui/material';
//@ts-expect-error: for test
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ImageWithPlaceholder } from '../../../../components/Image';
import { CustomButton } from '../../../../components/ui/CustomButton';

interface IAdItem {
  id: number;
  name: string;
  location: string;
  type: string;
  photo?: string;
  dataTestId: string;
}

export const AdItem: FC<IAdItem> = ({ id, name, location, type, photo, dataTestId }) => {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/item/${id}`);
  }
  return (
    <Box
      data-testid={dataTestId}
      bgcolor={'#fff'}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        borderRadius: '4px',
        border: '1px solid rgb(224,224,224)',
        padding: '2rem 4rem',
        gap: '8rem',
        alignItems: 'center',
      }}
    >
      <Box width={'15rem'} height={'15rem'}>
        <ImageWithPlaceholder src={photo} alt={`Изображение по объявлению ${name}`} type={type} />
      </Box>
      <Box display={'flex'} flexDirection={'column'} gap={'0.5rem'} flex={1}>
        <Typography variant='h3' style={{ paddingBottom: '1.6rem' }}>
          {name}
        </Typography>
        <Typography variant='subtitle1'>{location}</Typography>
        <Typography variant='subtitle1'>{type}</Typography>
      </Box>

      <CustomButton text='Открыть' onClick={handleClick} />
    </Box>
  );
};
