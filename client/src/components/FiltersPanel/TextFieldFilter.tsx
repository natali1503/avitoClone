import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
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
      <Typography>{fieldName}</Typography>
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
              >
                <CloseIcon />
              </IconButton>
            ),
          },
        }}
        variant='standard'
        sx={{ fontSize: '1.4rem', minWidth: '15rem', width: '30rem' }}
      />
    </Box>
  );
};
