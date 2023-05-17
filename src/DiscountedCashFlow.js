const _ = require('lodash');

const MAX_YEARS = 10;

class DiscountedCashFlow {
  static get MAX_YEARS() {
    return MAX_YEARS;
  }

  static getDiscountedValueByYear(value, discountRate, year) {
    let denominator = Math.pow(1 + discountRate, year);
    return value / denominator;
  }

  static getPresentValueFutureFlows(fcfArray, discountRate) {
    let result = [];
    for (let i = 0; i < DiscountedCashFlow.MAX_YEARS; i++) {
      const presentValue = DiscountedCashFlow.getDiscountedValueByYear(
        fcfArray[i],
        discountRate,
        i + 1
      );
      result.push(presentValue);
    }
    return result;
  }

  static getGrowthRateForYear(growthRates, yearIndex) {
    let yearsByRate = DiscountedCashFlow.MAX_YEARS / growthRates.length;
    let rateIndex = Math.min(
      Math.floor(yearIndex / yearsByRate),
      growthRates.length - 1
    );
    return growthRates[rateIndex];
  }

  static getGrowthOfValue(firstValue, growthRates) {
    let result = [firstValue];
    for (let i = 1; i < DiscountedCashFlow.MAX_YEARS; i++) {
      let previous = result[i - 1];
      let growthRate = DiscountedCashFlow.getGrowthRateForYear(growthRates, i);
      let rawFreeCashFlow = previous + previous * growthRate;
      result.push(rawFreeCashFlow);
    }
    return result;
  }

  static getFutureSaleValue(fcfArray, terminalPE) {
    return fcfArray[fcfArray.length - 1] * terminalPE;
  }

  static getTotalPresentValue(
    presentValueFutureCashFlows,
    presentValueFutureSale
  ) {
    return (
      presentValueFutureCashFlows.reduce((a, b) => a + b, 0) +
      presentValueFutureSale
    );
  }

  /**
   * Valuation method used to estimate the value of an investment based on its expected future cash flows.
   * @param {*} freeCashFlow - initial free cash flow
   * @param {*} growthRates - array of growth rates that will affect the initial free cash flow over the years
   * @param {*} terminalPE - expected price to earnings ratio at the end of the 10 year period
   * @param {*} discountRate - discount rate or margin of safety
   * @param {*} decimals - rounding precision, defaults to 2
   */
  static calculate(
    freeCashFlow,
    growthRates = [0],
    terminalPE = 10,
    discountRate = 0.1,
    decimals = 2
  ) {
    let futureCashFlows = DiscountedCashFlow.getGrowthOfValue(
      freeCashFlow,
      growthRates
    );
    let presentValueFutureCashFlows =
      DiscountedCashFlow.getPresentValueFutureFlows(
        futureCashFlows,
        discountRate
      );
    const valueFutureSale = DiscountedCashFlow.getFutureSaleValue(
      futureCashFlows,
      terminalPE
    );
    let presentValueFutureSale = DiscountedCashFlow.getDiscountedValueByYear(
      valueFutureSale,
      discountRate,
      10
    );
    const totalPresentValue = DiscountedCashFlow.getTotalPresentValue(
      presentValueFutureCashFlows,
      presentValueFutureSale
    );
    return {
      futureCashFlows: futureCashFlows.map((e) => _.round(e, decimals)),
      presentValueFutureCashFlows: presentValueFutureCashFlows.map((e) =>
        _.round(e, decimals)
      ),
      valueFutureSale: _.round(valueFutureSale, decimals),
      presentValueFutureSale: _.round(presentValueFutureSale, decimals),
      totalPresentValue: _.round(totalPresentValue, decimals)
    };
  }
}

module.exports = DiscountedCashFlow;
