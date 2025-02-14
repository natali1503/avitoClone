import { Box, Button } from '@mui/material';
//@ts-expect-error: for test
import React, { FC } from 'react';

interface ICustomButton {
  text: string;
  href?: string;
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  dataTestId?: string;
}

export const CustomButton: FC<ICustomButton> = ({ text, href, onClick, type, disabled = true, dataTestId }) => {
  return (
    <Box display={'flex'}>
      <Button
        href={href}
        variant='outlined'
        sx={{ textTransform: 'none' }}
        onClick={onClick}
        type={type}
        disabled={!disabled}
        data-testid={dataTestId}
      >
        {text}
      </Button>
    </Box>
  );
};
