// ======================================================================================== [Import Libaray]
import { useNavigate } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from "react-redux";

// ======================================================================================== [Import Material UI Libaray]
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Drawer, ListItemButton, ListItemIcon, ListItemText, ListItem } from '@mui/material/';

// icon
import FirstPageIcon from '@mui/icons-material/FirstPage';

// ======================================================================================== [Import Project JS]


// ======================================================================================== [Import CSS]


function Menu({openDrawer, handleDrawer}) {
    // Redux
    const envClientLang = useSelector(state => state.envClient.lang);
    const envClientMenu = useSelector(state => state.envClient.menu);

    const closeDrawer = () => {
        handleDrawer(false)
    }

    return (
        <Drawer anchor={'left'} open={openDrawer} onClose={closeDrawer}>
            <Box sx={{ width: 250 }} role="presentation" onClick={closeDrawer} onKeyDown={closeDrawer}>
                <List>
                    <ListItemFactory navPath={'/'} icon={<FirstPageIcon />} text={"First Page"} />
                </List>
                <Divider />
                {
                    envClientMenu ? envClientMenu.map((v, i)=>{
                        return <ListItemFactory navPath={v.ROUTE_PATH} icon={<FirstPageIcon />} text={v.MENU_NM} />
                    }) :
                    <ListItemFactory navPath={'/'} icon={<FirstPageIcon />} text={"First Page"} />
                }
            </Box>
        </Drawer>

    )
}

function ListItemFactory({ navPath, icon, text }) {
    const navigate = useNavigate();
    return (
        <div>
            <ListItem disablePadding={true}>
                <ListItemButton onClick={() => { navigate(navPath) }}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={<div style={{ fontSize: '13px' }}>{text}</div>} />
                </ListItemButton>
            </ListItem>
        </div>
    )

}

export default Menu