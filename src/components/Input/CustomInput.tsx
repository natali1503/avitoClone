import { FC } from 'react';
import { Control } from 'react-hook-form';

import { TypeFormData } from '../../general/TypeFormData';

import { FileInput } from './FileInput';
import { MultiInput } from './MultiInput';

interface ICustomInput {
  type: string;
  id: keyof TypeFormData;
  control: Control<TypeFormData>;
  fieldName: string;
  required?: boolean;
  defaultValue?: string | number;
  adornment?: string;
  error: boolean;
  errorMessage?: string;
}

export const CustomInput: FC<ICustomInput> = ({
  type,
  id,
  control,
  fieldName,
  required,
  error,
  defaultValue = '',
  adornment = '',

  errorMessage,
}) => {
  {
    return type !== 'file' ? (
      <MultiInput
        type={type}
        id={id}
        control={control}
        fieldName={fieldName}
        required={required}
        error={error}
        defaultValue={defaultValue}
        errorMessage={errorMessage}
        adornment={adornment}
      />
    ) : (
      <FileInput
        id={id}
        control={control}
        fieldName={fieldName}
        required={required}
        error={error}
        errorMessage={errorMessage}
      />
    );
  }
};
