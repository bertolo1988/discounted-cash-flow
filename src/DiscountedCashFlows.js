const _ = require('lodash');

class DiscountedCashFlows {
  static MAX_YEARS = 10

  static calculatePresentValueArray(fcfArray, discountRate) {
    let result = [];
    for (let i = 0; i < DiscountedCashFlows.MAX_YEARS; i++) {
      let denominator = Math.pow(1 + discountRate, i + 1);
      result.push(roundToDecimals(fcfArray[i] / denominator));
    }
    return result;
  }

  static getGrowthRateForYear(growthRates, yearIndex) {
    let yearsByRate = DiscountedCashFlows.MAX_YEARS / growthRates.length
    let rateIndex = Math.min(Math.floor(yearIndex / yearsByRate), growthRates.length - 1)
    return growthRates[rateIndex]
  }

  static calculateFreeCashFlowArray(
    firstValue,
    growthRates
  ) {
    let result = [roundToDecimals(firstValue)];
    for (let i = 1; i < MAX_YEARS; i++) {
      let previous = result[i - 1];
      let growthRate = DiscountedCashFlows.getGrowthRateForYear(growthRates, i)
      result.push(roundToDecimals(previous + previous * growthRate));
    }
    return result;
  }

  static calculate(
    freeCashFlow,
    growthRates = [0],
    terminalPE = 10,
    discountRate = 0.1,
    rounding = 2
  ) {
    let fcfArray = DiscountedCashFlows.calculateFreeCashFlowArray(
      freeCashFlow,
      growthRates
    );
    let fcfTimesPE = roundToDecimals(fcfArray[fcfArray.length - 1] * terminalPE);
    let pvArray = calculatePresentValueArray(fcfArray, discountRate);
    let lastPV = roundToDecimals(fcfTimesPE / Math.pow(1 + discountRate, 10));
    let pvFutureCashFlows = roundToDecimals(
      pvArray.reduce((a, b) => a + b, 0) + lastPV
    );
    return {
      pvFutureCashFlows
    };
  }
}

module.exports = DiscountedCashFlows;
