import { Box, Button, ButtonProps } from '@mui/material';
//@ts-expect-error: for test
import React, { FC } from 'react';

interface ICustomButton extends ButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  dataTestId?: string;
}

export const CustomButton: FC<ICustomButton> = ({ text, onClick, type, disabled = true, dataTestId, ...props }) => {
  return (
    <Box display={'flex'}>
      <Button variant='outlined' onClick={onClick} type={type} disabled={!disabled} data-testid={dataTestId} {...props}>
        {text}
      </Button>
    </Box>
  );
};
