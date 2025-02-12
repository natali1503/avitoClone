import { Box, Typography } from "@mui/material";
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
import { FiltersPanel } from "../components/FiltersPanel";
import { useFilters } from "../hooks/useFilters";

export function ListAnnouncement() {
  const { loading, data } = useSelector((state: RootState) => state.announcements);
  const dispatch = useDispatch<AppDispatch>();

  const { resetFilters, searchName, setSearchName, categories, setCategories, filteredData } = useFilters({
    adList: data,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getAnnouncements(signal));
    return () => controller.abort();
  }, [dispatch]);

  const { currentPage, totalPages, indexOfLastItem, indexOfFirstItem, setCurrentPage } = usePagination({
    quantityAd: filteredData.length || 0,
  });
  const dataToDispay = useMemo(() => {
    return filteredData?.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredData, indexOfLastItem, indexOfFirstItem]);

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"2rem"}>
      <Title title='Список объявлений' />
      <Box display={"flex"} flexDirection={"column"} gap={"2rem"}>
        <Box display={"flex"} flexDirection={"row"} gap={"1.5rem"} justifyContent={"space-between"}>
          <FiltersPanel
            searchName={searchName}
            setSearchName={setSearchName}
            categories={categories}
            setCategories={setCategories}
          />
          <CustomButton text='Разместить объявление' href={RouterPath.Form} />
        </Box>
        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} gap={"1.5rem"}>
          {dataToDispay &&
            dataToDispay.map((item) => (
              <Item key={item.id} id={item.id} name={item.name} location={item.location} type={item.type} />
            ))}
          {dataToDispay.length === 0 && <Typography variant='h5'>Объявлений по выбранным параметрам нет</Typography>}
        </Box>
      </Box>
      <CustomPagination currentPage={currentPage} totalPages={totalPages || 0} setCurrentPage={setCurrentPage} />
    </Box>
  );
}
