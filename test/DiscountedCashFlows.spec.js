require('should');
const DiscountedCashFlows = require('../src/DiscountedCashFlows');


describe('DiscountedCashFlows', async () => {
  describe('getGrowthRateForYear', () => {
    it('should get 0.1 for all years', () => {
      const growthRates = [0.1]
      for (let yearIndex = 0; yearIndex < DiscountedCashFlows.MAX_YEARS; yearIndex++) {
        const selectedGrowthRate = DiscountedCashFlows.getGrowthRateForYear(growthRates, yearIndex)
        selectedGrowthRate.should.equal(growthRates[0])
      }
    })

    it('should get 0.4 for year 6, index 5', () => {
      const growthRates = [0.5, 0.4]
      const selectedGrowthRate = DiscountedCashFlows.getGrowthRateForYear(growthRates, 5)
      selectedGrowthRate.should.equal(growthRates[1])
    })

    it('should get 0.5 for year 5, index 4', () => {
      const growthRates = [0.5, 0.4]
      const selectedGrowthRate = DiscountedCashFlows.getGrowthRateForYear(growthRates, 4)
      selectedGrowthRate.should.equal(growthRates[0])
    })

    it('should get 0.2 for year 10, index 9', () => {
      const growthRates = [0.5, 0.4, 0.2]
      const selectedGrowthRate = DiscountedCashFlows.getGrowthRateForYear(growthRates, 9)
      selectedGrowthRate.should.equal(growthRates[2])
    })

    it('should get 0.1 for year 1, index 0', () => {
      const growthRates = [0.1, 0.4, 0.2]
      const selectedGrowthRate = DiscountedCashFlows.getGrowthRateForYear(growthRates, 0)
      selectedGrowthRate.should.equal(growthRates[0])
    })

    it('should retrieve same rate for every 2 years', () => {
      const growthRates = [0.4, 0.1, 0.7, 0.8, 0.2]
      DiscountedCashFlows.getGrowthRateForYear(growthRates, 0).should.equal(growthRates[0])
      DiscountedCashFlows.getGrowthRateForYear(growthRates, 1).should.equal(growthRates[0])
      DiscountedCashFlows.getGrowthRateForYear(growthRates, 2).should.equal(growthRates[1])
      DiscountedCashFlows.getGrowthRateForYear(growthRates, 3).should.equal(growthRates[1])
      DiscountedCashFlows.getGrowthRateForYear(growthRates, 4).should.equal(growthRates[2])
      DiscountedCashFlows.getGrowthRateForYear(growthRates, 5).should.equal(growthRates[2])
      DiscountedCashFlows.getGrowthRateForYear(growthRates, 6).should.equal(growthRates[3])
      DiscountedCashFlows.getGrowthRateForYear(growthRates, 7).should.equal(growthRates[3])
      DiscountedCashFlows.getGrowthRateForYear(growthRates, 8).should.equal(growthRates[4])
      DiscountedCashFlows.getGrowthRateForYear(growthRates, 9).should.equal(growthRates[4])
    })

    it('should retrieve last rate if it goes over maximum number of years', () => {
      const growthRates = [0.4, 0.1, 0.7, 0.8, 0.2]
      DiscountedCashFlows.getGrowthRateForYear(growthRates, 11).should.equal(growthRates[4])
    })

    it('should get different rate for every year', () => {
      const growthRates = Array.from(Array(10).keys())
      growthRates.map((growthRate, index) => {
        const selectedGrowthRate = DiscountedCashFlows.getGrowthRateForYear(growthRates, index)
        selectedGrowthRate.should.be.eql(growthRates[growthRate])
      })
    })
  })

  describe.skip('calculate', () => {
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
