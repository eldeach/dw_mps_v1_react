// ======================================================================================== [Import Libaray]
import { useEffect, useLayoutEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setEnvClientLang, setEnvClientMenu, setEnvClientPlantlist, setEnvClientAppBarTitle } from "./store";
// ======================================================================================== [Import Material UI Libaray]
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

// ======================================================================================== [Import CSS]
import './App.css';


function App() {
  // Redux
  const envClientMenu = useSelector(state => state.envClient.menu);
  let dispatch = useDispatch()



  useLayoutEffect(async () => {
    let rs = []
    rs = await axios.get('/envclient')
      .then((res) => {
        dispatch(setEnvClientLang(res.data[0]))
        dispatch(setEnvClientMenu(res.data[1]))
        dispatch(setEnvClientPlantlist(res.data[2]))
        dispatch(setEnvClientAppBarTitle("CPV"))
      })
      .catch((error) => {
        console.log("ERROR OCCUR \n\n")
        console.log(error)
      })
  }, [])

  return (
    <ThemeProvider theme={themeSystem}>
      <div style={{ display: 'flex' }}>
        <NavAppBar />
        <NavMenu />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div style={{ height: '46px' }} />
          <Routes>
            <Route path={'/'} element={<div />} />
            {
              envClientMenu ? envClientMenu.map((value, index) => {
                if (value.ROUTE_PATH && (value.ROUTE_PATH != '/')) {
                  return <Route path={value.ROUTE_PATH} element={<AuthDynRoute menuCD={value.MENU_CD} comp={value.COMPONENT} />} />
                }
              }) : null
            }
            <Route path={'/system'} element={<AuthDynRoute menuCD={'system'} comp={'SamplePage'} />} />
          </Routes>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
