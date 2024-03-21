// ======================================================================================== [Import Libaray]
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// ======================================================================================== [Import Material UI Libaray]
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
//icons

// ======================================================================================== [Import Project JS]
import SystemAppBar from './System/SystemAppBar';
import SystemDrawer from './System/SystemDrawer/SystemDrawer';
import systemThemes from './System/systemThemes';

import PermissionCheck from './System/PermissionCheck'

import RoutePageTest from './System/Redirect/RoutePageTest'
import PermissionDenied from './System/Redirect/PermissionDenied'
import CtrlChartSample from './System/Redirect/ChartSample'

// ======================================================================================== [Import CSS]
import './App.css';

function App() {

  const [openDrawer, setOpenDrawer] = useState(false);
  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer)
  }

  return (
    <ThemeProvider theme={systemThemes}>
      <div style={{ display: 'flex' }}>
        <SystemAppBar appBarTitle={`CPV`} handleDrawerToggle={handleDrawerToggle} />
        <SystemDrawer openDrawer={openDrawer} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div style={{ height: '46px' }} />
          <Routes>
            <Route path='/' element={<div />} />
            
            <Route path='/item1' element={(PermissionCheck()) ? <div /> : <PermissionDenied/>} />
            <Route path='/item2' element={(PermissionCheck()) ? <RoutePageTest /> : <PermissionDenied/>}/>

            <Route path='/item3' element={(PermissionCheck()) ? <RoutePageTest /> : <PermissionDenied/>} />
            <Route path='/item4' element={!(PermissionCheck()) ? <RoutePageTest /> : <PermissionDenied/>}/>
            <Route path='/item5' element={!(PermissionCheck()) ? <CtrlChartSample /> : <PermissionDenied/>}/>

            <Route path='/factory' element={(PermissionCheck()) ? <RoutePageTest /> : <PermissionDenied/>} />
            <Route path='/lang' element={(PermissionCheck()) ? <RoutePageTest /> : <PermissionDenied/>}/>
            <Route path='/system' element={(PermissionCheck()) ? <RoutePageTest /> : <PermissionDenied/>}/>
          </Routes>
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
