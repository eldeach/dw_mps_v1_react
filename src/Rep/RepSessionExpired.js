// ======================================================================================== [Import Libaray]
import cookies from 'react-cookies'
// Redux
import { useSelector } from "react-redux";

// ======================================================================================== [Import Material UI Libaray]
import { Button } from '@mui/material';
// icon
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import InfoIcon from '@mui/icons-material/Info';

// ======================================================================================== [Import Component] js
// N/A

// ======================================================================================== [Import Component] CSS


function SessionExpired() {
    // Redux
    const envClientLang = useSelector(state => state.envClient.lang);

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
                <MeetingRoomIcon color='sys1' sx={{ fontSize: '60px' }} />
                <div style={style.subtitle.text}>{sessionExpiredLang.sessionExpiredMsgPage.pageTitle[cookies.load('cpv-site-lang')]}</div>
            </div>
            <div style={style.descriptionBox}>
                <InfoIcon color='sys1' fontSize="medium" />
                <p style={style.description}>{sessionExpiredLang.sessionExpiredMsgPage.text.p1[cookies.load('cpv-site-lang')]}</p>
                <p style={style.description}>{sessionExpiredLang.sessionExpiredMsgPage.text.p2[cookies.load('cpv-site-lang')]}</p>
            </div>
            <div style={{ widht: '100%', textAlign: 'center' }}>
                <Button sx={{ mt: 1 }} color='sys1' variant="contained" size='small' href={'/'} >{sessionExpiredLang.sessionExpiredMsgPage.returnButton[cookies.load('cpv-site-lang')]}</Button>
            </div>
        </div>
    )
}

const sessionExpiredLang = {
    sessionExpiredMsgPage: {
        pageTitle: {
            kor: "현재 로그아웃 상태입니다.",
            eng: "Currently logged out"
        },
        text: {
            p1: {
                kor: "*로그인을 하기 전이거나 자동 로그아웃 되어 로그인 상태가 아닙니다.",
                eng: "*You are not logged in, either before logging in or due to an automatic logout."
            },
            p2: {
                kor: "*서비스를 사용하려면 로그인이 필요합니다.",
                eng: "*You need to log in to use the service."
            }
        },
        returnButton: {
            kor: "첫 페이지로",
            eng: "Go to the first page"
        }
    },
}


export default SessionExpired;