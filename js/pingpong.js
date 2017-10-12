function Calculator(skinName) {
  this.skin = skinName;
}

Calculator.prototype.pingPong = function(goal) {
  var output = [];
  for (var i = 1; i <= goal; i++) {
    if (i % 15 === 0) {
      output.push("ping-pong");
      console.log(output);
    } else if (i % 3 === 0) {
      output.push("ping");
      console.log(output);
    } else if (i % 5 === 0) {
      output.push("pong");
      console.log(output);
    } else {
      output.push(i);
    }
  }
  console.log(output);
  return output;
};

exports.calculatorModule = Calculator;