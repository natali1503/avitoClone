import { Control, FieldErrors } from 'react-hook-form';
import { Box } from '@mui/material';
//@ts-expect-error: for test
import React, { FC } from 'react';

import { IField } from '../../general/FormField/formFieldNames';
import { TypeFormData } from '../../general/TypeFormData';
import { CustomSelect } from '../../components/ui/CustomSelect';
import { Title } from '../../components/ui/Title';
import { CustomInput } from '../../components/ui/Input/CustomInput';
import { Textarea } from '../../components/ui/Input/Textarea';

interface IForm {
  formTitle: string;
  fields: IField[];
  control: Control<TypeFormData>;
  errors: FieldErrors<TypeFormData>;
  dataTestId: string;
}

export const Form: FC<IForm> = ({ formTitle, fields, control, errors, dataTestId }) => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'2rem'} data-testid={dataTestId} padding={'2rem 0'}>
      <Title title={formTitle} />

      <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} gap={'1rem'}>
        {fields.map((element, i) => {
          if (element.typeField === 'input') {
            return (
              <CustomInput
                key={+i}
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
            );
          } else if (element.typeField === 'select' && element?.items) {
            return (
              <CustomSelect
                key={+i}
                id={element.id as keyof TypeFormData}
                control={control}
                fieldName={element.fieldName}
                items={element.items}
                required={element.required}
                error={!!errors[element.id as keyof TypeFormData]}
                errorMessage={errors[element.id as keyof TypeFormData]?.message || ''}
                dataTestId={element.id}
              />
            );
          } else if (element.typeField === 'textarea') {
            return (
              <Textarea
                key={+i}
                id={element.id as keyof TypeFormData}
                control={control}
                fieldName={element.fieldName}
                required={element.required}
                error={!!errors[element.id as keyof TypeFormData]}
                errorMessage={errors[element.id as keyof TypeFormData]?.message || ''}
                dataTestId={element.id}
              />
            );
          }
        })}
      </Box>
    </Box>
  );
};
