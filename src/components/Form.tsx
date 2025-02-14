import { Control, FieldErrors } from 'react-hook-form';
import { Box } from '@mui/material';
//@ts-expect-error: for test
import React, { FC } from 'react';

import { CustomSelect } from '../components/CustomSelect';
import { CustomInput } from '../components/Input/CustomInput';
import { Title } from '../components/Title';
import { IField } from '../general/FormField/formFieldNames';
import { TypeFormData } from '../general/TypeFormData';
import { IAdToDisplay } from '../store/adInfoSlice';

interface IForm {
  formTitle: string;
  fields: IField[];
  control: Control<TypeFormData>;
  errors: FieldErrors<TypeFormData>;
  dataForEditing?: IAdToDisplay[];
  dataTestId: string;
}

export const Form: FC<IForm> = ({
  formTitle,
  fields,
  control,
  errors,
  dataForEditing,
  dataTestId,
}) => {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={'3rem'}
      data-testid={dataTestId}
    >
      <Title title={formTitle} />

      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        gap={'1rem'}
        maxWidth={'38rem'}
      >
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
                errorMessage={
                  errors[element.id as keyof TypeFormData]?.message || ''
                }
                defaultValue={
                  dataForEditing?.filter((el) => el.id === element.id)[0]?.value
                }
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
                errorMessage={
                  errors[element.id as keyof TypeFormData]?.message || ''
                }
                defaultValue={
                  dataForEditing?.filter((el) => el.id === element.id)[0].value
                }
                dataTestId={element.id}
              />
            );
          }
        })}
      </Box>
    </Box>
  );
};
