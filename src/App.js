// ======================================================================================== [Import Libaray]
import { useEffect, useLayoutEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

// Redux
import { useDispatch, useSelector } from "react-redux";

// ======================================================================================== [Import Material UI Libaray]
import { Backdrop, CircularProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
//icons

// ======================================================================================== [Import Project JS]
// Auth
import AuthDynRoute from './Auth/AuthDynRoute';

// Nav
import NavAppBar from './Nav/NavAppBar';
import NavMenu from './Nav/NavMenu'

// Theme
import themeSystem from './Theme/themeSystem';

import RedirectSessionExpired from './Redirect/RedirectSessionExpired'

// ======================================================================================== [Import CSS]
import './App.css';


function App() {
  // Redux
  const backDrop = useSelector(state => state.backDrop);
  
  return (
    <ThemeProvider theme={themeSystem}>
      <div style={{ display: 'flex' }}>
        <NavAppBar />
        <NavMenu />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div style={{ height: '46px' }} />
          <Routes>
            <Route path={'/'} element={<div />} />
            {/* {
              envClientMenu ? envClientMenu.map((value, index) => {
                if (value.ROUTE_PATH && (value.ROUTE_PATH != '/')) {
                  return <Route path={value.ROUTE_PATH} element={<AuthDynRoute menuCD={value.MENU_CD} comp={value.COMPONENT} />} />
                }
              }) : null
            } */}
            <Route path={'/system'} element={<AuthDynRoute menuCD={'system'} comp={'SamplePage'} />} />
            <Route path={'/sessionexpired'} element={<RedirectSessionExpired />} />
          </Routes>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={backDrop}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
