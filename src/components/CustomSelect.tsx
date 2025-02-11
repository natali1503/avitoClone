import { Box, FormControl, FormHelperText, FormLabel, MenuItem, Select } from "@mui/material";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";
import { ICategories } from "../FormField/formFieldNames";

interface ICustomSelect {
  name: string;
  control: Control;
  text: string;
  items: ICategories[];
  required?: boolean;
  error: boolean;
  defaultValue?: string;
  errorMessage?: string;
}

export const CustomSelect: FC<ICustomSelect> = ({
  name,
  control,
  text,
  items,
  required,
  error,
  defaultValue = "",
  errorMessage,
}) => {
  return (
    <FormControl fullWidth sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}>
      <FormLabel sx={{ width: "12rem" }}>{text}</FormLabel>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          rules={required ? { required: "Заполните обязательное поле" } : undefined}
          render={({ field }) => (
            <Select {...field} value={field.value} error={error} fullWidth sx={{ fontSize: "1.8rem", width: "25rem" }}>
              {items.map((item, i) => (
                <MenuItem key={+i} value={item.id}>
                  {item.text}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {error && <FormHelperText>{errorMessage}</FormHelperText>}
      </Box>
    </FormControl>
  );
};
