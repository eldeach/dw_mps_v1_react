// ======================================================================================== [Import Libaray]
import { useNavigate } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setOpenDrawer } from "../store";
// ======================================================================================== [Import Material UI Libaray]
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Drawer, ListItemButton, ListItemIcon, ListItemText, ListItem  } from '@mui/material/';

// icon
import FirstPageIcon from '@mui/icons-material/FirstPage';
import SettingsIcon from '@mui/icons-material/Settings';

// ======================================================================================== [Import Project JS]
import navIconList from './navIconList';
import envLangFinder from "../Env/envLangFinder";

// ======================================================================================== [Import CSS]


function NavMenu() {
    // Redux
    let dispatch = useDispatch()
    const envClientLang = useSelector(state => state.envClient.lang);
    const envClientMenu = useSelector(state => state.envClient.menu);
    const openDrawer = useSelector(state => state.openDrawer);

    const closeDrawer = () => {
        dispatch(setOpenDrawer(false))
    }

    return (
        <Drawer anchor={'left'} open={openDrawer} onClose={closeDrawer}>
            <Box sx={{ width: 250 }} role="presentation" onClick={closeDrawer} onKeyDown={closeDrawer}>
                <List>
                    <ListItemFactory navPath={'/'} icon={<FirstPageIcon />} text={"First Page"} />
                </List>
                <Divider />
            </Box>
        </Drawer>

    )
}

function ListItemFactory({ navPath, icon, text }) {
    // Redux
    const openDrawer = useSelector(state => state.openDrawer);

    const navigate = useNavigate();
    return (
        <div>
            <ListItem disablePadding={true}>
                <ListItemButton onClick={() => {navigate(navPath)}}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={<div style={{ fontSize: '13px' }}>{text}</div>}/>
                </ListItemButton>
            </ListItem>
        </div>
    )

}

export default NavMenu