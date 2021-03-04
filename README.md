# intrinsic-value

Calculates present value of future cash flows commonly refered as Intrinsic value.
Based on [Investing with Tom video](https://www.youtube.com/watch?v=cI8ZSf0nkFs).

## Installation

`npm install intrinsic-value --save`

## How to use

Check [./test/IntrinsicValue.spec.js] for examples.

```
IntrinsicValue.calculate(
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
