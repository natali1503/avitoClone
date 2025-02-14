import { Control, Controller } from 'react-hook-form';
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  InputAdornment,
  OutlinedInput,
} from '@mui/material';
//@ts-expect-error: for test
import React, { FC } from 'react';

import { TypeFormData } from '../../general/TypeFormData';

interface IMultiInput {
  type: string;
  id: keyof TypeFormData;
  control: Control<TypeFormData>;
  fieldName: string;
  required?: boolean;
  error: boolean;
  defaultValue?: string | number;
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
  defaultValue = '',
  adornment = '',
  errorMessage,
  dataTestId,
}) => {
  return (
    <Controller
      name={id}
      control={control}
      defaultValue={defaultValue}
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
            <OutlinedInput
              data-testid={dataTestId}
              type={type}
              fullWidth
              {...field}
              sx={{ fontSize: '1.4rem', width: '25rem' }}
              error={error}
              endAdornment={
                <InputAdornment position='end'>{adornment}</InputAdornment>
              }
            />

            {error && <FormHelperText>{errorMessage}</FormHelperText>}
          </Box>
        </FormControl>
      )}
    />
  );
};
