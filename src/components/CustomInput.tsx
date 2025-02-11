import { Box, FormControl, FormHelperText, FormLabel, InputAdornment, OutlinedInput } from "@mui/material";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";

interface ICustomInput {
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
  name,
  control,
  text,
  required,
  error,
  defaultValue = "",
  adornment = "",

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
            <OutlinedInput
              fullWidth
              {...field}
              sx={{ fontSize: "1.8rem", width: "25rem" }}
              error={error}
              endAdornment={<InputAdornment position='end'>{adornment}</InputAdornment>}
            />
            {error && <FormHelperText>{errorMessage}</FormHelperText>}
          </Box>
        </FormControl>
      )}
    />
  );
};
