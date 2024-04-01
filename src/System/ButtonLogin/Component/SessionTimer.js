// ======================================================================================== [Import Libaray]
import { useEffect, useState } from "react";
import moment from 'moment/moment';

// ======================================================================================== [Import Material UI Libaray]

//icon

// ======================================================================================== [Import Component] js


// ======================================================================================== [Import Component] CSS


function SessionTimer (props) { 

    const [ expireSec, setExpireSec ] = useState(0)
    const [ expireMin, setExpireMin ] = useState(0)

    useEffect(() => {
        const countdown = setInterval(() => {
            let expireDateTime = moment(props.expireDateTime)
            let nowDateTime = new Date()
            let remainedSec = moment(expireDateTime).diff(nowDateTime, 's')
            let remainedMin = moment(expireDateTime).diff(nowDateTime, 'm')
            if ( parseInt( remainedSec ) <= 0 ) {
                setExpireMin(0)
                setExpireSec(0)
                props.endFunc();
                clearInterval(countdown);
            } else {
                if ( ( parseInt( remainedSec ) < 60 ) && ( 58 < parseInt( remainedSec ) ) ) {
                    props.midFunc(true)
                }
                setExpireMin(remainedMin)
                setExpireSec(remainedSec - remainedMin * 60)
            }
        }, 500)
        return () => clearInterval(countdown);
    },[][expireMin, expireSec])

    return (
        <div style = {{width: '64px', display : 'flex', justifyContent : 'center', alignItems: 'center', marginLeft : '10px', borderRadius : '5px', boxSizing : 'border-box', border : ( expireMin === 0 ? ( expireSec < 30 ? 'red solid 0.5px' : '#98B9F4 solid 1px' ) : '#98B9F4 solid 1px' )}}>
            <div style={{ color : ( expireMin === 0 ? ( expireSec < 30 ? 'red' : 'white' ) : 'white' )}}>{ expireMin < 10 ? `0${ expireMin }` : expireMin } : { expireSec < 10 ? `0${ expireSec }` : expireSec }</div>
        </div>
    )
}

export default SessionTimer;