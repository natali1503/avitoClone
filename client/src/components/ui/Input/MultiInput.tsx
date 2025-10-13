import { Box, FormControl, FormHelperText, FormLabel, InputAdornment, OutlinedInput } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
//@ts-expect-error: for test
import React, { FC } from 'react';

import { TypeFormData } from '../../../general/TypeFormData';

interface IMultiInput {
  type: string;
  id: keyof TypeFormData;
  control: Control<TypeFormData>;
  fieldName: string;
  required?: boolean;
  error: boolean;
  adornment?: string;
  dataTestId: string;
  errorMessage?: string;
}

export const MultiInput: FC<IMultiInput> = ({
  type,
  id,
  control,
  fieldName,
  required,
  error,
  adornment = '',
  errorMessage,
  dataTestId,
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
          <FormLabel sx={{ width: '22rem', fontSize: '1.8rem' }}>{fieldName}</FormLabel>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <OutlinedInput
              data-testid={dataTestId}
              type={type}
              fullWidth
              {...field}
              sx={{ fontSize: '1.6rem', width: '27rem', bgcolor: 'white' }}
              error={error}
              endAdornment={<InputAdornment position='end'>{adornment}</InputAdornment>}
              aria-label={fieldName}
            />

            {error && <FormHelperText>{errorMessage}</FormHelperText>}
          </Box>
        </FormControl>
      )}
    />
  );
};
