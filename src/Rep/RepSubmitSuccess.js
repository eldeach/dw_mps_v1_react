// ======================================================================================== [Import Libaray]
import cookies from 'react-cookies'

// ======================================================================================== [Import Material UI Libaray]
import { Button } from '@mui/material';
// icon

import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import InfoIcon from '@mui/icons-material/Info';


// ======================================================================================== [Import Component] js
// N/A

// ======================================================================================== [Import Component] CSS

function SubmitSuccess(){
    const style = {
        subtitle:{
            box : {
                display:'flex', flexDirection:'column', alignItems:'center', fontSize:'medium',marginTop:'200px'
            },
            text : {
                fontSize : '20px', marginTop:'4px', marginLeft:'2px'
            }
        },
        descriptionBox : {
            marginTop:'20px',
            marginBottom : '46px',
            boxSizing : 'border-box',
            fontSzie : 'small',
            color : 'orange',
            whiteSpace : 'pre-wrap',
            worWrap : 'break-word',
            textAlign : 'center',
            flexGrow : 1
        },
        description : {
            marginTop : '0px',
            marginBottom : '6px',
        },
    }

    return (
        <div id='sessionExpiredMsgPage'>
            <div style={style.subtitle.box}>
                <DoneOutlineIcon color='submitted' sx={{fontSize:'60px'}}/>
                <div style={style.subtitle.text}>{submitSuccessLang.sessionExpiredMsgPage.pageTitle[cookies.load('site-lang')]}</div>
            </div>
            <div style={style.descriptionBox}>
                <InfoIcon color = 'sys1' fontSize="medium"/>
                <p style={style.description}>{submitSuccessLang.sessionExpiredMsgPage.text.p1[cookies.load('site-lang')]}</p>
            </div>
            <div style ={{widht: '100%', textAlign : 'center'}}>
                <Button sx={{ mt:1 }} color = 'sys1' variant="contained" size='small' href = { '/' } >{ submitSuccessLang.sessionExpiredMsgPage.returnButton[cookies.load('site-lang')] }</Button>
            </div>
        </div>
    )
}


const submitSuccessLang = {
    sessionExpiredMsgPage : {
        pageTitle : {
            kor : "성공적으로 제출 하였습니다.",
            eng : "Submission successful."
        },
        text : {
            p1 : {
                kor : "*작성하신 내용이 성공적으로 제출 되었습니다.",
                eng : "*Your submission has been completed."
            },
        },
        returnButton : {
            kor : "첫 페이지로",
            eng : "Go to the first page"
        }
    },
}


export default NoAuthPage;