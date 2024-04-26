import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ReferenceLine, CartesianGrid, Label, Legend } from 'recharts';
import Typography from '@mui/material/Typography';
import tooltopLabelStyle from './Style/tooltopLabelStyle';
import tooltopContentStyle from './Style/tooltopContentStyle'
import legnedWrapperStyle from './Style/legnedWrapperStyle'

function ChartScatter(props) {
    const { control_data, data } = props.data
    const { title, vName, unit, lsl, usl, lcl, ucl, avg } = control_data[0]

    const formatYAxisTick = (tick) => {
        return tick.toFixed(2); // 소수점 둘째 자리까지 표시
    };

    return (
        <div className='chart-box'>
            <Typography>{`${title}`}</Typography>
            <ScatterChart
                width={650}
                height={280}
                margin={{ top: 10 , left: -10, right: 80 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="batch"
                    tick={{ fontSize: 10 }}
                />
                <YAxis
                    dataKey={vName}
                    type="number"
                    tick={{ fontSize: 10 }}
                    tickFormatter={formatYAxisTick}
                    name={vName}
                    unit={` ${unit}`}
                />
                <Tooltip
                    labelStyle={tooltopLabelStyle}
                    contentStyle={tooltopContentStyle}
                    cursor={{ strokeDasharray: '3 3' }}
                />
                <Legend
                    align='center'
                    iconSize={9}
                    wrapperStyle={legnedWrapperStyle}
                />
                                <ReferenceLine y={avg} stroke="#82ca9d" strokeDasharray="3 3">
                    <Label value={`Avg : ${avg}`} position="right" style={{ fontSize: 10 }} offset={10}/>
                </ReferenceLine>
                <Scatter name={vName} data={data} fill="#413ea0" />

            </ScatterChart>
        </div>
    )
}

export default ChartScatter