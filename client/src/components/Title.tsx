import { Box, Typography } from '@mui/material';
//@ts-expect-error: for test
import React from 'react';

interface ITitle {
  title: string;
}
export function Title(props: ITitle) {
  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
      <Typography variant='h1'>{props.title}</Typography>
    </Box>
  );
}
