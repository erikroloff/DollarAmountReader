const DollarAmountReader = require("./DollarAmountReader.js");

var DollarReader = new DollarAmountReader("$4414121111131.11");
var stringToLog = DollarReader.readDollarAmount();
console.log(stringToLog);
