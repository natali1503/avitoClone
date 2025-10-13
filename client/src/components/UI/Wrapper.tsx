import { Box } from '@mui/material';
//@ts-expect-error: for test
import React, { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Wrapper: FC<Props> = ({ children }) => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      flex={1}
      sx={{
        opacity: 0,
        animation: 'fadeIn 0.3s ease-in forwards',
        '@keyframes fadeIn': {
          to: { opacity: 1 },
        },
      }}
    >
      {children}
    </Box>
  );
};
