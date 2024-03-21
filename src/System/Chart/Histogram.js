import { ComposedChart, Line, Area, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine, Label, Legend } from 'recharts';
import Typography from '@mui/material/Typography';

function Histogram(props) {

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
            <Typography>{`Histogram`}</Typography>
            <ComposedChart
                width={650}
                height={280}
                data={data}
                margin={{ left: -10, right: 80 }}
            >
                <XAxis
                    dataKey={"bin_edge"}
                    tick={{ fontSize: 10 }}
                    interval={"preserveStart"}
                    scale="band"
                />
                <YAxis
                    tick={{ fontSize: 10 }}
                    yAxisId="curve"
                />
                <YAxis
                    tick={{ fontSize: 10 }}
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
                {/* <CartesianGrid stroke="#f5f5f5" /> */}
                <Bar  dataKey={"freq"} barSize={15} stackId="a" fill="#413ea0" name="Frequency" />
                <Line yAxisId="curve" type="monotone" dataKey={"disCurve"} name="Distribution Curve" stroke="#ff7300" dot={false} />
                <ReferenceLine x={"40"} stroke="red" strokeDasharray="3 3">
                    <Label value="상한선" position="insideTopLeft" />
                </ReferenceLine>
                <ReferenceLine x={"80"} stroke="red" strokeDasharray="3 3" >
                    <Label value="하한선" position="insideTopRight" />
                </ReferenceLine>
            </ComposedChart>
        </div>
    )
}

export default Histogram;