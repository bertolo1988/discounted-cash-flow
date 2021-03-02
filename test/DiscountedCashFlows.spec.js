require('should');
const DiscountedCashFlows = require('../src/DiscountedCashFlows');

describe('DiscountedCashFlows', async () => {
  describe('calculate', () => {
    it('should calculate discounted cash flow', () => {
      let growthRateUntilFive = 0.12;
      let growthRateUntilTen = 0.07;
      let freeCashFlow = 58.896;
      let terminalPE = 15;
      let discountRate = 0.1;
      let result = DiscountedCashFlows.calculate(
        growthRateUntilFive,
        growthRateUntilTen,
        freeCashFlow,
        terminalPE,
        discountRate
      );
      result.pvFutureCashFlows.should.be.eql(1294.59);
    });

    it('should calculate discounted cash flow with growth rate 0 for both 5y and 10y', () => {
      let growthRateUntilFive = 0;
      let growthRateUntilTen = 0;
      let freeCashFlow = 58.896;
      let terminalPE = 15;
      let discountRate = 0.1;
      let result = DiscountedCashFlows.calculate(
        growthRateUntilFive,
        growthRateUntilTen,
        freeCashFlow,
        terminalPE,
        discountRate
      );
      result.pvFutureCashFlows.should.be.eql(702.56);
    });

    it('should default both growth rates to 0 if they are not passed', () => {
      let growthRateUntilFive = undefined;
      let growthRateUntilTen = undefined;
      let freeCashFlow = 58.896;
      let terminalPE = 15;
      let discountRate = 0.1;
      let result = DiscountedCashFlows.calculate(
        growthRateUntilFive,
        growthRateUntilTen,
        freeCashFlow,
        terminalPE,
        discountRate
      );
      result.pvFutureCashFlows.should.be.eql(702.56);
    });
  });
});
