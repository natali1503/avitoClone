import { Box, Typography } from '@mui/material';
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
        border: '1px solid rgba(0, 0, 0, 0.23)',
        borderRadius: '10px',
        justifyContent: 'space-around',
        padding: '20px 30px',
        gap: '5rem',
        alignItems: 'center',
      }}
    >
      <Box width={'8rem'} height={'8rem'} sx={{ border: '1px solid rgba(0, 0, 0, 0.23)', borderRadius: '10px' }}>
        <ImageWithPlaceholder src={photo} alt={`Изображение по объявлению ${name}`} />
      </Box>
      <Box display={'flex'} flexDirection={'column'} gap={'5px'}>
        <Typography>{name}</Typography>
        <Typography>{location}</Typography>
        <Typography>{type}</Typography>
      </Box>

      <CustomButton text='Открыть' onClick={handleClick} />
    </Box>
  );
};
