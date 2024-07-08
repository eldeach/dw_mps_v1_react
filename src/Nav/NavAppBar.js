// ======================================================================================== [Import Libaray]
// N/A
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setOpenDrawer } from "../store";
// ======================================================================================== [Import Material UI Libaray]
import AppBar from '@mui/material/AppBar';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
//icons
import MenuIcon from '@mui/icons-material/Menu';

// ======================================================================================== [Import Project JS]
// N/A
import AuthLoginButton from '../Auth/AuthLoginButton';

// ======================================================================================== [Import CSS]
// N/A



function NavAppBar() {
    // Redux
    const envClientAppBarTitle = useSelector(state => state.envClient.appBarTitle);
    let dispatch = useDispatch()

    const openDrawer=()=>{
        dispatch(setOpenDrawer(true))
    }
    
    const theme = useTheme();

    return (
        <AppBar position="fixed">
            <Toolbar variant="dense">
                <IconButton
                    color="inherit"
                    onClick={() =>openDrawer()}
                    edge="start"
                    sx={{
                        mr: 1
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ mb: 0.5 }} noWrap component="div">
                    CPV
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <AuthLoginButton />
            </Toolbar>
        </AppBar>
    )
}

export default NavAppBar;