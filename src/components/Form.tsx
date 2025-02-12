import { Control } from "react-hook-form";
import { Box } from "@mui/material";
import { FC } from "react";

import { CustomInput } from "../components/Input/CustomInput";
import { CustomSelect } from "../components/CustomSelect";
import { TypeFormData } from "../general/TypeFormData";
import { IField } from "../FormField/formFieldNames";
import { IAdToDisplay } from "../store/adInfoSlice";
import { Title } from "../components/Title";

interface IForm {
  formTitle: string;
  fields: IField[];
  control: Control<TypeFormData>;
  errors: any;
  dataForEditing?: IAdToDisplay[];
}

export const Form: FC<IForm> = ({ formTitle, fields, control, errors, dataForEditing }) => {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={"3rem"}>
      <Title title={formTitle} />

      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"1rem"}
        maxWidth={"38rem"}
      >
        {fields.map((element, i) => {
          if (element.typeField === "input") {
            return (
              <CustomInput
                key={+i}
                type={element.type}
                name={element.id}
                control={control}
                fieldName={element.fieldName}
                required={element.required}
                error={errors[element.id]}
                errorMessage={errors[element.id]?.message}
                defaultValue={dataForEditing?.filter((el) => el.id === element.id)[0]?.value}
                adornment={element.adornment}
              />
            );
          } else if (element.typeField === "select" && element?.items) {
            return (
              <CustomSelect
                key={+i}
                name={element.id}
                control={control}
                fieldName={element.fieldName}
                items={element.items}
                required={element.required}
                error={errors[element.id]}
                errorMessage={errors[element.id]?.message}
                defaultValue={
                  element?.items.filter(
                    (el) => el.text === dataForEditing?.filter((el) => el?.id === element?.id)[0]?.value
                  )[0]?.id
                }
              />
            );
          }
        })}
      </Box>
    </Box>
  );
};
