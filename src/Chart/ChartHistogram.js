import { ComposedChart, Line, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine, Label, Legend } from 'recharts';
import Typography from '@mui/material/Typography';

import tooltopLabelStyle from './Style/tooltopLabelStyle';
import tooltopContentStyle from './Style/tooltopContentStyle'
import legnedWrapperStyle from './Style/legnedWrapperStyle'

function ChartHistogram(props) {
    const { control_data, data } = props.data
    const { title, vName, unit, lsl, usl, lcl, ucl, avg } = control_data[0]
    return (
        <div className='chart-box'>
            <Typography>{title}</Typography>
            <ComposedChart
                width={650}
                height={280}
                data={data}
                margin={{ top: 10 , left: -10, right: 80 }}
            >
                <XAxis
                    dataKey={"bin_edge"}
                    tick={{ fontSize: 10 }}
                    interval={"preserveStart"}
                    scale="band"
                />
                <YAxis
                    visibility={false}
                    tick={{ fontSize: 10 }}
                    yAxisId="curve"
                />
                <YAxis
                    tick={{ fontSize: 10 }}
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

                <ReferenceLine x={lsl} stroke="#DD1144" strokeDasharray="3 3" >
                    <Label value={`LSL = ${lsl}`} position="right" style={{ fontSize: 10 }} offset={10} />
                </ReferenceLine>

                <ReferenceLine x={usl} stroke="#DD1144" strokeDasharray="3 3" >
                    <Label value={`USL = ${usl}`} position="right" style={{ fontSize: 10 }} offset={10} />
                </ReferenceLine>

                {/* <CartesianGrid stroke="#f5f5f5" /> */}
                <Bar dataKey={"freq"} barSize={15} stackId="a" fill="#413ea0" name="Frequency" />
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

export default ChartHistogram;