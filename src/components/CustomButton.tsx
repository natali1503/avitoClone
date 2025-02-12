import { Box, Button } from "@mui/material";
import { FC } from "react";

interface ICustomButton {
  text: string;
  href?: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
}

export const CustomButton: FC<ICustomButton> = ({ text, href, onClick, type, disabled = true }) => {
  return (
    <Box display={"flex"}>
      <Button
        href={href}
        variant='outlined'
        sx={{ textTransform: "none" }}
        onClick={onClick}
        type={type}
        disabled={!disabled}
      >
        {text}
      </Button>
    </Box>
  );
};
