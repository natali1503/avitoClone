import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { CustomButton } from '../components/CustomButton';
import { RouterPath } from '../router/routerPath';

export const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate(RouterPath.List);
  }

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      gap={'2rem'}
      alignItems={'center'}
      flex={1}
    >
      <Typography variant='h2'>Страница не существует</Typography>
      <CustomButton text='Перейти к объявлениям' onClick={handleClick} sx={{ fontSize: '2rem' }} />
    </Box>
  );
};
