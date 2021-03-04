# discounted-cash-flow

Discounted cash flow (DCF) is a valuation method used to estimate the value of an investment based on its expected future cash flows. DCF analysis attempts to figure out the value of an investment today, based on projections of how much money it will generate in the future.

The purpose of DCF analysis is to estimate the money an investor would receive from an investment, adjusted for the time value of money. The time value of money assumes that a dollar today is worth more than a dollar tomorrow because it can be invested. As such, a DCF analysis is appropriate in any situation where a person is paying money in the present with expectations of receiving more money in the future.

## References

[Discounted Cash Flow (DCF)](https://www.investopedia.com/terms/d/dcf.asp)

[How To Calculate Intrinsic Value, Investing with Tom](https://www.youtube.com/watch?v=cI8ZSf0nkFs).

## Installation

`npm install discounted-cash-flow --save`

## How to use

Check [./test/DiscountedCashFlow.spec.js] for examples.

```
DiscountedCashFlow.calculate(
  firstFreeCashFlow,
  [growthRate],
  terminalPE,
  discountRate,
  decimals);
```

## inputs

### firstFreeCashFlow

The first free cash flow can sometimes be found in the cash flow statement or be calculated as shown [here](https://www.investopedia.com/terms/f/freecashflow.asp).

### growthRate

The growthRate should be provided as an array. Each value of this array will affect a portion of the years depending on the amount of values provided. 

Example: [0.05, 0.02] - the applied growth rate will be 5% for the first 5 years and 2% for the last 5.

Example: [0.07] - the applied growth rate will be 7%.

### terminalPE

Expected price to earnings ratio at the end of the calculation.

### discountRate

The rate at which each future cash flow will be discounted at.

### decimals

Desired rounding precision. Defaults to 2.

## outputs

### futureCashFlows

Estimation of future cash flows using the provided growth rate.

### presentValueFutureCashFlows

Present value of each one of the future cash flows.

### valueFutureSale

Last free cash flow x PE ratio.

### presentValueFutureSale

Value of future sale discounted into present value.

### totalPresentValue

Sum of present value of future sale plus the sum of every future cash flow discounted into present value.

Represents the intrinsic value of company operation or the "fair" enterprise value of the company.

## Test

`npm run test`

