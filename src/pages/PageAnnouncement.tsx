import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { CustomButton } from "../components/CustomButton";
import { AppDispatch, RootState } from "../store";
import { RouterPath } from "../router/routerPath";
import { getAdById } from "../api-actions";

import { PageAnnouncementSkeleton } from "./PageAnnouncementSkeleton";
import { formattingDataForOutput } from "../store/adInfoSlice";

export function PageAnnouncement() {
  const idUrl = useParams();
  const { loading, dataToDisplay, data } = useSelector((state: RootState) => state.adInfo);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  useEffect(() => {
    if (idUrl.id) {
      dispatch(getAdById({ id: idUrl.id }));
    }
  }, [dispatch, idUrl.id]);

  useEffect(() => {
    if (data) dispatch(formattingDataForOutput());
  }, [dispatch, data]);

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
      <CustomButton
        text='Редактировать'
        onClick={() => {
          navigate(RouterPath.Form, { state: { id: idUrl.id } });
        }}
      />
    </Box>
  );
}
