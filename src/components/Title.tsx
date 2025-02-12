import { Box, Typography } from '@mui/material';

interface ITitle {
  title: string;
}
export function Title(props: ITitle) {
  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
      <Typography variant='h1'>{props.title}</Typography>
    </Box>
  );
}
