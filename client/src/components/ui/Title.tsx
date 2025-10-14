import { Box, Typography } from '@mui/material';
//@ts-expect-error: for test
import React, { FC } from 'react';

interface ITitle {
  title: string;
}
export const Title: FC<ITitle> = ({ title }) => {
  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
      <Typography
        sx={{
          typography: { xs: 'h3', sm: 'h3', md: 'h1' },
          fontSize: { xs: '1.6rem', md: '2rem' },
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};
