import { Box, IconButton, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { FC } from 'react';

interface ITextFieldFilter {
  value: string;
  fieldName: string;
  setValue: (newValue: string) => void;
}

export const TextFieldFilter: FC<ITextFieldFilter> = ({ value, fieldName, setValue }) => {
  function handleChange(e: React.ChangeEvent<{ value: unknown }>) {
    const value = e.target.value as string;
    setValue(value.toLocaleLowerCase());
  }

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Typography sx={{ fontSize: { xs: '1.4rem', md: '1.6rem' }, width: '100%' }}>{fieldName}</Typography>
      <TextField
        value={value}
        onChange={handleChange}
        slotProps={{
          input: {
            endAdornment: value && (
              <IconButton
                size='small'
                onClick={() => {
                  setValue('');
                }}
                sx={{ width: { xs: '1.2rem', md: '1.4rem' }, height: { xs: '1.2rem', md: '1.4rem' } }}
              >
                <CloseIcon />
              </IconButton>
            ),
          },
        }}
        variant='standard'
        sx={{
          width: '100%',
          '& .MuiInputBase-input': {
            fontSize: { xs: '1.4rem', md: '1.4rem' },
          },
        }}
      />
    </Box>
  );
};
