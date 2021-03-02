const _ = require('lodash');

function roundToTwo(num) {
  return +(Math.round(num + 'e+2') + 'e-2');
}

function calculateFreeCashFlowArray(
  firstValue,
  growthRateUntilFive,
  growthRateUntilTen
) {
  let result = [roundToTwo(firstValue)];
  for (let i = 1; i < 10; i++) {
    let previous = result[i - 1];
    let growthRate = i < 5 ? growthRateUntilFive : growthRateUntilTen;
    result.push(roundToTwo(previous + previous * growthRate));
  }
  return result;
}

function calculatePresentValueArray(fcfArray, discountRate) {
  let result = [];
  for (let i = 0; i < 10; i++) {
    let denominator = Math.pow(1 + discountRate, i + 1);
    result.push(roundToTwo(fcfArray[i] / denominator));
  }
  return result;
}

function validateInputs(
  growthRateUntilFive,
  growthRateUntilTen,
  freeCashFlow,
  terminalPE,
  discountRate
) {
  if (_.isNil(growthRateUntilFive)) {
    throw new Error('Missing growthRateUntilFive!');
  }
  if (_.isNil(growthRateUntilTen)) {
    throw new Error('Missing growthRateUntilTen!');
  }
  if (_.isNil(discountRate)) {
    throw new Error('Missing discountRate!');
  }
  if (_.isNil(terminalPE)) {
    throw new Error('Missing terminalPE!');
  }
  if (_.isNil(freeCashFlow)) {
    throw new Error('Missing freeCashFlow!');
  }
}

class DiscountedCashFlows {
  /**
   * Calculates the intrinsic value
   * @param {*} growthRateUntilFive integer between 0 and 1 representing the estimated growth in next 5 years
   * @param {*} growthRateUntilTen integer between 0 and 1 representing the estimated growth in the 5th year onwards until the 10th
   * @param {*} freeCashFlow last reported free cash flow, or some average of the last years to be more representative
   * @param {*} excessCapital cash sitting in the company balance sheet
   * @param {*} discountRate discount rate applied to every cash flow as a safety margin, usually its 0.1
   * @param {*} terminalPE expected PE ratio in 10 years
   * @returns {object} returns  pvFutureCashFlows (present value of future cash flows), intrinsicValue (present value + cash)
   */
  static calculate(
    growthRateUntilFive = 0,
    growthRateUntilTen = 0,
    freeCashFlow,
    terminalPE = 10,
    discountRate = 0.1
  ) {
    validateInputs(
      growthRateUntilFive,
      growthRateUntilTen,
      freeCashFlow,
      terminalPE,
      discountRate
    );
    let fcfArray = calculateFreeCashFlowArray(
      freeCashFlow,
      growthRateUntilFive,
      growthRateUntilTen
    );
    let fcfTimesPE = roundToTwo(fcfArray[fcfArray.length - 1] * terminalPE);
    let pvArray = calculatePresentValueArray(fcfArray, discountRate);
    let lastPV = roundToTwo(fcfTimesPE / Math.pow(1 + discountRate, 10));
    let pvFutureCashFlows = roundToTwo(
      pvArray.reduce((a, b) => a + b, 0) + lastPV
    );
    return {
      pvFutureCashFlows
    };
  }
}

module.exports = DiscountedCashFlows;
