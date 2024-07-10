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
import QueryStatsIcon from '@mui/icons-material/QueryStats';
// ======================================================================================== [Import Project JS]


// ======================================================================================== [Import CSS]


export default function Menu({ openDrawer, handleDrawer }) {
    // Redux
    const envClientLang = useSelector(state => state.envClient.lang);
    const envClientMenu = useSelector(state => state.envClient.menu);

    const navigate = useNavigate();

    const closeDrawer = () => {
        handleDrawer(false)
    }

    return (
        <Drawer anchor={'left'} open={openDrawer} onClose={closeDrawer}>
            <Box sx={{ width: 250 }} role="presentation" onClick={closeDrawer} onKeyDown={closeDrawer}>
                <ListItemFactory v={{ MENU_CD: "FIRST_PAGE" }} />
                <Divider />
                {
                    envClientMenu ? envClientMenu.map((v, i) => {
                        return <ListItemFactory key={i} v={v} />
                    }) : null
                }
            </Box>
        </Drawer>

    )
}

function ListItemFactory({ v }) {
    const navigate = useNavigate();
    const iconBook = {
        TREND_DATA: <QueryStatsIcon />
    }

    if (v.MENU_CD.startsWith('DIVIDER')) {
        return <Divider />
    } else if (v.MENU_CD == 'FIRST_PAGE') {
        return (
            <ListItem disablePadding={true}>
                <ListItemButton onClick={() => { navigate('/') }}>
                    <ListItemIcon><FirstPageIcon /></ListItemIcon>
                    <ListItemText primary={<div style={{ fontSize: '13px' }}>First Page</div>} />
                </ListItemButton>
            </ListItem>
        )
    }
    else {
        return (
            <ListItem disablePadding={true}>
                <ListItemButton onClick={() => { navigate(v.ROUTE_PATH) }}>
                    <ListItemIcon>{iconBook[v.MENU_CD]}</ListItemIcon>
                    <ListItemText primary={<div style={{ fontSize: '13px' }}>{v.MENU_NM}</div>} />
                </ListItemButton>
            </ListItem>
        )
    }
}
