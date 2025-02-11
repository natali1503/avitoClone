import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { CustomButton } from "./CustomButton";

interface IItem {
  id: number;
  name: string;
  location: string;
  type: string;
}

export function Item(props: IItem) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/item/${props.id}`);
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        border: "1px solid rgba(0, 0, 0, 0.23)",
        borderRadius: "10px",
        justifyContent: "space-around",
        padding: "20px 30px",
        gap: "5rem",
        alignItems: "center",
      }}
    >
      <Box width={"80px"} height={"80px"} sx={{ border: "1px solid rgba(0, 0, 0, 0.23)", borderRadius: "10px" }}>
        Img
      </Box>
      <Box display={"flex"} flexDirection={"column"} gap={"5px"}>
        <Typography>{props.name}</Typography>
        <Typography>{props.location}</Typography>
        <Typography>{props.type}</Typography>
      </Box>

      <CustomButton text='Открыть' onClick={handleClick} />
    </Box>
  );
}
