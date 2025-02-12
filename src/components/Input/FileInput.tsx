import { Box, FormControl, FormHelperText, FormLabel } from "@mui/material";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";

interface IFileInput {
  name: string;
  control: Control;
  text: string;
  required?: boolean;
  error: boolean;
  defaultValue?: string;
  errorMessage?: string;
}

export const FileInput: FC<IFileInput> = ({
  name,
  control,
  text,
  required,
  error,
  defaultValue = "",

  errorMessage,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={required ? { required: "Заполните обязательное поле" } : undefined}
      render={({ field }) => (
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "2rem",
            width: "100%",
            height: "8rem",
          }}
        >
          <FormLabel sx={{ width: "12rem" }}>{text}</FormLabel>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <input type='file' onChange={(e) => field.onChange(e.target.files)} />

            {error && <FormHelperText>{errorMessage}</FormHelperText>}
          </Box>
        </FormControl>
      )}
    />
  );
};
