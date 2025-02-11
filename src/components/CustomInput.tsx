import { TextField } from "@mui/material";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";

interface ICustomInput {
  name: string;
  control: Control;
  text: string;
}

export const CustomInput: FC<ICustomInput> = ({ name, control, text }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      render={({ field }) => (
        <TextField fullWidth {...field} label={text} variant='outlined' sx={{ fontSize: "2.8rem" }} />
      )}
    />
  );
};
