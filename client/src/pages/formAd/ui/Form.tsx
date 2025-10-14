import { Control, FieldErrors } from 'react-hook-form';
import { Box } from '@mui/material';
//@ts-expect-error: for test
import React, { FC } from 'react';

import { IField } from '../../../general/FormField/formFieldNames';
import { TypeFormData } from '../../../general/TypeFormData';
import { CustomSelect } from '../../../components/ui/CustomSelect';
import { Title } from '../../../components/ui/Title';
import { CustomInput } from '../../../components/ui/Input/CustomInput';
import { Textarea } from '../../../components/ui/Input/Textarea';

interface IForm {
  formTitle: string;
  fields: IField[];
  control: Control<TypeFormData>;
  errors: FieldErrors<TypeFormData>;
  dataTestId: string;
}

export const Form: FC<IForm> = ({ formTitle, fields, control, errors, dataTestId }) => {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={'2rem'}
      data-testid={dataTestId}
      padding={'2rem 0'}
      flex={1}
      minHeight={0}
    >
      <Title title={formTitle} />

      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        gap={'2.2rem'}
        sx={{ paddingLeft: { xs: 'rem' }, paddingRight: { xs: 'rem' } }}
      >
        {fields.map((element, i) => {
          if (element.typeField === 'input') {
            return (
              <Box key={+i} sx={{ width: { xs: '36rem', sm: '47rem' } }}>
                <CustomInput
                  type={element.type}
                  id={element.id as keyof TypeFormData}
                  control={control}
                  fieldName={element.fieldName}
                  required={element.required}
                  error={!!errors[element.id as keyof TypeFormData]}
                  errorMessage={errors[element.id as keyof TypeFormData]?.message || ''}
                  adornment={element.adornment}
                  dataTestId={element.id}
                />
              </Box>
            );
          } else if (element.typeField === 'select' && element?.items) {
            return (
              <Box key={+i} sx={{ width: { xs: '36rem', sm: '47rem' } }}>
                <CustomSelect
                  id={element.id as keyof TypeFormData}
                  control={control}
                  fieldName={element.fieldName}
                  items={element.items}
                  required={element.required}
                  error={!!errors[element.id as keyof TypeFormData]}
                  errorMessage={errors[element.id as keyof TypeFormData]?.message || ''}
                  dataTestId={element.id}
                />
              </Box>
            );
          } else if (element.typeField === 'textarea') {
            return (
              <Box key={+i} sx={{ width: { xs: '36rem', sm: '47rem' } }}>
                <Textarea
                  id={element.id as keyof TypeFormData}
                  control={control}
                  fieldName={element.fieldName}
                  required={element.required}
                  error={!!errors[element.id as keyof TypeFormData]}
                  errorMessage={errors[element.id as keyof TypeFormData]?.message || ''}
                  dataTestId={element.id}
                />
              </Box>
            );
          }
        })}
      </Box>
    </Box>
  );
};
