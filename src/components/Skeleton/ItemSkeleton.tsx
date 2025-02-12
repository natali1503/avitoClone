import { Box, Skeleton } from "@mui/material";

export function ItemSkeleton() {
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
      <Skeleton width={"8rem"} height={"8rem"} variant='rectangular' sx={{ borderRadius: "10px" }} />

      <Box display={"flex"} flexDirection={"column"} gap={"5px"}>
        <Skeleton width={"17rem"} height={"2rem"} />
        <Skeleton width={"15rem"} height={"2rem"} />
        <Skeleton width={"12rem"} height={"2rem"} />
      </Box>

      <Skeleton width={"6.5rem"} height={"4.2rem"} variant='rectangular' sx={{ borderRadius: "4px" }} />
    </Box>
  );
}
