// ======================================================================================== [Import Libaray]
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import axios from 'axios';
import cookies from 'react-cookies'
import * as yup from 'yup';
import moment from 'moment/moment';

// ======================================================================================== [Import Material UI Libaray]
import { Button, Modal, Paper, TextField } from '@mui/material';
//icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// ======================================================================================== [Import Component] js


// ======================================================================================== [Import Component] CSS

function LoginButton() {
    const navigate = useNavigate();

    const style = {
        popupTitle: {
            box: {
                display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 'medium'
            },
            text: {
                fontSize: '20px', marginTop: '4px', marginLeft: '2px'
            }
        },
        toMui: {
            popupPaper: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: 24,
                p: 2,
            },
            inputTextField: {
                fontSize: 14,
                paddingRight: 0
            },
        },
    }

    const yupSchema = yup.object().shape({
        user_account: yup.string()
            .required("F_LOGIN_05"),

        user_pw: yup.string()
            .required("F_LOGIN_06")
    });

    const initialValues = {
        user_account: '',
        user_pw: '',
        plant_cd: '1230'
    }

    const [popup, setPopup] = useState(0);
    const handleModalClose = () => setPopup(0);

    const [loginStatus, setLoginStatus] = useState(false);
    const [expireDateTime, setExpireDateTime] = useState(null)
    const [imminent, setImminent] = useState(false);


    const loginStatusUpdate = (expireDateTime) => {
        setLoginStatus(true)
        setExpireDateTime(expireDateTime)
        setImminent(false)
    }

    const loginStatusExpired = () => {
        setLoginStatus(false)
        setExpireDateTime(null)
        setImminent(false)
    }

    const logoutFunc = async function () {
        await axios.get("/local-logout")
            .then((res) => {
                loginStatusExpired()
                navigate('/sessionexpired')
            })
            .catch((error) => {
                console.log("ERROR OCCUR \n\n")
                console.log(error)
                loginStatusExpired()
            })
    }

    const onSubmitFunc = async function (values) {
        await axios.post('/local-login', values)
            .then((res) => {
                if (res.status === 200 && res.data.msg === "F_LOGIN_07") {
                    loginStatusUpdate(res.data.extraData.expireDateTime);
                    handleModalClose();
                } else  if (res.status === 200 && res.data.msg === "F_LOGIN_09") {
                    alert(res.data.msg)
                } else {

                }
            })
            .catch((error) => {
                console.log("ERROR OCCUR \n\n")
                console.log(error)
                loginStatusExpired()
            })
    }

    const sessioncheck = async function () {
        await axios.get('/sessioncheck')
            .then((res) => {
                if (res.status === 200 && res.data.msg === "F_LOGIN_13") {
                    loginStatusUpdate(res.data.extraData.expireDateTime)
                }
                else if (res.status === 200 && res.data.msg === "F_LOGIN_11") {
                    alert(res.data.msg)
                }
                else {

                }
            })
            .catch((error) => {
                console.log("ERROR OCCUR \n\n")
                console.log(error)
                loginStatusExpired()
            })
    }

    useEffect(() => {
        sessioncheck()
    }, [])

    useEffect(() => {
        const handleMouseDown = (e) => {
            if (loginStatus && imminent) {
                sessioncheck();
                setImminent(false);
            }
        };

        const handleKeyDown = (e) => {
            if (loginStatus && imminent) {
                sessioncheck();
                setImminent(false);
            }
        };

        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [loginStatus, imminent]);

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Button variant="outlined" color="white" size="small" onClick={() => { loginStatus ? logoutFunc() : setPopup(1) }}>
                {
                    loginStatus ?
                        `F_LOGIN_02`
                        : `F_LOGIN_01`
                }
            </Button>
            {
                loginStatus ?
                    <SessionTimer
                        expireDateTime={expireDateTime}
                        midFunc={setImminent}
                        endFunc={logoutFunc}
                    />
                    : <div />
            }
            <Modal open={(popup === 1)} onClose={handleModalClose}>
                <Paper sx={style.toMui.popupPaper} elevation={3}>
                    <div className="popup-close-button-box"><button className='popup-close-button' onClick={handleModalClose}>X</button></div>
                    <Formik
                        validationSchema={yupSchema}
                        initialValues={initialValues}
                        onSubmit={async (values, actions) => {
                            await onSubmitFunc(values);
                        }}
                    >
                        {formikProps => (
                            <form
                                noValidate
                                style={{ width: '350px', hegith: '240px', display: 'flex', flexDirection: 'column' }}
                                id="loginForm"
                                autoComplete='off'
                                onSubmit={formikProps.handleSubmit}
                            >
                                <div>
                                    <div style={style.popupTitle.box}>
                                        <AccountCircleIcon color='primary' sx={{ fontSize: 'xx-large' }} />
                                        <div style={style.popupTitle.text}>F_LOGIN_01</div>
                                    </div>
                                    <TextField
                                        required
                                        variant="outlined"
                                        id="user_account"
                                        name="user_account"
                                        label={`F_LOGIN_03`}
                                        value={formikProps.values.user_account}
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur}
                                        helperText={formikProps.touched.user_account ? formikProps.errors.user_account : ""}
                                        error={formikProps.touched.user_account && Boolean(formikProps.errors.user_account)}
                                        size='small'
                                        margin="dense"
                                        fullWidth
                                        inputProps={{ style: style.toMui.inputTextField }} // font size of input text
                                        InputLabelProps={{ style: style.toMui.inputTextField }} // font size of input label
                                    />
                                    <TextField
                                        required
                                        variant="outlined"
                                        id="user_pw"
                                        name="user_pw"
                                        label={`F_LOGIN_04`}
                                        type="password"
                                        value={formikProps.values.user_pw}
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur}
                                        helperText={formikProps.touched.user_pw ? formikProps.errors.user_pw : ""}
                                        error={formikProps.touched.user_pw && Boolean(formikProps.errors.user_pw)}
                                        size='small'
                                        margin="dense"
                                        fullWidth
                                        inputProps={{ style: style.toMui.inputTextField }} // font size of input text
                                        InputLabelProps={{ style: style.toMui.inputTextField }} // font size of input label
                                    />
                                    <TextField
                                        required
                                        variant="outlined"
                                        id="plant_cd"
                                        name="plant_cd"
                                        label={`F_LOGIN_12`}
                                        value={formikProps.values.plant_cd}
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur}
                                        helperText={formikProps.touched.plant_cd ? formikProps.errors.plant_cd : ""}
                                        error={formikProps.touched.plant_cd && Boolean(formikProps.errors.plant_cd)}
                                        size='small'
                                        margin="dense"
                                        fullWidth
                                        inputProps={{ style: style.toMui.inputTextField }} // font size of input text
                                        InputLabelProps={{ style: style.toMui.inputTextField }} // font size of input label
                                    />
                                </div>
                                <Button sx={{ mt: 1 }} color='primary' fullWidth variant="contained" size='small' type="submit" form="loginForm">F_LOGIN_01</Button>
                            </form>
                        )}
                    </Formik>
                </Paper>
            </Modal>
        </div>
    )
}



