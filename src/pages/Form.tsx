import { Box } from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import { Title } from "../components/Title";
import { Categories, CommonFields, FieldsByType } from "../formFieldNames";
import { CustomInput } from "../components/CustomInput";
import { CustomSelect } from "../components/CustomSelect";
import { CustomButton } from "../components/CustomButton";
import { createAd } from "../api-actions";
import { FC } from "react";

interface IForm {
  formTitle: string;
}

const Form: FC<IForm> = ({ formTitle }) => {
  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} gap={"3rem"}>
      <Title title={formTitle} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={"1rem"}
          maxWidth={"30rem"}
        >
          {CommonFields.map((element, i) => {
            if (element.typeField === "input") {
              return <CustomInput key={+i} name={element.id} control={control} text={element.text} />;
            } else if (element.typeField === "select" && element?.items) {
              return (
                <CustomSelect key={+i} name={element.id} control={control} text={element.text} items={element.items} />
              );
            }
          })}

          {type &&
            FieldsByType[type].map((element, i) => (
              <CustomInput key={+i} name={element.id} control={control} text={element.text} />
            ))}
          <CustomButton text='Отправить' type='submit' />
        </Box>
      </form>
    </Box>
  );
};
