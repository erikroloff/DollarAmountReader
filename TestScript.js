const DollarAmountReader = require("./DollarAmountReader.js");

var validTestDollarAmounts = [
  "$2523.04",
  "$100101.01",
  "$20121212131.99",
  "$1.11",
  "$2.22",
  "$3.33",
  "$0.00",
  "$0.34",
  "$55.55",
  "$552.12",
  "$1010.10",
  "$23456.78",
  "$98765.89",
  "$10010101.12",
  "$543219876.98",
  "$1416523870.00",
  "$98787865761.01",
  "$768765987091.34",
  "$3333343234145.98",
  "$19928288273821.87",
  "$882726372627326.78"
];

validTestDollarAmounts.forEach(function(validTestDollarAmount) {
  try {
    var DollarReader = new DollarAmountReader(validTestDollarAmount);
    var readDollarString = DollarReader.readDollarAmount();
    console.log(validTestDollarAmount + " -> " + readDollarString);
  } catch(error) {
    console.log(validTestDollarAmount + " ->" + error);
  }

});

console.log("---- Expect Errors Below ----");

var invalidTestDollarAmounts = [
  "$100101.0",
  "20121212131.99",
  "$1.111",
  "$2.",
  "$3",
  "0.00",
  "$554,444.55",
  "5"
];

invalidTestDollarAmounts.forEach(function(invalidTestDollarAmount) {
  try {
    var DollarReader = new DollarAmountReader(invalidTestDollarAmount);
    var readDollarString = DollarReader.readDollarAmount();
  } catch(error) {
    console.log(invalidTestDollarAmount + " ->" + error);
  }
});
