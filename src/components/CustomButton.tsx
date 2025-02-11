import { Box, Button } from "@mui/material";

interface ICustomButton {
  text: string;
  href?: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
}

export function CustomButton(props: ICustomButton) {
  return (
    <Box>
      <Button
        href={props?.href}
        variant='outlined'
        sx={{ textTransform: "none" }}
        onClick={props?.onClick}
        type={props?.type}
      >
        {props.text}
      </Button>
    </Box>
  );
}
