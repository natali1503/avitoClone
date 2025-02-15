import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Box, ThemeProvider } from '@mui/material';
//@ts-expect-error: for test
import React from 'react';

import { ListAnnouncement } from './pages/ListAnnouncement';
import { PageAnnouncement } from './pages/PageAnnouncement';
import { RouterPath } from './router/routerPath';
import { PostingAds } from './pages/ControlAds';
import { useMode } from './theme';

function App() {
  const [theme] = useMode();
  return (
    <ThemeProvider theme={theme}>
      <Box width={'100%'} minHeight={'100vh'} padding={'4rem 4rem'}>
        <Router>
          <Routes>
            <Route path='/' element={<ListAnnouncement />} />
            <Route path={RouterPath.List} element={<ListAnnouncement />} />
            <Route path={RouterPath.Form} element={<PostingAds />} />
            <Route path={RouterPath.Item} element={<PageAnnouncement />} />
            {/* <Route path='*' element={<NotFound />} /> */}
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
