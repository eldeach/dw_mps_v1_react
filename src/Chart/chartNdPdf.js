function chartNdPdf(bin_edge, avg, stdDev, roundingDigit) {

    return Math.round(
        (
            1 / (stdDev * Math.sqrt(2 * Math.PI))
        ) * Math.exp(
            - Math.pow(bin_edge - avg, 2) / (2 * Math.pow(stdDev, 2))
        )
        * Math.pow(10, roundingDigit)
    ) / Math.pow(10, roundingDigit)
        ;
}

export default chartNdPdf; 