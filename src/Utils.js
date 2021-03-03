class Utils {
    static roundToDecimals(num, decimals = 2) {
        return +(Math.round(num + `e+${decimals}`) + `e-${decimals}`);
    }
}

module.exports = Utils