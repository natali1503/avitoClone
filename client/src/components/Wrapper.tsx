import { Box } from '@mui/material';
//@ts-expect-error: for test
import React, { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Wrapper: FC<Props> = ({ children }) => {
  return (
    <Box display={'flex'} flexDirection={'column'} flex={1}>
      {children}
    </Box>
  );
};
