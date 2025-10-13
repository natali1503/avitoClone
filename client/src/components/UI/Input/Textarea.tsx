import { Box, FormControl, FormHelperText, FormLabel, TextareaAutosize } from '@mui/material';
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
  const [isHovered, setIsHovered] = useState(false);

  const getBorderColor = () => {
    if (error) return '#d32f2f';
    if (isHovered) return 'rgba(0, 0, 0, 0.87)';
    return 'rgba(0, 0, 0, 0.23)';
  };
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
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '2rem',
              width: '100%',
            }}
          >
            <FormLabel
              sx={{ width: '22rem', fontSize: '1.8rem', color: isFocused ? '#1E88E5 ' : 'rgba(0, 0, 0, 0.6)' }}
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
              <TextareaAutosize
                {...field}
                aria-label={fieldName}
                value={String(field?.value)}
                minRows={4}
                maxRows={12}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  fontSize: '1.4rem',
                  width: '27rem',
                  resize: 'vertical',
                  fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                  padding: '8px',
                  paddingLeft: '14px',
                  border: `1px solid ${getBorderColor()}`,
                  borderRadius: '4px',
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
//hover rgba(0, 0, 0, 0.87);
//rgba(0, 0, 0, 0.23);
