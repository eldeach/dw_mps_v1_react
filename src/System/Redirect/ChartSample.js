
import CtrlChart from "../Chart/CtrlChart";
import LastObsScatterChart from "../Chart/LastObsScatterChart";
import Histogram from "../Chart/Histogram";
import { useEffect } from "react";

function CtrlChartSample(props){

    const vName = "LOD"


    const getRandom = (min, max) => Math.random() * (max - min) + min;

    const data = [
        {
            "batch": "1",
            [vName] : getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "2",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "3",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "4",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "5",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "6",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "7",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "8",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "9",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "10",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "11",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "12",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "13",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "14",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "15",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "16",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "17",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "18",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "19",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "20",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "21",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "22",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "23",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "24",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "25",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "26",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "27",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "28",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "29",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "30",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "31",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "32",
            [vName]: getRandom(4, 6).toFixed(2)
        },
        {
            "batch": "33",
            [vName]: getRandom(4, 6).toFixed(2)
        },
    ]

    const histoData = [
        {
            "bin_edge": "0.1",
            "name":"0.1 - 0.15",
            "freq" : 0,
            "disCurve" : Math.round(pdf(0.1,0.53,0.04)*100)/100
        },
        {
            "bin_edge": "0.15",
            "freq" : 0,
            "disCurve" : Math.round(pdf(0.15,0.53,0.04)*100)/100
        },
        {
            "bin_edge": "0.2",
            "freq" : 0,
            "disCurve" : Math.round(pdf(0.2,0.53,0.04)*100)/100
        },
        {
            "bin_edge": "0.25",
            "freq" : 0,
            "disCurve" : Math.round(pdf(0.25,0.53,0.04)*100)/100
        },
        {
            "bin_edge": "0.3",
            "freq" : 0,
            "disCurve" : Math.round(pdf(0.3,0.53,0.04)*100)/100

        },
        {
            "bin_edge": "0.35",
            "freq" : 0,
            "disCurve" : Math.round(pdf(0.35,0.53,0.04)*100)/100
        },
        {
            "bin_edge": "0.4",
            "freq" : 0,
            "disCurve" : Math.round(pdf(0.4,0.53,0.04)*100)/100

        },
        {
            "bin_edge": "0.45",
            "name":"0.45 - 0.5",
            "freq" : 16,
            "disCurve" : Math.round(pdf(0.45,0.53,0.04)*100)/100
        },
        {
            "bin_edge": "0.5",
            "freq" : 25,
            "disCurve" : Math.round(pdf(0.5,0.53,0.04)*100)/100

        },
        {
            "bin_edge": "0.55",
            "freq" : 10,
            "disCurve" : Math.round(pdf(0.55,0.53,0.04)*100)/100

        },
        {
            "bin_edge": "0.6",
            "freq" : 7,
            "disCurve" : Math.round(pdf(0.6,0.53,0.04)*100)/100
        },
        {
            "bin_edge": "0.65",
            "freq" : 7,
            "disCurve" : Math.round(pdf(0.65,0.53,0.04)*100)/100
        },
        {
            "bin_edge": "0.7",
            "freq" : 0,
            "disCurve" : Math.round(pdf(0.7,0.53,0.04)*100)/100

        },
        {
            "bin_edge": "0.75",
            "freq" : 0,
            "disCurve" : Math.round(pdf(0.75,0.53,0.04)*100)/100
        },
        {
            "bin_edge": "0.8",
            "freq" : 0,
            "disCurve" : Math.round(pdf(0.8,0.53,0.04)*100)/100

        },
        {
            "bin_edge": "0.85",
            "freq" : 0,
            "disCurve" : Math.round(pdf(0.85,0.53,0.04)*100)/100
        },
        {
            "bin_edge": "0.9",
            "freq" : 0,
            "disCurve" : Math.round(pdf(0.9,0.53,0.04)*100)/100

        },
        {
            "bin_edge": "0.95",
            "freq" : 0,
            "disCurve" : Math.round(pdf(0.95,0.53,0.04)*100)/100
        },
        {
            "bin_edge": "1.0",
            "freq" : 0,
            "disCurve" : Math.round(pdf(1.0,0.53,0.04)*100)/100

        },
    ]
    
    










    function pdf(x, mean, stdDev) {
        return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2)));
      }

    useEffect(() => {
        histoData.map((index, value)=>{
                
        })
        pdf()
    })


    return(
        <div>
            <CtrlChart xbar = {true} data = {data} unit = {"%"} vName = {vName} lsl = {2} usl = {8} lcl = {4.474} ucl = {6.412} avg = {4.943}/>
            <CtrlChart xbar = {false} data = {data} unit = {"%"} vName = {vName} lcl = {4.474} ucl = {6.412} avg = {4.943}/>
            <LastObsScatterChart data = {data.slice(-25)} unit = {"%"} vName = {vName} lsl = {2} usl = {8} lcl = {4.474} ucl = {6.412} avg = {4.943}/>
            <Histogram data = {histoData}/>
        </div>
    )
}

export default CtrlChartSample;