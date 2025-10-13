import { Box, Typography } from '@mui/material';
//@ts-expect-error: for test
import React, { FC } from 'react';

interface IHeader {
  header: string;
}
export const Header: FC<IHeader> = ({ header }) => {
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      padding={'2rem 2rem'}
      sx={{
        borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
      }}
    >
      <Box>
        <Typography variant='h1'>{header}</Typography>
      </Box>
    </Box>
  );
};
