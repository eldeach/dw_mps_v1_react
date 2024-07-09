// ======================================================================================== [Import Libaray]
import { Routes, Route } from 'react-router-dom';

// Redux
import { useSelector } from "react-redux";

// ======================================================================================== [Import Material UI Libaray]
import { Backdrop, CircularProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
//icons

// ======================================================================================== [Import Project JS]
// Nav
import NavAppBar from './Nav/NavAppBar';
// Theme
import themeSystem from './Theme/themeSystem';


// Route
import NotFound from './Redirect/NotFound';
import LoggedOut from './Redirect/LoggedOut';
import TrendData from './TrendData/TrendData';

// ======================================================================================== [Import CSS]
import './App.css';


export default function App() {
  // Redux
  const envClientMenu = useSelector(state => state.envClient.menu);
  const backDrop = useSelector(state => state.backDrop);

  return (
    <ThemeProvider theme={themeSystem}>
      <div style={{ display: 'flex' }}>
        <NavAppBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div style={{ height: '46px' }} />
          <Routes>
            <Route path={'/'} element={<div />} />
            {
              envClientMenu ? envClientMenu.map((value, i) => {
                return <Route key={i} path={value.ROUTE_PATH} element={<TrendData />} />
              }) : null
            }
            <Route path={'/trenddata'} element={<TrendData />} />
            <Route path={'/loggedout'} element={<LoggedOut />} />
            <Route path={'/*'} element={<NotFound />} />
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