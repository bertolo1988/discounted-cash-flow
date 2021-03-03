const _ = require('lodash');
const Utils = require('./Utils')

class DiscountedCashFlows {
  static MAX_YEARS = 10

  static calculatePresentValueArray(fcfArray, discountRate) {
    let result = [];
    for (let i = 0; i < DiscountedCashFlows.MAX_YEARS; i++) {
      let denominator = Math.pow(1 + discountRate, i + 1);
      result.push(Utils.roundToDecimals(fcfArray[i] / denominator));
    }
    return result;
  }

  static getGrowthRateForYear(growthRates, yearIndex) {
    let yearsByRate = DiscountedCashFlows.MAX_YEARS / growthRates.length
    let rateIndex = Math.min(Math.floor(yearIndex / yearsByRate), growthRates.length - 1)
    return growthRates[rateIndex]
  }

  static getGrowthOfValue(
    firstValue,
    growthRates
  ) {
    let result = [firstValue];
    for (let i = 1; i < DiscountedCashFlows.MAX_YEARS; i++) {
      let previous = result[i - 1];
      let growthRate = DiscountedCashFlows.getGrowthRateForYear(growthRates, i)
      let rawFreeCashFlow = previous + previous * growthRate
      result.push(rawFreeCashFlow);
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
    let fcfArray = DiscountedCashFlows.getGrowthOfValue(
      freeCashFlow,
      growthRates
    );
    let fcfTimesPE = Utils.roundToDecimals(fcfArray[fcfArray.length - 1] * terminalPE, rounding);
    let pvArray = calculatePresentValueArray(fcfArray, discountRate);
    let lastPV = Utils.roundToDecimals(fcfTimesPE / Math.pow(1 + discountRate, 10), rounding);
    let pvFutureCashFlows = Utils.roundToDecimals(
      pvArray.reduce((a, b) => a + b, 0) + lastPV, rounding
    );
    return {
      pvFutureCashFlows
    };
  }
}

module.exports = DiscountedCashFlows;
