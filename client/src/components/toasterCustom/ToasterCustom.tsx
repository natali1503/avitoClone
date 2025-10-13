import { Theme } from '@mui/material';
//@ts-expect-error: for test
import React, { FC } from 'react';
import { Toaster } from 'react-hot-toast';

interface IToasterCustom {
  theme: Theme;
}

export const ToasterCustom: FC<IToasterCustom> = ({ theme }) => {
  return (
    <Toaster
      position='bottom-center'
      reverseOrder={false}
      toastOptions={{
        duration: 4000,
        style: {
          background: theme.palette.background.paper,
          boxShadow: 'none',
          borderRadius: '8px',
          border: `1px solid ${theme.palette.primary.main}`,
          color: '#000',
          fontSize: '16px',
        },
        success: {
          duration: 3000,
          iconTheme: {
            primary: '#4caf50',
            secondary: '#fff',
          },
        },
        error: {
          duration: 5000,
          iconTheme: {
            primary: '#f44336',
            secondary: '#fff',
          },
        },
      }}
    />
  );
};
