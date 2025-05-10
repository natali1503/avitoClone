import { Box, Typography } from '@mui/material';
//@ts-expect-error: for test
import React, { FC } from 'react';

interface ITitle {
  title: string;
}
export const Title: FC<ITitle> = ({ title }) => {
  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
      <Typography variant='h1'>{title}</Typography>
    </Box>
  );
};
