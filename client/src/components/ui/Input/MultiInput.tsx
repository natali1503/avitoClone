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
            gap: { xs: '1rem', sm: '2rem' },
            width: '100%',
            height: { xs: '4rem', sm: '8rem' },
          }}
        >
          <FormLabel sx={{ width: { xs: '16rem', sm: '22rem' }, fontSize: { xs: '1.4rem', sm: '1.6rem' } }}>
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
            <OutlinedInput
              data-testid={dataTestId}
              type={type}
              fullWidth
              {...field}
              sx={{
                bgcolor: 'white',
                width: '100%',
                fontSize: { xs: '1.4rem', sm: '1.6rem' },
                '& .MuiOutlinedInput-input': {
                  padding: {
                    xs: '8px 2px 8px 8px',
                  },
                },
              }}
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
