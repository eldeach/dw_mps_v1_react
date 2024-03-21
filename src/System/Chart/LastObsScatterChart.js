import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ReferenceLine, Label, Legend } from 'recharts';
import Typography from '@mui/material/Typography';


function LastObsScatterChart(props) {


    const { data, unit, vName, lsl, usl, avg } = props;

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
            <Typography>{`Last ${data.length} Observation`}</Typography>
            <ScatterChart
                width={650}
                height={280}
                margin={{ left: -10, right: 80 }}
            >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis
                    dataKey="batch"
                    tick={{ fontSize: 10 }}
                />
                <YAxis
                    dataKey={vName}
                    type="number"
                    domain={[(lsl - 1 > 0 ? lsl - 0.5 : 0), usl + 0.5]}
                    tick={{ fontSize: 10 }}
                    tickFormatter={formatYAxisTick}
                    name={vName}
                    unit={` ${unit}`}
                />
                {/* <ZAxis dataKey="z" type="number" range={[64, 144]} name="score" unit="km" /> */}
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
                    cursor={{ strokeDasharray: '3 3' }}
                />
                <Legend
                    align='center'
                    iconSize={9}
                    wrapperStyle={{
                        paddingLeft: "50px", fontSize: '12px', fontWeight: 500
                    }}
                />
                                <ReferenceLine y={avg} stroke="#82ca9d" strokeDasharray="3 3">
                    <Label value={`Avg : ${avg}`} position="right" style={{ fontSize: 10 }} offset={10}/>
                </ReferenceLine>
                <Scatter name={vName} data={data} fill="#413ea0" />

            </ScatterChart>
        </div>
    )
}

export default LastObsScatterChart