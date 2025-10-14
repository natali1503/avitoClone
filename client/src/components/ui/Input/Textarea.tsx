import { Box, FormControl, FormHelperText, FormLabel, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
//@ts-expect-error: for test
import React, { FC, useState } from 'react';

import { TypeFormData } from '../../../general/TypeFormData';

interface ITextarea {
  id: keyof TypeFormData;
  control: Control<TypeFormData>;
  fieldName: string;
  required?: boolean;
  error: boolean;
  errorMessage?: string;
  dataTestId: string;
}

export const Textarea: FC<ITextarea> = ({ id, control, fieldName, required, error, errorMessage }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Controller
      name={id}
      control={control}
      rules={required ? { required: 'Заполните обязательное поле' } : undefined}
      render={({ field }) => (
        <FormControl
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: { xs: '1rem', sm: '2rem' },
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: { xs: '1rem', sm: '2rem' },
              width: '100%',
            }}
          >
            <FormLabel
              sx={{
                width: { xs: '16rem', sm: '22rem' },
                fontSize: { xs: '1.4rem', sm: '1.6rem' },
                color: isFocused ? '#1E88E5 ' : 'rgba(0, 0, 0, 0.6)',
              }}
            >
              {fieldName}
            </FormLabel>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <TextField
                multiline
                {...field}
                error={error}
                aria-label={fieldName}
                value={String(field?.value)}
                minRows={4}
                maxRows={12}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                sx={{
                  bgcolor: 'white',
                  fontSize: '1.4rem',
                  width: '100%',
                  resize: 'vertical',
                  fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                  borderRadius: '4px',
                  '& .MuiInputBase-root': {
                    padding: { xs: '8px 2px 8px 8px' },
                  },
                  '& .MuiInputBase-input': {
                    fontSize: { xs: '1.4rem', sm: '1.6rem' },
                  },
                }}
              />
              {error && <FormHelperText>{errorMessage}</FormHelperText>}
            </Box>
          </Box>
        </FormControl>
      )}
    />
  );
};
