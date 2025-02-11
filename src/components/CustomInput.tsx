import { FormControl, FormLabel, TextField } from "@mui/material";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";

interface ICustomInput {
  name: string;
  control: Control;
  text: string;
  required?: boolean;
  error: boolean;
  defaultValue?: string;
}

export const CustomInput: FC<ICustomInput> = ({ name, control, text, required, error, defaultValue = "" }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={required ? { required: "Заполните обязательное поле" } : undefined}
      render={({ field }) => (
        <FormControl sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}>
          <FormLabel>{text}</FormLabel>
          <TextField
            fullWidth
            {...field}
            variant='outlined'
            sx={{ fontSize: "2.8rem" }}
            // helperText={"Заполните обязательное поле"}
            error={error}
            // helperText={errors.name?.message}
          />
        </FormControl>
      )}
    />
  );
};
