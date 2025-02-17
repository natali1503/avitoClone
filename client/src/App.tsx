import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Box, ThemeProvider } from '@mui/material';
//@ts-expect-error: for test
import React from 'react';

import { ListAnnouncement } from './pages/ListAnnouncement';
import { PageAnnouncement } from './pages/PageAnnouncement';
import { RouterPath } from './router/routerPath';
import { ControlAds } from './pages/ControlAds';
import { useMode } from './theme';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  const [theme] = useMode();
  return (
    <ThemeProvider theme={theme}>
      <Box display='flex' flexDirection={'column'} width={'100%'} minHeight={'100vh'} padding={'4rem 2rem'}>
        <Router>
          <Routes>
            <Route path='/' element={<ListAnnouncement />} />
            <Route path={RouterPath.List} element={<ListAnnouncement />} />
            <Route path={RouterPath.Form} element={<ControlAds />} />
            <Route path={RouterPath.Item} element={<PageAnnouncement />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