function SessionTimer(props) {

    const [expireSec, setExpireSec] = useState(0)
    const [expireMin, setExpireMin] = useState(0)

    useEffect(() => {
        const countdown = setInterval(() => {
            let expireDateTime = moment(props.expireDateTime)
            let nowDateTime = new Date()
            let remainedSec = moment(expireDateTime).diff(nowDateTime, 's')
            let remainedMin = moment(expireDateTime).diff(nowDateTime, 'm')
            if (parseInt(remainedSec) <= 0) {
                setExpireMin(0)
                setExpireSec(0)
                props.endFunc();
                clearInterval(countdown);
            } else {
                if ((parseInt(remainedSec) < 60) && (58 < parseInt(remainedSec))) {
                    props.midFunc(true)
                }
                setExpireMin(remainedMin)
                setExpireSec(remainedSec - remainedMin * 60)
            }
        }, 500)
        return () => clearInterval(countdown);
    }, [][expireMin, expireSec])

    return (
        <div style={{ width: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '10px', borderRadius: '5px', boxSizing: 'border-box', border: (expireMin === 0 ? (expireSec < 30 ? 'red solid 0.5px' : '#98B9F4 solid 1px') : '#98B9F4 solid 1px') }}>
            <div style={{ color: (expireMin === 0 ? (expireSec < 30 ? 'red' : 'white') : 'white') }}>{expireMin < 10 ? `0${expireMin}` : expireMin} : {expireSec < 10 ? `0${expireSec}` : expireSec}</div>
        </div>
    )
}

export default LoginButton;