// ======================================================================================== [Import Libaray]
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import cookies from 'react-cookies'

// ======================================================================================== [Import Material UI Libaray]
import { IconButton, Modal, Paper, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
//icon
import LanguageIcon from '@mui/icons-material/Language';
import InfoIcon from '@mui/icons-material/Info';

// ======================================================================================== [Import Component] js
// Env
import envLangFinder from '../Env/envLangFinder';

// ======================================================================================== [Import Component] CSS


function LangButton() {
    // Redux
    const envClientLang = useSelector(state => state.envClient.lang);

    const style = {
        subtitle: {
            box: {
                display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 'medium'
            },
            text: {
                fontSize: '20px', marginTop: '4px', marginLeft: '2px'
            }
        },
        descriptionBox: {
            marginTop: '20px',
            marginBottom: '46px',
            boxSizing: 'border-box',
            fontSzie: 'small',
            color: 'orange',
            whiteSpace: 'pre-wrap',
            worWrap: 'break-word',
            textAlign: 'center',
            flexGrow: 1
        },
        description: {
            marginTop: '0px',
            marginBottom: '6px',
        },
        popupPaper: {
            width: 350,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: 24,
            p: 2,
        },
        inputTexstField: {
            fontSize: 14,
            paddingRight: 0
        },
        button: {
            submitButton: {
                width: 534,
            },
        }

    }

    const [popup, setPopup] = useState(0);
    const handleModalClose = () => setPopup(0);

    let [siteLang, setSiteLang] = useState('');
    const handleLang = (event) => {
        setSiteLang(event.target.value)
        cookies.save('site-lang', event.target.value, { path: '/' });
    }

    useEffect(() => {

        if (!cookies.load('site-lang')) {
            cookies.save('site-lang', 'ENG', { path: '/' })
        }

        setSiteLang(cookies.load('site-lang'))
    }, []);

    return (
        <div>
            <IconButton size="large" edge="end" color="inherit" sx={{ ml: 1, mr: 1 }} onClick={() => setPopup(1)}><LanguageIcon /></IconButton>
            <Modal open={(popup === 1)} onClose={handleModalClose}>
                <Paper id='langPaper' sx={style.popupPaper} elevation={3}>
                    <div className="popup-close-button-box"><button className='popup-close-button' onClick={handleModalClose}>X</button></div>
                    <div style={style.subtitle.box}>
                        <LanguageIcon color='primary' sx={{ fontSize: 'xx-large' }} />
                        <div style={style.subtitle.text}>{envLangFinder(envClientLang, 'LANG_01')}</div>
                    </div>
                    <div>
                        <div style={style.descriptionBox}>
                            <InfoIcon color='primary' fontSize="medium" />
                            <p style={style.description}>{envLangFinder(envClientLang, 'LANG_02')}</p>
                        </div>
                        <FormControl sx={{ fontSize: 12, width: "100%" }} size="small">
                            <InputLabel id="select-lang">{envLangFinder(envClientLang, 'LANG_01')}</InputLabel>
                            <Select
                                labelId="select-lang"
                                id="select-lang"
                                value={siteLang}
                                label="Language"
                                onChange={handleLang}
                            >
                                <MenuItem value={'KOR'}>한국어</MenuItem>
                                <MenuItem value={'ENG'}>English</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Paper>
            </Modal>
        </div>
    )
}



export default LangButton;