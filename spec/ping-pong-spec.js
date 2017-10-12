var Calculator = require('./../js/pingpong.js').calculatorModule;

describe('Calculator', function() {
  var reusableCalculator;

  beforeEach(function(){
    reusableCalculator = new Calculator();
  })

  it('should return ping if input is divisible by 3', function() {
    expect(reusableCalculator.pingPong(3)).toEqual([1, 2, 'ping']);
  });

  it('should return pong if input is divisible by 5', function() {
    expect(reusableCalculator.pingPong(5)).toEqual([1, 2, 'ping', 4, 'pong']);
  });

  it('should return ping-pong if input is divisible by 3 and 5', function() {
    expect(reusableCalculator.pingPong(15)).toEqual([1, 2, 'ping', 4, 'pong', 'ping', 7, 8, 'ping', 'pong', 11, 'ping', 13, 14, 'ping-pong']);
  });

  it('should return the inputed number, if the number is not divisible by either 3 or 5', function() {
    expect(reusableCalculator.pingPong(2)).toEqual([1, 2]);
  });
});