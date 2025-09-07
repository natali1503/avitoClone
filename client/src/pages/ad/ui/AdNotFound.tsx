import { Box, Typography } from '@mui/material';
// import notFound from '../../../assets/Clipboard-Remove--Streamline-Ux.png';
import notFound from '../../../assets/Failed-Draft--Streamline-Ux.png';

export const AdNotFound = () => (
  <Box
    sx={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center', // центр по вертикали
      gap: '2rem',
      position: 'relative',
      top: '-7rem',
    }}
  >
    <Box sx={{ width: 400, height: 400 }}>
      <img src={notFound} alt='Объявление не найдено' style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </Box>
    <Typography variant='h3'>Объявление не найдено</Typography>
  </Box>
);
