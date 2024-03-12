// ======================================================================================== [Import Libaray]
// N/A

// ======================================================================================== [Import Material UI Libaray]
import AppBar from '@mui/material/AppBar';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
//icons
import MenuIcon from '@mui/icons-material/Menu';

// ======================================================================================== [Import Project JS]
// N/A

// ======================================================================================== [Import CSS]
// N/A



function SystemAppBar(props) {

    const { appBarTitle, handleDrawerToggle } = props;
    const theme = useTheme();

    return (
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
            <Toolbar variant="dense">
                <IconButton
                    color="inherit"
                    onClick={handleDrawerToggle}
                    edge="start"
                    sx={{
                        mr: 1
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ mb: 0.5 }} noWrap component="div">
                    {appBarTitle}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Button variant="outlined" color="white" size="small" >Login</Button>
            </Toolbar>
        </AppBar>
    )
}

export default SystemAppBar;