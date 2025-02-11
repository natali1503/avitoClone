import { Box } from "@mui/material";
import { useEffect, useMemo } from "react";
import { RouterPath } from "../router/routerPath";
import { Item } from "../components/Item";
import { CustomButton } from "../components/CustomButton";
import { Title } from "../components/Title";

import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { getAnnouncements } from "../api-actions";
import { CustomPagination } from "../components/pagination/CustomPagination";
import { usePagination } from "../hooks/usePagination";

export function ListAnnouncement() {
  const { loading, data } = useSelector((state: RootState) => state.announcements);
  const dispatch = useDispatch<AppDispatch>();
  const { currentPage, totalPages, indexOfLastItem, indexOfFirstItem, setCurrentPage } = usePagination({
    quantityAd: data?.length || 0,
  });
  useEffect(() => {
    dispatch(getAnnouncements());
  }, [dispatch]);

  const dataToDispay = useMemo(() => {
    return data?.slice(indexOfFirstItem, indexOfLastItem);
  }, [data, indexOfLastItem, indexOfFirstItem]);

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"2rem"}>
      <Title title='Список объявлений' />
      <Box display={"flex"} flexDirection={"column"} gap={"2rem"}>
        <Box display={"flex"} justifyContent={"flex-end"}>
          <CustomButton text='Разместить объявление' href={RouterPath.Form} />
        </Box>
        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} gap={"1.5rem"}>
          {dataToDispay &&
            dataToDispay.map((item) => (
              <Item key={item.id} id={item.id} name={item.name} location={item.location} type={item.type} />
            ))}
        </Box>
      </Box>
      <CustomPagination currentPage={currentPage} totalPages={totalPages || 0} setCurrentPage={setCurrentPage} />
    </Box>
  );
}
