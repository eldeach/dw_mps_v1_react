import chartNdPdf from "../../Chart/chartNdPdf";

const dsHistogram = {
    control_data: [
        {
            title: 'Histogram Sample',
            lsl: `0.2`,
            usl: `0.95`
        }
    ],
    data: [
        {
            "bin_edge": "0.1",
            "freq": 0,
            "disCurve": chartNdPdf(0.1, 0.53, 0.04, 2)
        },
        {
            "bin_edge": "0.15",
            "freq": 0,
            "disCurve": chartNdPdf(0.15, 0.53, 0.04, 2)
        },
        {
            "bin_edge": "0.2",
            "freq": 0,
            "disCurve": chartNdPdf(0.2, 0.53, 0.04, 2)
        },
        {
            "bin_edge": "0.25",
            "freq": 0,
            "disCurve": chartNdPdf(0.25, 0.53, 0.04, 2)
        },
        {
            "bin_edge": "0.3",
            "freq": 0,
            "disCurve": chartNdPdf(0.3, 0.53, 0.04, 2)

        },
        {
            "bin_edge": "0.35",
            "freq": 0,
            "disCurve": chartNdPdf(0.35, 0.53, 0.04, 2)
        },
        {
            "bin_edge": "0.4",
            "freq": 0,
            "disCurve": chartNdPdf(0.4, 0.53, 0.04, 2)

        },
        {
            "bin_edge": "0.45",
            "name": "0.45 - 0.5",
            "freq": 16,
            "disCurve": chartNdPdf(0.45, 0.53, 0.04, 2)
        },
        {
            "bin_edge": "0.5",
            "freq": 25,
            "disCurve": chartNdPdf(0.5, 0.53, 0.04, 2)

        },
        {
            "bin_edge": "0.55",
            "freq": 10,
            "disCurve": chartNdPdf(0.55, 0.53, 0.04, 2)

        },
        {
            "bin_edge": "0.6",
            "freq": 7,
            "disCurve": chartNdPdf(0.6, 0.53, 0.04, 2)
        },
        {
            "bin_edge": "0.65",
            "freq": 7,
            "disCurve": chartNdPdf(0.65, 0.53, 0.04, 2)
        },
        {
            "bin_edge": "0.7",
            "freq": 0,
            "disCurve": chartNdPdf(0.7, 0.53, 0.04, 2)

        },
        {
            "bin_edge": "0.75",
            "freq": 0,
            "disCurve": chartNdPdf(0.75, 0.53, 0.04, 2)
        },
        {
            "bin_edge": "0.8",
            "freq": 0,
            "disCurve": chartNdPdf(0.8, 0.53, 0.04, 2)

        },
        {
            "bin_edge": "0.85",
            "freq": 0,
            "disCurve": chartNdPdf(0.85, 0.53, 0.04, 2)
        },
        {
            "bin_edge": "0.9",
            "freq": 0,
            "disCurve": chartNdPdf(0.9, 0.53, 0.04, 2)

        },
        {
            "bin_edge": "0.95",
            "freq": 0,
            "disCurve": chartNdPdf(0.95, 0.53, 0.04, 2)
        },
        {
            "bin_edge": "1.0",
            "freq": 0,
            "disCurve": chartNdPdf(1.0, 0.53, 0.04, 2)

        },
    ],

}
export default dsHistogram;