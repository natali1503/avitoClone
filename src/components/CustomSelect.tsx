import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";
import { ICategories } from "../formFieldNames";

interface ICustomSelect {
  name: string;
  control: Control;
  text: string;
  items: ICategories[];
}

export const CustomSelect: FC<ICustomSelect> = ({ name, control, text, items }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{text}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue=''
        render={({ field }) => (
          <Select {...field} value={field.value} label={text}>
            {items.map((item, i) => (
              <MenuItem key={+i} value={item.id}>
                {item.text}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};
