import { Box, Typography } from '@mui/material';
//@ts-expect-error: for test
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { ImageWithPlaceholder } from '../Image';
import { CustomButton } from '../CustomButton';

interface IItem {
  id: number;
  name: string;
  location: string;
  type: string;
  photo?: string;
  dataTestId: string;
}

export const Item: FC<IItem> = ({ id, name, location, type, photo, dataTestId }) => {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/item/${id}`);
  }
  return (
    <Box
      data-testid={dataTestId}
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
      <Box width={'8rem'} height={'8rem'}>
        <ImageWithPlaceholder src={photo} alt={`Изображение по объявлению ${name}`} />
      </Box>
      <Box display={'flex'} flexDirection={'column'} gap={'0.5rem'} flex={1}>
        <Typography>{name}</Typography>
        <Typography>{location}</Typography>
        <Typography>{type}</Typography>
      </Box>

      <CustomButton text='Открыть' onClick={handleClick} />
    </Box>
  );
};
