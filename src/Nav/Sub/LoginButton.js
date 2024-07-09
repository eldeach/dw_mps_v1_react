// ======================================================================================== [Import Libaray]
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import dayjs from 'dayjs';
import cookies from 'react-cookies'

// Redux
import { useDispatch } from "react-redux";
import { setBackDrop } from "../../store";
import { setEnvClientLang, setEnvClientMenu } from "../../store";
// ======================================================================================== [Import Material UI Libaray]
import { Autocomplete, Button, Modal, Paper, TextField, Box } from '@mui/material';
import { Stack } from '@mui/material';
//icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// ======================================================================================== [Import Component] js

// ======================================================================================== [Import Component] CSS


function LoginButton() {
    // Redux
    const dispatch = useDispatch();

    // navigator
    const navigate = useNavigate();

    const [popup, setPopup] = useState(0);
    const handleModalClose = () => setPopup(0);

    // style
    const muiStyle = {
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
    }

    // Redux가 새로고침하면 삭제되기 때문에 useEffect 또는 메뉴 버튼 누를 때 반복 요청 (perist는 보안에 위험할 듯함)
    // 메뉴
    const getMenu = (selectedPlant) => {
        let reqParam = {
            method: 'get',
            url: '/usermenu',
            params: {
                PLANT_CD: selectedPlant,
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios(reqParam)
            .then((res) => {
                if (res.status == 200 && res.data.msg == "PER_03") {
                } else {
                    dispatch(setEnvClientMenu(res.data[0]))
                }
            })
    }
    // 언어
    const getLang = (selectedLang) => {
        axios.get('/envclientlang')
            .then((res) => {
                // let selectedLang = selectedLang
                // if (!selectedLang) {
                //     selectedLang = 'KOR'
                // }
                let mappingSelectLang = getLangMappings(res.data[0], selectedLang)
                dispatch(setEnvClientLang(mappingSelectLang))
            })
    }

    // 언어 배열 응답을 Object로 변경 함수
    function getLangMappings(data, lang) {
        return data.reduce((acc, item) => {
            if (item.REGION == lang) {
                acc[item.LANG_CD] = item.VAL_STR;
            }
            return acc;
        }, {});
    }

    // 로그인 상태 관리 관련 시작
    let scanUserInt = 30;
    let inputTime = useRef(dayjs().toISOString())
    let alertTiming = useRef(0)
    const [expiryTimeStamp, setExpiryTimeStamp] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function updateLoginStatus(rs) {
        alertTiming.current = rs.alertTiming
        setExpiryTimeStamp(rs.expires)
        setIsLoggedIn(true);
    }

    function detoryLoginStatus() {
        dispatch(setEnvClientMenu([]))
        setExpiryTimeStamp(null)
        setIsLoggedIn(false);
    }

    const logOut = async function () {
        await axios.get("/local-logout")
            .then(() => {
                detoryLoginStatus()
                dispatch(setEnvClientMenu([]))
                navigate('/loggedout')
            })
            .catch((error) => {
                console.log("ERROR OCCUR \n\n")
                console.log(error)
                detoryLoginStatus()
            })
        setIsLoggedIn(false)
        setExpiryTimeStamp(null)
    }

    const onSubmitFunc = async function (values) {
        let payload = {
            USER_ID: values.user_account,
            PWD: values.user_pw,
            PLANT_CD: plant.PLANT_CD,
        }
        await axios.post('/local-login', payload)
            .then(async (res) => {
                if (res.status == 200 && res.data.msg == "LOGIN_07") {
                    updateLoginStatus(res.data.extraData);
                    getMenu(plant.PLANT_CD)
                    getLang(lang.VAL_01)
                    navigate('/')
                    handleModalClose();
                } else {
                    alert('Login failed.')
                }
            })
            .catch((error) => {
                console.log("ERROR OCCUR \n\n")
                console.log(error)
                detoryLoginStatus()
            })
    }

    async function checkLoginStatus() {
        let idledTime = dayjs().diff(inputTime.current, 'second')
        let isUserWorking = (idledTime <= scanUserInt)
        if (isUserWorking) {
            await axios.get('/sessioncheck')
                .then((res) => {
                    if (res.status === 200 && res.data.msg === "LOGIN_13") {
                        updateLoginStatus(res.data.extraData)
                    } else {
                        detoryLoginStatus()
                    }
                })
                .catch((error) => {
                    console.log("ERROR OCCUR \n\n")
                    console.log(error)
                    detoryLoginStatus()
                })
        }
    };

    useEffect(() => {
        checkLoginStatus();
        const interval = setInterval(checkLoginStatus, scanUserInt * 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleMouseDown = (e) => {
            inputTime.current = dayjs().toISOString()
        }
        const handleKeyDown = (e) => {
            inputTime.current = dayjs().toISOString()
        }

        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // 폼 관련 시작
    const [lang, setLang] = useState(null);
    const [plant, setPlant] = useState(null);
    const [langList, setLangList] = useState([]);
    const [plnatList, setPlantList] = useState([]);

    const initialValues = {
        user_account: '',
        user_pw: '',
        plant_cd: ''
    }

    // 초기 폼 기초 데이터 ajax
    const fetchEnv = async () => {
        dispatch(setBackDrop(true))
        await axios.get('/envclient')
            .then((res) => {

                let cookieLangValue = cookies.load('cpv-site-lang')
                if (!cookieLangValue) {
                    cookies.save('cpv-site-lang', 'KOR', { path: '/' })
                    let selectedLang = res.data[0].find((oneRow) => oneRow.VAL_01 == "KOR")
                    setLang(selectedLang)
                } else {
                    let selectedLang = res.data[0].find((oneRow) => oneRow.VAL_01 == cookieLangValue)
                    setLang(selectedLang)
                }
                setLangList(res.data[0])


                let cookieFactoryValue = cookies.load('cpv-site-factory')
                if (!cookieFactoryValue) {
                    cookies.save('cpv-site-factory', 1230, { path: '/' })
                    let selectedFactory = res.data[1].find((oneRow) => oneRow.PLANT_CD == 1230)
                    setPlant(selectedFactory)
                } else {
                    let selectedFactory = res.data[1].find((oneRow) => oneRow.PLANT_CD == cookieFactoryValue)
                    setPlant(selectedFactory)
                }
                setPlantList(res.data[1])
            })
            .catch((error) => {
                console.log("ERROR OCCUR \n\n")
                console.log(error)
            })
        dispatch(setBackDrop(false))
    }

    const yupSchema = yup.object().shape({
        user_account: yup.string()
            .required('Please enter user account.'),

        user_pw: yup.string()
            .required('Please enter your password.'),
    });

    useEffect(() => {
        fetchEnv()
    }, [])

    return (
        <Stack direction="row" spacing={1}>
            <Button variant="outlined" color="white" size="small" onClick={() => { isLoggedIn ? logOut() : setPopup(1) }}>
                {
                    isLoggedIn ? 'LOGOUT' : 'LOGIN'
                }
            </Button>
            {
                isLoggedIn ?
                    <SessionTimer
                        expiryTimeStamp={expiryTimeStamp}
                        alertTiming={alertTiming.current}
                        isLoggedIn={isLoggedIn}
                        endFunc={logOut}
                    />
                    : null
            }
            {
                isLoggedIn ?
                    <Button variant="outlined" color="white" size="small" onClick={() => checkLoginStatus()}>Extend</Button>
                    : null
            }
            <Modal open={(popup === 1)} onClose={handleModalClose}>
                <Paper
                    sx={muiStyle.popupPaper}
                    elevation={3}>
                    <div className="popup-x-bt"><button onClick={handleModalClose}>X</button></div>
                    <Formik
                        validationSchema={yupSchema}
                        initialValues={initialValues}
                        onSubmit={async (values, actions) => {
                            if (!lang) {
                                alert('Please choose your language')
                            } else {
                                await onSubmitFunc(values);
                            }
                        }}
                    >
                        {formikProps => (
                            <form
                                noValidate
                                style={{ width: '350px', hegith: '240px' }}
                                id="loginForm"
                                autoComplete='off'
                                onSubmit={formikProps.handleSubmit}
                            >
                                <Stack direction="column" spacing={1}>
                                    <div className='popup-title'>
                                        <AccountCircleIcon color='primary' sx={{ fontSize: 'xx-large' }} />
                                        <div>LOGIN</div>
                                    </div>
                                    <Autocomplete
                                        id="plant"
                                        size="small"
                                        disableClearable
                                        value={plant}
                                        onChange={(event, newValue) => {
                                            cookies.save('cpv-site-factory', newValue.PLANT_CD, { path: '/' })
                                            setPlant(newValue);
                                        }}
                                        options={plnatList}
                                        getOptionLabel={(option) => `${option.PLANT_NM} (${option.PLANT_CD})`}
                                        renderOption={(props, option) => (
                                            <Box sx={{ ...muiStyle.inputTextField }} {...props}>
                                                {`${option.PLANT_NM} (${option.PLANT_CD})`}
                                            </Box>
                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Factory"
                                                inputProps={{ ...params.inputProps, style: muiStyle.inputTextField }} // font size of input text
                                                InputLabelProps={{ ...params.InputLabelProps, style: muiStyle.inputTextField }} // font size of input label
                                                slotProps={{ ...params.slotProps, style: muiStyle.inputTextField }}
                                                placeholder="Factory"
                                            />
                                        )}
                                    />
                                    <TextField
                                        required
                                        variant="outlined"
                                        id="user_account"
                                        name="user_account"
                                        label='User ID'
                                        placeholder='User ID'
                                        value={formikProps.values.user_account}
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur}
                                        helperText={formikProps.touched.user_account ? formikProps.errors.user_account : ""}
                                        error={formikProps.touched.user_account && Boolean(formikProps.errors.user_account)}
                                        size='small'
                                        margin="dense"
                                        fullWidth
                                        inputProps={{ style: muiStyle.inputTextField }} // font size of input text
                                        InputLabelProps={{ style: muiStyle.inputTextField }} // font size of input label
                                    />
                                    <TextField
                                        required
                                        variant="outlined"
                                        id="user_pw"
                                        name="user_pw"
                                        label='Password'
                                        placeholder='Password'
                                        type="password"
                                        value={formikProps.values.user_pw}
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur}
                                        helperText={formikProps.touched.user_pw ? formikProps.errors.user_pw : ""}
                                        error={formikProps.touched.user_pw && Boolean(formikProps.errors.user_pw)}
                                        size='small'
                                        margin="dense"
                                        fullWidth
                                        inputProps={{ style: muiStyle.inputTextField }} // font size of input text
                                        InputLabelProps={{ style: muiStyle.inputTextField }} // font size of input label
                                    />
                                    <Autocomplete
                                        id="lang"
                                        size="small"
                                        disableClearable
                                        value={lang}
                                        onChange={(event, newValue) => {
                                            cookies.save('cpv-site-lang', newValue.VAL_01, { path: '/' })
                                            setLang(newValue);
                                        }}
                                        options={langList}
                                        getOptionLabel={(option) => `${option.VAL_01} (${option.COMM_NM})`}
                                        renderOption={(props, option) => (
                                            <Box sx={{ ...muiStyle.inputTextField }} {...props}>
                                                {`${option.VAL_01} (${option.COMM_NM})`}
                                            </Box>
                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label={`Language`}
                                                inputProps={{ ...params.inputProps, style: muiStyle.inputTextField }} // font size of input text
                                                InputLabelProps={{ ...params.InputLabelProps, style: muiStyle.inputTextField }} // font size of input label
                                                slotProps={{ ...params.slotProps, style: muiStyle.inputTextField }}
                                                placeholder={`Language`}
                                            />
                                        )}
                                    />
                                    <Button sx={{ mt: 1 }} color='primary' fullWidth variant="contained" size='small' type="submit" form="loginForm">LOGIN</Button>
                                </Stack>
                            </form>
                        )}
                    </Formik>
                </Paper>
            </Modal>
        </Stack>
    )
}


function SessionTimer(props) {
    // Redux
    const [alert, setAlert] = useState(false)
    const [expireSec, setExpireSec] = useState(0)
    const [expireMin, setExpireMin] = useState(0)

    useEffect(() => {
        const countdown = setInterval(() => {
            let nowDateTime = dayjs()
            let expiryTimeStamp = dayjs(props.expiryTimeStamp)
            let remainedSec = dayjs(expiryTimeStamp).diff(nowDateTime, 's')
            let remainedMin = dayjs(expiryTimeStamp).diff(nowDateTime, 'm')
            if (parseInt(remainedSec) <= 0 || Object.is(remainedSec, NaN)) {
                setExpireMin(0)
                setExpireSec(0)
                if (props.isLoggedIn) {
                    props.endFunc();
                }
                clearInterval(countdown);
            } else {
                if (remainedSec > 0 && remainedSec <= props.alertTiming) {
                    setAlert(true)
                } else {
                    setAlert(false)
                }
                setExpireMin(remainedMin)
                setExpireSec(remainedSec - remainedMin * 60)
            }
        }, 500)
        return () => clearInterval(countdown);
    }, [][expireMin, expireSec])

    return (
        <div className={`session-min-sec ${alert ? 'session-min-sec-alert' : ''}`}>
            {expireMin < 10 ? `0${expireMin}` : expireMin} : {expireSec < 10 ? `0${expireSec}` : expireSec}
        </div>
    )
}

export default LoginButton;