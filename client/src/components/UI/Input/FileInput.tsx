import { Control, Controller } from 'react-hook-form';
import { Box, FormControl, FormHelperText, FormLabel } from '@mui/material';
//@ts-expect-error: for test
import React, { FC, useState } from 'react';

import { TypeFormData } from '../../../general/TypeFormData';

interface IFileInput {
  id: keyof TypeFormData;
  control: Control<TypeFormData>;
  fieldName: string;
  required?: boolean;
  error: boolean;
  errorMessage?: string;
  dataTestId: string;
}

export const FileInput: FC<IFileInput> = ({ id, control, fieldName, required, error, dataTestId, errorMessage }) => {
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
            gap: '2rem',
            width: '100%',
            height: '8rem',
          }}
        >
          <FormLabel sx={{ width: '22rem', fontSize: '1.8rem', color: isFocused ? '#1E88E5 ' : 'rgba(0, 0, 0, 0.6)' }}>
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
            <input
              type='file'
              onChange={(e) => field.onChange(e.target.files)}
              data-testid={dataTestId}
              style={{ fontSize: '1.6rem', width: '27rem' }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />

            {error && <FormHelperText>{errorMessage}</FormHelperText>}
          </Box>
        </FormControl>
      )}
    />
  );
};
