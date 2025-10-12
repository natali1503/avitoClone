import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Box, ThemeProvider } from '@mui/material';
//@ts-expect-error: for test
import React from 'react';

import { AdsBoardPage } from './pages/adsBoard/AdsBoardPage';
import { AdPage } from './pages/ad/AdPage';
import { RouterPath } from './router/routerPath';
import { useMode } from './theme';
import { NotFoundPage } from './pages/NotFoundPage';
import { CreateAdPage } from './pages/formAd/CreateAdPage';
import { EditAdPage } from './pages/formAd/EditAdPage';
import { ToasterCustom } from './components/toasterCustom/ToasterCustom';

function App() {
  const [theme] = useMode();

  return (
    <ThemeProvider theme={theme}>
      <Box display='flex' flexDirection={'column'} width={'100%'} minHeight={'100vh'}>
        <Router>
          <Routes>
            <Route path='/' element={<AdsBoardPage />} />
            <Route path={RouterPath.List} element={<AdsBoardPage />} />
            <Route path={RouterPath.Item} element={<AdPage />} />
            <Route path={RouterPath.CreateAd} element={<CreateAdPage />} />
            <Route path={RouterPath.EditAd} element={<EditAdPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Router>
      </Box>
      <ToasterCustom theme={theme} />
    </ThemeProvider>
  );
}

export default App;
