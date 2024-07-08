// ======================================================================================== [Import Libaray]
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import dayjs from 'dayjs';
import cookies from 'react-cookies'
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setEnvClientLang, setEnvClientLanglist, setEnvClientMenu, setEnvClientPlantlist, setBackDrop } from "../store";
import { setCloseExp, scUpdate, scExpire } from "../store";
// ======================================================================================== [Import Material UI Libaray]
import { Autocomplete, Button, Modal, Paper, TextField, Box } from '@mui/material';
import { Stack } from '@mui/material';
//icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// ======================================================================================== [Import Component] js
// Env

// ======================================================================================== [Import Component] CSS




function LoginButton() {
    // Redux
    const dispatch = useDispatch();
    const envClientPlantlist = useSelector(state => state.envClient.plantlist);
    const envClientLangList = useSelector(state => state.envClient.langlist);
    let loginStat = useSelector(state => state.sessCtrl.loginStat);
    let closeExp = useSelector(state => state.sessCtrl.closeExp);

    // navigator
    const navigate = useNavigate();

    // style
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

    function getLangMappings(data, lang) {
        console.log(lang)
        return data.reduce((acc, item) => {
            if (item.REGION == lang) {
                acc[item.LANG_CD] = item.VAL_STR;
            }
            return acc;
        }, {});
    }


    const fetchEnv = async () => {
        dispatch(setBackDrop(true))
        await axios.get('/envclient')
            .then((res) => {

                dispatch(setEnvClientLanglist(res.data[1]))
                dispatch(setEnvClientMenu(res.data[2]))
                dispatch(setEnvClientPlantlist(res.data[3]))
            })
            .catch((error) => {
                console.log("ERROR OCCUR \n\n")
                console.log(error)
            })
        dispatch(setBackDrop(false))
    }

    useEffect(() => {
        fetchEnv()
    }, [])

    const yupSchema = yup.object().shape({
        user_account: yup.string()
            .required('Please enter user account.'),

        user_pw: yup.string()
            .required('Please enter your password.'),

    });

    const initialValues = {
        user_account: '',
        user_pw: '',
        plant_cd: ''
    }
    const [plant, setPlant] = useState(null);
    const [lang, setLang] = useState(null);

    const [popup, setPopup] = useState(0);
    const handleModalClose = () => setPopup(0);


    const logoutFunc = async function () {
        await axios.get("/local-logout")
            .then((res) => {
                dispatch(scExpire())
                navigate('/sessionexpired')
            })
            .catch((error) => {
                console.log("ERROR OCCUR \n\n")
                console.log(error)
                dispatch(scExpire())
            })
    }

    const onSubmitFunc = async function (values) {
        let payload = {
            USER_ID: values.user_account,
            PWD: values.user_pw,
            PLANT_CD: plant.PLANT_CD,
            LANG: lang.COMM_CD
        }
        await axios.post('/local-login', payload)
            .then(async (res) => {
                if (res.status === 200 && res.data.msg === "LOGIN_07") {
                    console.log(res.data.extraData)
                    dispatch(scUpdate(res.data.extraData.expireDateTime));

                    await axios.get('/envclientlang')
                        .then((res) => {
                            let langMapping = getLangMappings(res.data[0], lang.VAL_01)
                            dispatch(setEnvClientLang(langMapping))
                        })


                    handleModalClose();

                } else if (res.status === 200 && res.data.msg === "LOGIN_09") {
                    alert('Login failed.')
                } else {

                }
            })
            .catch((error) => {
                console.log("ERROR OCCUR \n\n")
                console.log(error)
                dispatch(scExpire())
            })
    }

    const sessioncheck = async function () {
        await axios.get('/sessioncheck')
            .then((res) => {
                if (res.status === 200 && res.data.msg === "LOGIN_13") {
                    dispatch(scUpdate(res.data.extraData.expireDateTime))
                }
                else if (res.status === 200 && res.data.msg === "LOGIN_11") {
                    // alert(res.data.msg)
                }
                else {

                }
            })
            .catch((error) => {
                console.log("ERROR OCCUR \n\n")
                console.log(error)
                dispatch(scExpire())
            })
    }

    useEffect(() => {
        sessioncheck()
    }, [])

    useEffect(() => {
        setPlant(envClientPlantlist.find(function (oneRow) {
            return (oneRow.PLANT_CD == 1230)
        }))
    }, [envClientPlantlist])

    useEffect(() => {
        const handleMouseDown = (e) => {
            if (loginStat && closeExp) {
                dispatch(setCloseExp(false))
                sessioncheck();
            }
        };

        const handleKeyDown = (e) => {
            if (loginStat && closeExp) {
                dispatch(setCloseExp(false))
                sessioncheck();
            }
        };

        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [loginStat, closeExp]);

    return (
        <Stack direction="row" spacing={2}>
            <Button variant="outlined" color="white" size="small" onClick={() => { loginStat ? logoutFunc() : setPopup(1) }}>
                {
                    loginStat ? 'LOGOUT' : 'LOGIN'
                }
            </Button>
            {
                loginStat ?
                    <SessionTimer
                        endFunc={logoutFunc}
                    />
                    : null
            }
            <Modal open={(popup === 1)} onClose={handleModalClose}>
                <Paper sx={style.toMui.popupPaper} elevation={3}>
                    <div className="popup-x-bt"><button onClick={handleModalClose}>X</button></div>
                    <Formik
                        validationSchema={yupSchema}
                        initialValues={initialValues}
                        onSubmit={async (values, actions) => {
                            if(!lang){
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
                                    <div style={style.popupTitle.box}>
                                        <AccountCircleIcon color='primary' sx={{ fontSize: 'xx-large' }} />
                                        <div style={style.popupTitle.text}>LOGIN</div>
                                    </div>
                                    <Autocomplete
                                        id="plant"
                                        size="small"
                                        disableClearable
                                        value={plant}
                                        onChange={(event, newValue) => {
                                            console.log(newValue)
                                            setPlant(newValue);
                                        }}
                                        options={envClientPlantlist}
                                        getOptionLabel={(option) => `${option.PLANT_NM} (${option.PLANT_CD})`}
                                        renderOption={(props, option) => (
                                            <Box sx={{ ...style.toMui.inputTextField }} {...props}>
                                                {`${option.PLANT_NM} (${option.PLANT_CD})`}
                                            </Box>
                                        )}
                                        defaultValue={
                                            envClientPlantlist.find(function (oneRow) {
                                                return (oneRow.PLANT_CD == 1230)
                                            })
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Factory"
                                                inputProps={{ ...params.inputProps, style: style.toMui.inputTextField }} // font size of input text
                                                InputLabelProps={{ ...params.InputLabelProps, style: style.toMui.inputTextField }} // font size of input label
                                                slotProps={{ ...params.slotProps, style: style.toMui.inputTextField }}
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
                                        inputProps={{ style: style.toMui.inputTextField }} // font size of input text
                                        InputLabelProps={{ style: style.toMui.inputTextField }} // font size of input label
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
                                        inputProps={{ style: style.toMui.inputTextField }} // font size of input text
                                        InputLabelProps={{ style: style.toMui.inputTextField }} // font size of input label
                                    />
                                    <Autocomplete
                                        required
                                        id="lang"
                                        size="small"
                                        disableClearable
                                        value={lang}
                                        onChange={(event, newValue) => {
                                            setLang(newValue);
                                        }}
                                        options={envClientLangList}
                                        getOptionLabel={(option) => `${option.VAL_01} (${option.COMM_NM})`}
                                        renderOption={(props, option) => (
                                            <Box sx={{ ...style.toMui.inputTextField }} {...props}>
                                                {`${option.VAL_01} (${option.COMM_NM})`}
                                            </Box>
                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label={`Language`}
                                                inputProps={{ ...params.inputProps, style: style.toMui.inputTextField }} // font size of input text
                                                InputLabelProps={{ ...params.InputLabelProps, style: style.toMui.inputTextField }} // font size of input label
                                                slotProps={{ ...params.slotProps, style: style.toMui.inputTextField }}
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
    const dispatch = useDispatch();
    let scExpDateTime = useSelector(state => state.sessCtrl.scExpDateTime);

    const [expireSec, setExpireSec] = useState(0)
    const [expireMin, setExpireMin] = useState(0)

    useEffect(() => {
        const countdown = setInterval(() => {
            let nowDateTime = dayjs()
            let remainedSec = dayjs(scExpDateTime).diff(nowDateTime, 's')
            let remainedMin = dayjs(scExpDateTime).diff(nowDateTime, 'm')
            if (parseInt(remainedSec) <= 0) {
                setExpireMin(0)
                setExpireSec(0)
                props.endFunc();
                clearInterval(countdown);
            } else {
                if ((parseInt(remainedSec) < 60) && (58 < parseInt(remainedSec))) {
                    dispatch(setCloseExp(true))
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