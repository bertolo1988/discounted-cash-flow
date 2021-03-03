require('should');
const Utils = require('../src/Utils')
const DiscountedCashFlows = require('../src/DiscountedCashFlows');
const { first } = require('lodash');


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

  describe('getGrowthOfValue', () => {
    it('calculate the growth of apple free cash flow over the years, 12% in first 5, 7% onwards', () => {
      const firstValue = 58.896
      const growthRates = [0.12, 0.07]
      const decimals = 2
      const freeCashFlows = DiscountedCashFlows.getGrowthOfValue(firstValue, growthRates)
      let roundedFreeCashFlows = freeCashFlows.map(e => Utils.roundToDecimals(e, decimals))
      roundedFreeCashFlows.should.be.eql([
        58.90,
        65.96,
        73.88,
        82.74,
        92.67,
        99.16,
        106.1,
        113.53,
        121.48,
        129.98])
    })

    it('should calculate growth with a rate of 0', () => {
      const firstValue = 10
      const growthRates = [0]
      const decimals = 1
      const freeCashFlows = DiscountedCashFlows.getGrowthOfValue(firstValue, growthRates)
      freeCashFlows.every(e => e.should.be.eql(firstValue))
    })

    it('should calculate growth with rate -3% in first 5 years and -1% onwards', () => {
      const firstValue = 58.896
      const growthRates = [-0.03, -0.01]
      const decimals = 1
      const freeCashFlows = DiscountedCashFlows.getGrowthOfValue(firstValue, growthRates)
      let roundedFreeCashFlows = freeCashFlows.map(e => Utils.roundToDecimals(e, decimals))
      roundedFreeCashFlows.should.be.eql([
        58.9, 57.1, 55.4,
        53.8, 52.1, 51.6,
        51.1, 50.6, 50.1,
        49.6
      ])
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
