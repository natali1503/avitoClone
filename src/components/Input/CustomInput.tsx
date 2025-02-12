import { Control } from "react-hook-form";
import { FC } from "react";

import { TypeFormData } from "../../general/TypeFormData";
import { MultiInput } from "./MultiInput";
import { FileInput } from "./FileInput";

interface ICustomInput {
  type: string;
  name: string;
  control: Control<TypeFormData>;
  fieldName: string;
  required?: boolean;
  error: boolean;
  defaultValue?: string | number;
  adornment?: string;
  errorMessage?: string;
}

export const CustomInput: FC<ICustomInput> = ({
  type,
  name,
  control,
  fieldName,
  required,
  error,
  defaultValue = "",
  adornment = "",

  errorMessage,
}) => {
  {
    return type !== "file" ? (
      <MultiInput
        type={type}
        name={name}
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
        name={name}
        control={control}
        fieldName={fieldName}
        required={required}
        error={error}
        errorMessage={errorMessage}
      />
    );
  }
};
