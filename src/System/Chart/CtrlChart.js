
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine, Label, Legend } from 'recharts';
import Typography from '@mui/material/Typography';


function CtrlChart(props) {


    const { xbar, data, unit, vName, lsl, usl, lcl, ucl, avg } = props;

    const CustomDot = props => {
        if (props.value > ucl || props.value < lcl) {
            return (
                <rect x={props.cx - 2.5} y={props.cy - 2.5} width={5} height={5} fill="pink" stroke="red" />
            );
        } else {
            return (
                <circle cx={props.cx} r="3" cy={props.cy} fill="white" stroke="#413ea0" />
            );
        }

    };

    const ActiveCustomDot = props => {
        if (props.value > ucl || props.value < lcl) {
            return (
                <rect x={props.cx - 2.5} y={props.cy - 2.5} width={5} height={5} fill="red" stroke="red" />
            );
        } else {
            return (
                <circle cx={props.cx} r="3" cy={props.cy} fill="#413ea0" stroke="#413ea0" />
            );
        }

    };

    const formatYAxisTick = (tick) => {
        return tick.toFixed(2); // 소수점 둘째 자리까지 표시
    };
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '660px',
            paddingTop: '10px',
            paddingBottom: '10px',
            border: 'solid grey 1px',
            boxSizing: 'border-box',
            textAlign: 'center'
        }}>
            <Typography>{xbar ? "X Bar Control Chart" : "R Control Chart"}</Typography>
            <LineChart
                width={650}
                height={280}
                data={data}
                margin={{ left: -10, right: 80 }}
            >
                <XAxis
                    dataKey="batch"
                    tick={{ fontSize: 10 }}
                />
                <YAxis
                    domain={
                        // xbar인 경우에만 LSL/USL 기준으로, 아니면 LCL/UCL 기준으로 Y 축범위 설정
                        xbar ?
                            [(lsl - 1 > 0 ? lsl - 0.5 : 0), usl + 0.5]
                            : [(lcl - 1 > 0 ? lcl - 0.5 : 0), ucl + 0.5]
                    }
                    tick={{ fontSize: 10 }}
                    tickFormatter={formatYAxisTick}
                    unit={` ${unit}`}
                />
                <Tooltip
                    labelStyle={{
                        fontSize: '10px',
                        marginBottom: '0px',
                        color: '#555',
                    }}
                    contentStyle={{
                        fontSize: '10px',
                        marginBottom: '0px',
                        fontWeight: 700,
                    }}
                />
                <Legend
                    align='center'
                    iconSize={15}
                    wrapperStyle={{
                        paddingLeft: "50px", fontSize: '12px', fontWeight: 500
                    }}
                />
                <CartesianGrid stroke="#f5f5f5" />
                <Line type="linear" dataKey={vName} stroke="#413ea0" dot={CustomDot} activeDot={ActiveCustomDot} />

                {
                    // xbar인 경우에만 LSL 출력
                    xbar ?
                        <ReferenceLine y={lsl} stroke="#DD1144" strokeDasharray="3 3">
                            <Label value={`LSL = ${lsl}`} position="right" style={{ fontSize: 10 }} offset={10} />
                        </ReferenceLine> : <div />
                }


                {
                    // xbar인 경우에만 USL 출력
                    xbar ?
                        <ReferenceLine y={usl} stroke="#DD1144" strokeDasharray="3 3" >
                            <Label value={`USL = ${usl}`} position="right" style={{ fontSize: 10 }} offset={10} />
                        </ReferenceLine> : <div />
                }

                <ReferenceLine y={lcl} stroke="#DD1144">
                    <Label value={`LCL = ${lcl}`} position="right" style={{ fontSize: 10 }} offset={10} />
                </ReferenceLine>
                <ReferenceLine y={ucl} stroke="#DD1144" >
                    <Label value={`UCL = ${ucl}`} position="right" style={{ fontSize: 10 }} offset={10} />
                </ReferenceLine>

                <ReferenceLine y={avg} stroke="#82ca9d">
                    <Label value={xbar ? `X Bar = ${avg}` : `MR Bar = ${avg}`} position="right" style={{ fontSize: 10 }} offset={10} />
                </ReferenceLine>
            </LineChart>
        </div>
    )
}

export default CtrlChart