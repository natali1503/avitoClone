import { FC } from "react";
import { Form } from "react-router-dom";
import { CommonFields } from "../FormField/formFieldNames";

interface ICommonFieldsForm {
  control;
  errors;
  data;
  photo;
}

export const CommonFieldsForm: FC<ICommonFieldsForm> = ({ control }) => {
  return (
    <Form
      fields={CommonFields}
      formTitle={"Шаг 1"}
      control={control}
      errors={errors}
      dataForEditing={dataForEditing?.data}
      photoForEditing={dataForEditing?.photo}
    />
  );
};
