// ======================================================================================== [Import Libaray]
import axios from 'axios';
import cookies from 'react-cookies'
import { useEffect, useState } from "react";
// Redux
import { useDispatch } from "react-redux";
import { setEnvClientLang, setEnvClientMenu } from "../store";
// ======================================================================================== [Import Material UI Libaray]
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
//icons
import MenuIcon from '@mui/icons-material/Menu';
// ======================================================================================== [Import Project JS]
import Menu from './Sub/Menu'
import LoginButton from './Sub/LoginButton';

// ======================================================================================== [Import CSS]
// N/A

function NavAppBar() {
    const [openDrawer, setOpenDrawer] = useState(false);
    const handleDrawer = (v) => {
        setOpenDrawer(v)
    }

    return (
        <AppBar position="fixed">
            <Toolbar variant="dense">
                <IconButton
                    color="inherit"
                    onClick={async () => {
                        handleDrawer(true)
                    }}
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
                <LoginButton />
            </Toolbar>
            <Menu openDrawer={openDrawer} handleDrawer={handleDrawer} />
        </AppBar>
    )
}

export default NavAppBar;