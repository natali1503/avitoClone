import { Control } from "react-hook-form";
import { FC } from "react";

import { FileInput } from "./FileInput";
import { MultiInput } from "./MultiInput";

interface ICustomInput {
  type: string;
  name: string;
  control: Control;
  text: string;
  required?: boolean;
  error: boolean;
  defaultValue?: string;
  adornment?: string;
  errorMessage?: string;
}

export const CustomInput: FC<ICustomInput> = ({
  type,
  name,
  control,
  text,
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
        text={text}
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
        text={text}
        required={required}
        error={error}
        defaultValue={defaultValue}
        errorMessage={errorMessage}
      />
    );
  }
};
