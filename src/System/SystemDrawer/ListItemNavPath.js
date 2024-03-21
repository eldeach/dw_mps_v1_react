// ======================================================================================== [Import Libaray]

// ======================================================================================== [Import Material UI Libaray]  
import { ListItemButton, ListItemIcon, ListItemText, ListItem } from '@mui/material/';
import { useNavigate } from 'react-router-dom';

// ======================================================================================== [Import Project JS]


// ======================================================================================== [Import Component] CSS


function ListItemNavPath(props) {
    const navigate = useNavigate();
    const { id, display, navPath, routingMode, openDrawer, text } = props;
    const openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer");
    };

    return (
        <div id={id} style={{ display: `${display}` }}>
            <ListItem disablePadding={true}>
                <ListItemButton
                    sx={{
                        justifyContent: openDrawer ? 'initial' : 'center',
                        px: 2.5,
                    }}
                    onClick={() => {
                        if (routingMode) {
                            navigate(id)
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
                        {props.icon}
                    </ListItemIcon>
                    <ListItemText primary={<div style={{ fontSize: '13px', textWrap:'wrap'}}>{text}</div>} sx={{ opacity: openDrawer ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>
        </div>
    )

}

export default ListItemNavPath;


