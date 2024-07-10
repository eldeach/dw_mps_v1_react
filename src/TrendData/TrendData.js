// ======================================================================================== [Import Libaray]
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState, useRef } from 'react';
import dayjs from "dayjs";
import axios from 'axios';
import { createColumnHelper } from "@tanstack/react-table";
// Redux
import { useDispatch } from "react-redux";
import { setBackDrop } from "../store";
// ======================================================================================== [Import Material UI Libaray]
import { Autocomplete, Button, TextField, Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Stack } from '@mui/material';
//icon
// N/A

// ======================================================================================== [Import Component] js
// Table
import ExDataTable from '../Table/ExDataTable'
import TableCheckColumn from '../Table/TableCheckColumn'
// Chart
import ChartControl from "../Chart/ChartControl";
import ChartScatter from "../Chart/ChartScatter";
// ======================================================================================== [Import Component] CSS
// N/A

export default function TrendData() {
    // Redux
    const dispatch = useDispatch();

    const [viewSelect, setViewSelect] = useState(1);
    const handleChange = (event, newAlignment) => {
        setViewSelect(newAlignment);
    };


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


    let [eqTag, setEqTag] = useState(null);
    let [equip, setEquip] = useState(null);

    let tagListRef = useRef([]);
    let [tagList, setTagList] = useState([]);
    let [equipList, setEuiqList] = useState([]);


    let [startDate, setStartDate] = useState(dayjs().format('YYYY-MM-DD'));
    let [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'));

    const initialChartData = {
        control_data: [
            {
                title: 'N/A',
                vName: "VAL",
                unit: 'N/A',
                lsl: 0,
                usl: 0,
                lcl: 0,
                ucl: 0,
                avg: 0,
            }
        ],
        data: [
            {
                "batch": "0",
                "VAL": 0
            },
        ]
    }

    let [trendData, setTrendData] = useState([]);
    let [chartData, setChartData] = useState(initialChartData);


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
                        tagListRef.current = rs.recordsets[0]
                        setEuiqList(rs.recordsets[1])
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

    useEffect(()=>{
        if (trendData.length > 0) {
            let rs = chartDataParser(trendData, 3)
            setChartData(rs)
        } else {
            setChartData(initialChartData)
        } 
    },[][trendData])


    return (
        <div className='trend-data-page'>
            <div className='date-pick'>
                <input type="date" value={startDate}
                    onChange={(e) => {
                        console.log(e.target.value)
                        if (dayjs(endDate).diff(dayjs(e.target.value), 's') < 0) {
                            alert('The start date must be earlier than the end date.')
                        } else {
                            setStartDate(e.target.value)
                        }

                    }}
                    placeholder="YYYY-MM-DD"
                />
                <input type="date" value={endDate}
                    onChange={(e) => {
                        console.log(e.target.value)

                        if (dayjs(startDate).diff(dayjs(e.target.value), 's') > 0) {
                            alert('The end date must be after the start date.')
                        } else {
                            setEndDate(e.target.value)
                        }
                    }}
                    placeholder="YYYY-MM-DD"
                />
            </div>
            <div className='tag-list'>
                <Autocomplete
                    id="equip"
                    size="small"
                    sx={{ width: `140px` }}
                    disableClearable
                    value={equip}
                    onChange={(event, newValue) => {
                        let filtered = tagListRef.current.filter(e => e.EQPTID == newValue.EQPTID)
                        setTagList(filtered)
                        setEquip(newValue);
                    }}
                    options={equipList}
                    getOptionLabel={(option) => `${option.EQPTID}`}
                    renderOption={(props, option) => (
                        <Box component="li" {...props}>
                            <div style={{ fontSize: '12px' }}>{`${option.EQPTID}`}</div>
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Equipment"
                            inputProps={{ ...params.inputProps, style: muiStyle.inputTextField }} // font size of input text
                            InputLabelProps={{ ...params.InputLabelProps, style: muiStyle.inputTextField }} // font size of input label
                            placeholder="Equipment"
                        />
                    )}
                />
                <Autocomplete
                    id="eqTag"
                    size="small"
                    sx={{ width: `400px`, marginLeft: '10px', marginRight: '10px' }}
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
                                <div style={{ fontSize: '12px' }}>{`${option.TAG_NM}`}</div>
                                <div style={{ fontSize: '12px' }}>{`TAGID : ${option.TAGID}`}</div>
                            </Stack>
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Equipment Tag"
                            inputProps={{ ...params.inputProps, style: muiStyle.inputTextField }} // font size of input text
                            InputLabelProps={{ ...params.InputLabelProps, style: muiStyle.inputTextField }} // font size of input label
                            placeholder="Equipment Tag"
                        />
                    )}
                />
                <Button variant="outlined" color="primary" size="small" onClick={() => {
                    if (trendData.length > 0) {
                        let rs = chartDataParser(trendData, 3)
                        setChartData(rs)
                    } else {
                        setChartData(initialChartData)
                    }
                    getTrendData()
                }

                }>Search</Button>
            </div>

            <div style={{ width: '100wv', marginTop: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <ToggleButtonGroup
                    color="primary"
                    value={viewSelect}
                    exclusive
                    onChange={handleChange}
                    size='small'
                >
                    <ToggleButton value={1} >X-Bar 관리도</ToggleButton>
                    <ToggleButton value={2} >R 관리도</ToggleButton>
                    <ToggleButton value={3} >산포도</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div>
                {
                    viewSelect === 1 ? <div className='table-and-chart'>
                        <ExDataTable
                            size={{
                                tableWidth: '90vw',
                                tblNumRow: 40
                            }}
                            muiColor='primary'
                            exData={trendData}
                            multiSelectable={true}
                            setTableSelected={setTableSelected}
                            columns={columnDef}
                        />
                        <div style={{ height: '10px' }} />
                        <ChartControl xbar={true} data={chartData} />
                    </div> : <div />
                }
                {
                    viewSelect === 2 ? <div className='table-and-chart'>
                        <ExDataTable
                            size={{
                                tableWidth: '90vw',
                                tblNumRow: 40
                            }}
                            muiColor='primary'
                            exData={trendData}
                            multiSelectable={true}
                            setTableSelected={setTableSelected}
                            columns={columnDef}
                        />
                        <div style={{ height: '10px' }} />
                        <ChartControl xbar={false} data={chartData} />
                    </div> : <div />
                }
                {
                    viewSelect === 3 ? <div className='table-and-chart'>
                        <ExDataTable
                            size={{
                                tableWidth: '90vw',
                                tblNumRow: 40
                            }}
                            muiColor='primary'
                            exData={trendData}
                            multiSelectable={true}
                            setTableSelected={setTableSelected}
                            columns={columnDef}
                        />
                        <div style={{ height: '10px' }} />
                        <ChartScatter data={chartData} />
                    </div> : <div />
                }
            </div>
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


function chartDataParser(trendData, sigma) {

    let nullToZero = updateNulltoZero(trendData)

    let avg = getAvg(trendData)
    let std = getStd(trendData)
    let lsl = parseFloat(avg) - parseFloat(std) * parseInt(sigma)
    let usl = parseFloat(avg) + parseFloat(std) * parseInt(sigma)
    console.log(std)
    console.log(lsl)
    console.log(usl)
    const dsCtrlScatter = {
        control_data: [
            {
                title: '  ',
                vName: "VAL",
                unit: trendData[0].UNIT,
                lsl: lsl,
                usl: usl,
                lcl: trendData[0].SPEC_MIN,
                ucl: trendData[0].SPEC_MAX,
                avg: avg,
            }
        ],
        data: nullToZero
    }

    return dsCtrlScatter
}

function updateNulltoZero(data) {
    return data.map(item => {
        if (item.VAL === null) {
            item.VAL = 0;
        }
        return item;
    });
}

function getAvg(data) {
    let sum = 0;
    let count = 0;

    data.forEach(item => {
        if (!item.VAL) {
            // sum += 0;
        } else {
            sum += parseFloat(item.VAL);
            count++;
        }
    });

    return (sum / count).toFixed(2);
}

// 표준편차를 계산하는 함수
function calStd(arr) {
    const n = arr.length;
    const mean = arr.reduce((a, b) => a + b, 0) / n;
    const variance = arr.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / n;
    return Math.sqrt(variance);
}

function getStd(data) {
    const VALValues = data.map(item => parseFloat(item.VAL));
    return calStd(VALValues);
}


// 확률밀도함수
function chartNdPdf(bin_edge, avg, stdDev, roundingDigit) {

    return Math.round(
        (
            1 / (stdDev * Math.sqrt(2 * Math.PI))
        ) * Math.exp(
            - Math.pow(bin_edge - avg, 2) / (2 * Math.pow(stdDev, 2))
        )
        * Math.pow(10, roundingDigit)
    ) / Math.pow(10, roundingDigit)
}