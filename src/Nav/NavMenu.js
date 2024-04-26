// ======================================================================================== [Import Libaray]
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

// ======================================================================================== [Import Material UI Libaray]
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
// icon
import SettingsIcon from '@mui/icons-material/Settings';
// ======================================================================================== [Import Project JS]
import navIconList from './navIconList';
import envLangFinder from "../Env/envLangFinder";

// ======================================================================================== [Import CSS]


function NavMenu() {
    // Redux
    const envClientLang = useSelector(state => state.envClient.lang);
    const envClientMenu = useSelector(state => state.envClient.menu);
    const openDrawer = useSelector(state => state.openDrawer);

    return (
        <Drawer variant="permanent" open={openDrawer}>
            <div style={{ overflowY: 'auto', overflowX: 'hidden', scroll: '2px' }}>
                <div style={{ height: '46px' }} />
                {
                    envClientMenu ? envClientMenu.map((value, index) => {
                        if (value.COMPONENT == 'Divider') return <Divider />
                        else return <ListItemNavPath id={value.MENU_CD} navPath={value.ROUTE_PATH} icon={navIconList[value.ICON]} text={envLangFinder(envClientLang, value.MENU_CD)} />
                    }) : null
                }
            </div>
            <Box sx={{ flexGrow: 1 }} />
            <Divider />
            <List>
                <ListItemNavPath id={"btSystem"} navPath={'/system'} icon={<SettingsIcon />} text={"System"} />
            </List>
        </Drawer>
    )
}

function ListItemNavPath({ id, navPath, icon, text }) {
    // Redux
    const openDrawer = useSelector(state => state.openDrawer);

    const navigate = useNavigate();
    const openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer");
    };

    return (
        <div id={id}>
            <ListItem disablePadding={true}>
                <ListItemButton
                    sx={{
                        justifyContent: openDrawer ? 'initial' : 'center',
                        px: 2.5,
                    }}
                    onClick={() => {
                        if (navPath) {
                            navigate(navPath)
                        } else {
                            openInNewTab(navPath)
                        }
                    }}>
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: openDrawer ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={<div style={{ fontSize: '13px' }}>{text}</div>} sx={{ opacity: openDrawer ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>
        </div>
    )

}


const drawerWidth = 200;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


export default NavMenu