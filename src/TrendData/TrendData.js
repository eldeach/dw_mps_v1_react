// ======================================================================================== [Import Libaray]
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import dayjs from "dayjs";
import axios from 'axios';
import { createColumnHelper } from "@tanstack/react-table";
// Redux
import { useDispatch } from "react-redux";
import { setBackDrop } from "../store";
// ======================================================================================== [Import Material UI Libaray]
import { Autocomplete, Button, TextField, Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Stack } from '@mui/material';
//icon
// N/A

// ======================================================================================== [Import Component] js
// N/A
import Table from '../Table/Table'
import TableCheckColumn from '../Table/TableCheckColumn'
// ======================================================================================== [Import Component] CSS
// N/A

export default function TrendData() {
    // Redux
    const dispatch = useDispatch();

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
        datePicker: {
            '& .MuiInputBase-input': {
                fontSize: 14,
            },
            '& .MuiInputLabel-root': {
                fontSize: 14,
            }
        }
    }

    let [tagList, setEqTagList] = useState([]);

    let [eqTag, setEqTag] = useState(null);
    let [startDate, setStartDate] = useState(dayjs());
    let [endDate, setEndDate] = useState(dayjs());


    let [trendData, setTrendData] = useState([]);
    const [tableSelected, setTableSelected] = useState([]);

    const fetchTagList = async () => {
        dispatch(setBackDrop(true))
        try {
            const reqParam = {
                method: 'get',
                url: '/trenddatataglist',
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
                        setEqTagList(rs.recordsets[0])
                    } else {
                        console.log("ERROR OCCUR \n\n")
                        console.log(`${JSON.stringify(rs.output.P_VALUE)}`)
                    }
                })
                .catch((error) => {
                    console.log("ERROR OCCUR \n\n")
                    console.log(error)
                })
        } catch (error) {
            console.log('Error fetching data:', error);
        }
        dispatch(setBackDrop(false))
    };

    useEffect(() => {
        fetchTagList();
    }, [])


    const getTrendData = async () => {
        console.log(eqTag.EQPTID)
        console.log(eqTag.TAGID)
        console.log(startDate)
        console.log(endDate)
        dispatch(setBackDrop(true))
        try {
            const reqParam = {
                method: 'get',
                url: '/trenddata',
                params: {
                    PLANT_CD: '1230',
                    EQPTID: eqTag.EQPTID,
                    TAGID: eqTag.TAGID,
                    FROM: dayjs(startDate).format('YYYY-MM-DD'),
                    TO: dayjs(endDate).format('YYYY-MM-DD')
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            await axios(reqParam)
                .then((res) => {
                    if (!res.data[0] || res.data[0].length < 1) {
                        setTrendData([])
                        alert('No Data')
                    } else {
                        console.log(res.data)
                        setTrendData(res.data)
                    }
                })
                .catch((error) => {
                    console.log("ERROR OCCUR \n\n")
                    console.log(error)
                })
        } catch (error) {
            console.log('Error fetching data:', error);
        }
        dispatch(setBackDrop(false))
    };

    return (
        <div>
            <Stack direction="row" spacing={2}>
                <Autocomplete
                    id="eqTag"
                    size="small"
                    sx={{ width: `400px`, height: '56px' }}
                    disableClearable
                    value={eqTag}
                    onChange={(event, newValue) => {
                        setEqTag(newValue);
                    }}
                    options={tagList}
                    getOptionLabel={(option) => `${option.TAG_NM}`}
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            <Stack direction="column">
                                <div style={{ width: '360px', paddingLeft: '4px', paddingRight: '4px', fontSize: '12px', border: '0px', backgroundColor: '#ffef96', borderRadius: '4px' }}>{`${option.TAG_NM}`}</div>
                                <div style={{ fontSize: '12px' }}>{`EQ CODE : ${option.EQPTID}`}</div>
                                <div style={{ fontSize: '12px' }}>{`TAGID : ${option.TAGID}`}</div>
                            </Stack>
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Equipment Tag"
                            inputProps={{ ...params.inputProps, style: { ...muiStyle.inputTextField, height: '39px' } }} // font size of input text
                            InputLabelProps={{ ...params.InputLabelProps, style: { ...muiStyle.inputTextField } }} // font size of input label
                            // slotProps={{ ...params.slotProps, style: muiStyle.inputTextField }}
                            placeholder="Equipment Tag"
                        />
                    )}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        id='START_DATE'
                        label="Start Date"
                        value={startDate}
                        onChange={(v) => {
                            setStartDate(dayjs(v).toISOString());
                        }}
                        sx={{ padding: 0 }}
                        format={"YYYY-MM-DD"}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                color="primary"
                                sx={muiStyle.datePicker}
                            />}
                    />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        id='END_DATE'
                        label="End Date"
                        value={endDate}
                        onChange={(v) => {
                            setEndDate(dayjs(v).toISOString());
                        }}
                        format={"YYYY-MM-DD"}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                color="primary"
                                sx={muiStyle.datePicker}
                            />}
                    />
                </LocalizationProvider>
                <Button variant="outlined" color="primary" size="small" onClick={() => getTrendData()}>Search</Button>
            </Stack>
            {/* <Table
                size={{
                    tableWidth: '96vw',
                    tblNumRow: 20
                }}
                muiColor='primary'
                reqParam={{
                    method: 'get',
                    url: '/trenddata',
                    params: {
                        PLANT_CD: '1230',
                        EQPTID: eqTag.EQPTID,
                        TAGID: eqTag.TAGID,
                        FROM: dayjs(startDate).format('YYYY-MM-DD'),
                        TO: dayjs(endDate).format('YYYY-MM-DD')
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }}
                multiSelectable={true}
                setTableSelected={setTableSelected}
                columns={columnDef}
            /> */}
        </div>
    )
}


const columnHelper = createColumnHelper();
const columnDef = [  // TanStack Table은 컬럼 사이즈가 20이 최소
    TableCheckColumn,
    columnHelper.accessor("BATCH",
        {
            header: 'BATCH',
            size: 70,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("FROM_DT",
        {
            header: 'Start Date',
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("SPEC_MIN",
        {
            header: 'Spec. Min.',
            size: 170,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("SPEC_MAX",
        {
            header: 'Spec. Max',
            size: 170,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("TO_DT",
        {
            header: 'End Date',
            size: 150,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("VAL",
        {
            header: 'VAL',
            size: 100,
            enableColumnFilter: true,
        }
    ),
    columnHelper.accessor("UNIT",
        {
            header: 'Unit',
            size: 150,
            enableColumnFilter: true,
        }
    ),
]