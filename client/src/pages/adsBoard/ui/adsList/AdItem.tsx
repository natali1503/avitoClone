import { Box, Grid, Typography } from '@mui/material';
//@ts-expect-error: for test
import React, { FC, useEffect } from 'react';
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
        padding: { xs: '1.4rem 2rem', sm: '1.5rem 3rem', md: '2rem 4rem' },
        gap: { xs: '2rem', sm: '2rem', md: '6rem' },
        alignItems: 'center',
        width: '60rem',
      }}
    >
      <Box
        sx={{
          width: { xs: '12rem', sm: '14rem', md: '16rem' },
          height: { xs: '12rem', sm: '14rem', md: '16rem' },
        }}
      >
        <ImageWithPlaceholder src={photo} alt={`Изображение по объявлению ${name}`} type={type} />
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box display={'flex'} flexDirection={'column'} gap={'0.5rem'} flex={1}>
            <Typography
              style={{ paddingBottom: '1.6rem' }}
              sx={{
                typography: { xs: 'h3', sm: 'h3', md: 'h3' },
                fontSize: { xs: '1.8rem', md: '2.4rem' },
              }}
            >
              {name}
            </Typography>
            <Typography variant='subtitle1'>{location}</Typography>
            <Typography variant='subtitle1'>{type}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomButton text='Открыть' onClick={handleClick} />
        </Grid>
      </Grid>
    </Box>
  );
};
