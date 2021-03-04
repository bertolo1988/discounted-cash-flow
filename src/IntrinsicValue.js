const _ = require('lodash');

const MAX_YEARS = 10;

class IntrinsicValue {
  static get MAX_YEARS() {
    return MAX_YEARS;
  }

  static getDiscountedValueByYear(value, discountRate, year) {
    let denominator = Math.pow(1 + discountRate, year);
    return value / denominator;
  }

  static getPresentValueFutureFlows(fcfArray, discountRate) {
    let result = [];
    for (let i = 0; i < IntrinsicValue.MAX_YEARS; i++) {
      const presentValue = IntrinsicValue.getDiscountedValueByYear(
        fcfArray[i],
        discountRate,
        i + 1
      );
      result.push(presentValue);
    }
    return result;
  }

  static getGrowthRateForYear(growthRates, yearIndex) {
    let yearsByRate = IntrinsicValue.MAX_YEARS / growthRates.length;
    let rateIndex = Math.min(
      Math.floor(yearIndex / yearsByRate),
      growthRates.length - 1
    );
    return growthRates[rateIndex];
  }

  static getGrowthOfValue(firstValue, growthRates) {
    let result = [firstValue];
    for (let i = 1; i < IntrinsicValue.MAX_YEARS; i++) {
      let previous = result[i - 1];
      let growthRate = IntrinsicValue.getGrowthRateForYear(growthRates, i);
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

  static calculate(
    freeCashFlow,
    growthRates = [0],
    terminalPE = 10,
    discountRate = 0.1,
    decimals = 2
  ) {
    let futureCashFlows = IntrinsicValue.getGrowthOfValue(
      freeCashFlow,
      growthRates
    );
    let presentValueFutureCashFlows = IntrinsicValue.getPresentValueFutureFlows(
      futureCashFlows,
      discountRate
    );
    const valueFutureSale = IntrinsicValue.getFutureSaleValue(
      futureCashFlows,
      terminalPE
    );
    let presentValueFutureSale = IntrinsicValue.getDiscountedValueByYear(
      valueFutureSale,
      discountRate,
      10
    );
    const totalPresentValue = IntrinsicValue.getTotalPresentValue(
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

module.exports = IntrinsicValue;
