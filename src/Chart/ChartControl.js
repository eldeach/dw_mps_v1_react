
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine, Label, Legend } from 'recharts';
import Typography from '@mui/material/Typography';

import tooltopLabelStyle from './Style/tooltopLabelStyle';
import tooltopContentStyle from './Style/tooltopContentStyle'
import legnedWrapperStyle from './Style/legnedWrapperStyle'

function ChartControl(props) {
    const { control_data, data } = props.data
    const { title, vName, unit, lsl, usl, lcl, ucl, avg } = control_data[0]
    const xbar = props.xbar

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
        <div className='chart-box'>
            <Typography>{title}</Typography>
            <LineChart
                width={650}
                height={280}
                data={data}
                margin={{ top: 10 , left: -10, right: 80 }}
            >
                <XAxis
                    dataKey="batch"
                    tick={{ fontSize: 10 }}
                />
                <YAxis
                    tick={{ fontSize: 10 }}
                    tickFormatter={formatYAxisTick}
                    unit={` ${unit}`}
                />
                <Tooltip
                    labelStyle={tooltopLabelStyle}
                    contentStyle={tooltopContentStyle}
                />
                <Legend
                    align='center'
                    iconSize={15}
                    wrapperStyle={legnedWrapperStyle}
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

export default ChartControl;