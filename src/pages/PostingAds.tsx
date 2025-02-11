import { Box } from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import { Title } from "../components/Title";
import { Categories, CommonFields, FieldsByType } from "../formFieldNames";
import { CustomInput } from "../components/CustomInput";
import { CustomSelect } from "../components/CustomSelect";
import { CustomButton } from "../components/CustomButton";
import { createAd } from "../api-actions";

export function PostingAds() {
  const { handleSubmit, control } = useForm();
  const onSubmit = async (data: any) => {
    const categorie = Categories.filter((el) => el.id === data.type)[0];
    const body = JSON.stringify({ ...data, type: categorie.text });
    console.log(data);
    // const test = await fetch("/api/items", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body,
    // });
    await createAd({ ...data, type: categorie.text });
    console.log(body);
  };
  const type = useWatch({ control, name: "type" });
  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} gap={"3rem"}>
      <Title title='Форма размещения' />
      <Title title='Шаг 1' />
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
}
