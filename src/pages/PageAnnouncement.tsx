import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { getAdById } from "../api-actions";
import { AppDispatch, RootState } from "../store";
import { Categories, CommonFields, FieldsByType } from "../formFieldNames";
import { CustomButton } from "../components/CustomButton";
import { PageAnnouncementSkeleton } from "./PageAnnouncementSkeleton";
import { RouterPath } from "../router/routerPath";

export function PageAnnouncement() {
  const idUrl = useParams();
  const { loading, data } = useSelector((state: RootState) => state.adInfo);
  const dispatch = useDispatch<AppDispatch>();
  const [dataToDisplay, setDataToDisplay] = useState([]);

  useEffect(() => {
    if (idUrl.id) {
      dispatch(getAdById({ id: idUrl.id }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!data) return;
    setDataToDisplay(() => test());
  }, [data]);

  function test() {
    const dataToDisplay: { [key in string]: string }[] = [];
    const idCommonFields = CommonFields.map((el) => el.id);
    const idType = Categories.filter((el) => el.text === data.type)[0].id;
    const additionalFieldsByType = FieldsByType[idType];
    const idAdditionalFieldsByType = additionalFieldsByType.map((el) => el.id);

    for (const [key, value] of Object.entries(data)) {
      if (idCommonFields.includes(key)) {
        const field = CommonFields.filter((el) => el.id === key)[0];
        dataToDisplay.push({ fieldName: field.text, value });
      }
      if (idAdditionalFieldsByType.includes(key)) {
        const field = additionalFieldsByType.filter((el) => el.id === key)[0];
        dataToDisplay.push({ fieldName: field.text, value });
      }
    }

    return dataToDisplay;
  }

  return loading ? (
    <PageAnnouncementSkeleton />
  ) : (
    <Box display={"flex"} gap={"5rem"}>
      <Box width={"30rem"} height={"30rem"}>
        Photo
      </Box>
      <Box display={"flex"} flexDirection={"column"} gap={"2rem"}>
        {dataToDisplay &&
          dataToDisplay.map((el, i) => (
            <Box key={+i} display={"flex"} flexDirection={"column"} gap={"0.5rem"}>
              <Typography variant='h5'>{el?.fieldName}</Typography>
              <Typography>{el?.value}</Typography>
            </Box>
          ))}
      </Box>
      <CustomButton text='Редактировать' href={RouterPath.Form} />
    </Box>
  );
}
