import { Control, Controller } from 'react-hook-form';
import { Box, FormControl, FormHelperText, FormLabel } from '@mui/material';
//@ts-expect-error: for test
import React, { FC } from 'react';

import { TypeFormData } from '../../general/TypeFormData';

interface IFileInput {
  id: keyof TypeFormData;
  control: Control<TypeFormData>;
  fieldName: string;
  required?: boolean;
  error: boolean;
  errorMessage?: string;
  dataTestId: string;
}

export const FileInput: FC<IFileInput> = ({
  id,
  control,
  fieldName,
  required,
  error,
  dataTestId,
  errorMessage,
}) => {
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
          <FormLabel sx={{ width: '12rem' }}>{fieldName}</FormLabel>
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
            />

            {error && <FormHelperText>{errorMessage}</FormHelperText>}
          </Box>
        </FormControl>
      )}
    />
  );
};
