// ======================================================================================== [Import Libaray]
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import dayjs from "dayjs";
import axios from 'axios';
// Redux
import { useDispatch } from "react-redux";
import { setBackDrop } from "../store";
// ======================================================================================== [Import Material UI Libaray]
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Stack } from '@mui/material';


//icon
// N/A

// ======================================================================================== [Import Component] js
// N/A

// ======================================================================================== [Import Component] CSS
// N/A

function CpvReportPartial() {
    // Redux
    let dispatch = useDispatch()

    let [tagList, setTagList] = useState([]);

    let [eq, setEq] = useState(null);

    let [str, setStr] = useState(dayjs());
    let [end, setEnd] = useState(dayjs());

    useEffect(() => {
        console.log(str)
    }, [str])
    useEffect(() => {
        console.log(end)
    }, [end])

    const fetchTagList= async () => {
        dispatch(setBackDrop(true))
        try {
            const reqParam = {
                method: 'get',
                url: '/reqmcsdatataglist',
                params: {
                    PLANT_CD: '1230'
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            await axios(reqParam)
            .then((res) => {
                let rs = res.data;
                if (rs.output.P_RESULT == "SUCCESS") {
                    setTagList(rs.recordsets[0])
                } else if (rs.output.P_RESULT == "ERROR") {
                    alert(`${JSON.stringify(rs.output.P_VALUE)}`)
                }
            })
            .catch((error) => {
                alert(error.response)
            })
        } catch (error) {
            console.log('Error fetching data:', error);
        }
        dispatch(setBackDrop(false))
    };

    useEffect(() => {
        fetchTagList();
    }, [])

    return (
        <div style={{ display: 'block' }}>
            <Stack direction="row" spacing={2}>
                <Autocomplete
                    id="EQ"
                    sx={{ width: `400px` }}
                    value={eq}
                    onChange={(e, v) => {
                        console.log(v)
                        setEq(v);
                    }}
                    disablePortal
                    margin="dense"
                    options={tagList}
                    getOptionLabel={(option) => `${option.TAG_NM} (EQ CODE : ${option.EQPTID}, TAGID : ${option.TAGID})`}
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            <Stack direction="column">
                                <div style={{ fontSize: '12px', border: '0px', backgroundColor: '#ffef96', borderRadius: '4px' }}>{`${option.TAG_NM}`}</div>
                                <div style={{ fontSize: '12px' }}>{`EQ CODE : ${option.EQPTID} / TAGID : ${option.TAGID}`}</div>
                            </Stack>
                        </Box>
                    )}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            color="primary"
                            label={`Select Machine`}
                            inputProps={{
                                ...params.inputProps,
                            }}
                        />}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        id='START_DATE'
                        label="Start Date"
                        value={str}
                        onChange={(v) => {
                            setStr(dayjs(v).toISOString());
                        }}
                        format={"YYYY-MM-DD"}
                        renderInput={(params) => <TextField {...params} color="primary" />}
                    />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        id='END_DATE'
                        label="End Date"
                        value={end}
                        onChange={(v) => {
                            setEnd(dayjs(v).toISOString());
                        }}
                        format={"YYYY-MM-DD"}
                        renderInput={(params) => <TextField {...params} color="primary" />}
                    />
                </LocalizationProvider>
            </Stack>
        </div>
    )
}

export default CpvReportPartial;