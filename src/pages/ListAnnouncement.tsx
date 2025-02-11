import { Box } from "@mui/material";
import { useEffect } from "react";
import { RouterPath } from "../router/routerPath";
import { Item } from "../components/Item";
import { CustomButton } from "../components/CustomButton";
import { Title } from "../components/Title";

import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { getAnnouncements } from "../api-actions";

export function ListAnnouncement() {
  const { loading, data } = useSelector((state: RootState) => state.announcements);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAnnouncements());
  }, [dispatch]);

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"2rem"}>
      <Title title='Список объявлений' />
      <Box display={"flex"} flexDirection={"column"} gap={"2rem"}>
        <Box display={"flex"} justifyContent={"flex-end"}>
          <CustomButton text='Разместить объявление' href={RouterPath.Form} />
        </Box>
        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} gap={"1.5rem"}>
          {data &&
            data.map((item) => (
              <Item key={item.id} id={item.id} name={item.name} location={item.location} type={item.type} />
            ))}
        </Box>
      </Box>
    </Box>
  );
}
