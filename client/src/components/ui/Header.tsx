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
      sx={{
        borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
        padding: { xs: '1.8rem', md: '2rem' },
      }}
    >
      <Box>
        <Typography
          sx={{
            typography: { xs: 'h3', sm: 'h3', md: 'h1' },
            fontSize: { xs: '1.8rem', md: '2.2rem' },
          }}
        >
          {header}
        </Typography>
      </Box>
    </Box>
  );
};
