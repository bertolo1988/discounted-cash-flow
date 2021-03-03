require('should')
const Utils = require('../src/Utils')

describe('Utils', () => {
    describe('roundToDecimals', () => {
        it('should round number to 2 decimals if number of decimals is not specified', () => {
            const num = 2.33333
            Utils.roundToDecimals(num).should.be.eql(2.33)
        })

        it('should round number to 3 decimals', () => {
            const num = -2.33333
            Utils.roundToDecimals(num, 3).should.be.eql(-2.333)
        })
    })
})