require('should');
const { roundNumber } = require('../src/Utils');

describe('Utils', function () {
  describe('roundNumber', function () {
    describe('with decimals specified and positive input', function () {
      it('should round 2.553 to 2.55 rounding to two decimals', () => {
        const decimals = 2;
        const input = 2.553;
        const expected = 2.55;
        const result = roundNumber(input, decimals);
        result.should.equal(expected);
      });

      it('should round 0.5 to 0.5 rounding to two decimals', () => {
        const decimals = 2;
        const input = 0.5;
        const expected = 0.5;
        const result = roundNumber(input, decimals);
        result.should.equal(expected);
      });

      it('should round 0.112 to 0.11 rounding to two decimals', () => {
        const decimals = 2;
        const input = 0.112;
        const expected = 0.11;
        const result = roundNumber(input, decimals);
        result.should.equal(expected);
      });
    });

    describe('with decimals specified and negative input', function () {
      it('should round -2.553 to -2.55 rounding to two decimals', () => {
        const decimals = 2;
        const input = -2.553;
        const expected = -2.55;
        const result = roundNumber(input, decimals);
        result.should.equal(expected);
      });

      it('should round -0.5 to -0.5 rounding to two decimals', () => {
        const decimals = 2;
        const input = -0.5;
        const expected = -0.5;
        const result = roundNumber(input, decimals);
        result.should.equal(expected);
      });

      it('should round -0.112 to -0.11 rounding to two decimals', () => {
        const decimals = 2;
        const input = -0.112;
        const expected = -0.11;
        const result = roundNumber(input, decimals);
        result.should.equal(expected);
      });
    });
  });
});
