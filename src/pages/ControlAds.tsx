import { Box } from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import { Title } from "../components/Title";
import { Categories, CommonFields, FieldsByType } from "../FormField/formFieldNames";

import { CustomButton } from "../components/CustomButton";
import { createAd, updatingAd } from "../api-actions";
import { Form } from "./Form";
import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { RouterPath } from "../router/routerPath";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export function PostingAds() {
  const {
    control,
    trigger,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onTouched" });

  const { dataToDisplay } = useSelector((state: RootState) => state.adInfo);

  const location = useLocation();

  const dataForEditing = dataToDisplay || [];
  const type =
    useWatch({ control, name: "type" }) ||
    Categories.filter((el) => el.text === dataForEditing?.filter((el) => el?.id === "type")[0]?.value)[0]?.id ||
    "";

  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const creationMode = !dataForEditing.length;

  const onSubmit = async (data: any) => {
    const categorie = Categories.filter((el) => el.id === data.type)[0];
    if (creationMode) {
      await createAd({ ...data, type: categorie.text });
      navigate(RouterPath.List);
    } else {
      await updatingAd({ ...data, type: categorie.text }, location.state.id);
      navigate(RouterPath.List);
    }
  };

  const handleClick = (step: number) => {
    setCurrentStep(step);
  };

  const handleClickNextStep = async () => {
    const isValid = await trigger(CommonFields.map((field) => field.id));

    if (isValid) handleClick(2);
  };

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} gap={"3rem"}>
      <Title title={creationMode ? "Форма размещения" : "Форма редактирования"} />
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={"1rem"}
          width={"100%"}
        >
          {currentStep === 1 && (
            <Form
              fields={CommonFields}
              formTitle={"Шаг 1"}
              control={control}
              errors={errors}
              dataForEditing={dataForEditing}
            />
          )}

          {currentStep === 2 && (
            <Form
              fields={FieldsByType[type]}
              formTitle={"Шаг 2"}
              control={control}
              errors={errors}
              dataForEditing={dataForEditing}
            />
          )}

          {currentStep === 1 && <CustomButton text='Далее' type='button' onClick={handleClickNextStep} />}

          {!!type && currentStep === 2 && (
            <Box display={"flex"} flexDirection={"row"} gap={"1rem"}>
              <CustomButton text='Назад' type='button' onClick={() => handleClick(1)} disabled={currentStep === 2} />
              <CustomButton text='Отправить' type='submit' disabled={!!true} />
            </Box>
          )}
        </Box>
      </form>
    </Box>
  );
}
