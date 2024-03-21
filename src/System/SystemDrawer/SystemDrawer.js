// ======================================================================================== [Import Libaray]
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

// ======================================================================================== [Import Material UI Libaray]
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

//icons
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import FactoryIcon from '@mui/icons-material/Factory';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
// ======================================================================================== [Import Project JS]
import Drawer from './Drawer'
import ListItemNavPath from './ListItemNavPath'

// ======================================================================================== [Import CSS]


function SystemDrawer(props) {

    const [drawerHeight, setDrawerHeight] = useState(900);

    window.addEventListener('resize', function (event) {
        setDrawerHeight(this.window.outerHeight - 180)

    }, true);

    const { openDrawer } = props;

    return (
        <Drawer variant="permanent" open={openDrawer}>
            <div style={{ maxHeight: { drawerHeight }, overflowY: 'auto', overflowX: 'hidden', scroll: '2px' }}>
                <div style={{ height: '46px' }} />
                <Divider />
                <List>
                    <ListItemNavPath id={"root"} display={"block"} navPath={'/'} routingMode={true} icon={<InboxIcon />} openDrawer={openDrawer} text={"root"} />
                    <ListItemNavPath id={"item1"} display={"block"} navPath={'/item1'} routingMode={true} icon={<InboxIcon />} openDrawer={openDrawer} text={"item 1"} />
                    <ListItemNavPath id={"item2"} display={"block"} navPath={'/item2'} routingMode={true} icon={<InboxIcon />} openDrawer={openDrawer} text={"item 2"} />
                </List>
                <Divider />
                <List>
                    <ListItemNavPath id={"item3"} display={"block"} navPath={'/item3'} routingMode={true} icon={<InboxIcon />} openDrawer={openDrawer} text={"Control Chart Sample"} />
                    <ListItemNavPath id={"item4"} display={"block"} navPath={'/item3'} routingMode={true} icon={<InboxIcon />} openDrawer={openDrawer} text={"item 4"} />
                    <ListItemNavPath id={"item5"} display={"block"} navPath={'/item4'} routingMode={true} icon={<InboxIcon />} openDrawer={openDrawer} text={"item 5"} />
                </List>
            </div>
            <Box sx={{ flexGrow: 1 }} />
            <Divider />
            <List>
                <ListItemNavPath id={"btFactory"} display={"block"} navPath={'/factory'} routingMode={true} icon={<FactoryIcon />} openDrawer={openDrawer} text={"Factory"} />
                <ListItemNavPath id={"btLang"} display={"block"} navPath={'/lang'} routingMode={true} icon={<LanguageIcon />} openDrawer={openDrawer} text={"Language"} />
                <ListItemNavPath id={"btSystem"} display={"block"} navPath={'/system'} routingMode={true} icon={<SettingsIcon />} openDrawer={openDrawer} text={"System"} />
            </List>
        </Drawer>
    )
}

export default SystemDrawer;