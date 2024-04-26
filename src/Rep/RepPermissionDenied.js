// ======================================================================================== [Import Libaray]
import cookies from 'react-cookies'
import { useSelector } from "react-redux";
// ======================================================================================== [Import Material UI Libaray]
import { Button } from '@mui/material';
// icon
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import InfoIcon from '@mui/icons-material/Info';

// ======================================================================================== [Import Component] js
// Env
import envLangFinder from '../Env/envLangFinder';

// ======================================================================================== [Import Component] CSS

function NoAuthPage() {
    // Redux
    const envClientLang = useSelector(state => state.envClient.lang);

    const noAuthPageLang = {
        sessionExpiredMsgPage: {
            pageTitle: {
                KOR: "권한없음",
                ENG: "Permission denied"
            },
            text: {
                p1: {
                    KOR: "*현재 이 서비스에 대한 사용 권한이 없습니다.",
                    ENG: "*You currently do not have permission for this service."
                },
                p2: {
                    KOR: "*이 서비스를 이용하시려면 이에 대한 권한을 얻으셔야합니다.",
                    ENG: "*To use this service, you need to obtain permission for it."
                }
            },
            returnButton: {
                KOR: "첫 페이지로",
                ENG: "Go to the first page"
            }
        },
    }

    const style = {
        subtitle: {
            box: {
                display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 'medium', marginTop: '200px'
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
    }

    return (
        <div id='sessionExpiredMsgPage'>
            <div style={style.subtitle.box}>
                <DoDisturbIcon color='denied' sx={{ fontSize: '60px' }} />
                <div style={style.subtitle.text}>{envLangFinder(envClientLang, 'PERDENY_01')}</div>
            </div>
            <div style={style.descriptionBox}>
                <InfoIcon color='primary' fontSize="medium" />
                <p style={style.description}>{envLangFinder(envClientLang, 'PERDENY_02')}</p>
                <p style={style.description}>{envLangFinder(envClientLang, 'PERDENY_03')}</p>
            </div>
            <div style={{ widht: '100%', textAlign: 'center' }}>
                <Button sx={{ mt: 1 }} color='primary' variant="contained" size='small' href={'/'} >{noAuthPageLang.sessionExpiredMsgPage.returnButton[cookies.load('site-lang')]}</Button>
            </div>
        </div>
    )
}



export default NoAuthPage;