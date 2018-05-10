/**
 * Reads a dollar amount as text given a string in the expected
 * format of starting with a dollar sign "$" and ending with two places left of the decimal ($1212.12).
 * @constructor
 * @param {string} dollarInputValue - The dollar amount in string format that might be on a form.
 */
class DollarAmountReader {

  constructor(dollarInputValue) {
    // Saving the input value as is
    this.dollarInputValue = dollarInputValue;

    // Convert input to number before validation so that validation will work properly
    this.dollarNumberValue = this.convertInputToNumber(this.dollarInputValue);

    // Check input here to make sure it is the expected format
    if (!this.verifyInput()) {
      console.log("Input does not match format. Format should be like: $3421.01");
      return false;
    }

    this.dollarNumberValue = this.convertInputToNumber(this.dollarInputValue);
    this.fractionOfDollar = this.dollarInputValue.slice(-2);
    this.dollarWordString = "";

    // Set word arrays to class for easy access
    this.zeroThroughNineWords = ['','one','two','three','four','five','six','seven','eight','nine'];
    this.teenWords=['ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
    this.multiplesOfTenWords = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
  }

  /**
   * verifyInput - validates input for expected format
   *
   * @return {boolean}  return true if verified input
   * @throws Will throw an error if the string is not formatted as expected.
   */
  verifyInput() {
    // Checking for Dollar sign
    if (this.dollarInputValue.charAt(0) !== '$') {
      throw "Invalid dollar amount, must begin with dollar sign";
    }

    // Strip dollar sign
    var dollarString = this.dollarInputValue.substr(1);

    // Checking for two decimal places and all numbers
    var decimalRegex  = /^\d+(?:\.\d{2})$/;
    if (!decimalRegex.test(dollarString)) {
      throw "Invalid dollar amount, must have two decimal places and only numbers without commas";
    }

    return true;
  }

  /**
   * convertInputToNumber
   *
   * @param  {string} dollarInput a dollar value
   * @return {integer}      return result for this
   */
  convertInputToNumber(dollarInput) {
    // Strip dollar sign and decimal places
    var dollarString = dollarInput.substr(1);
    return parseInt(dollarString);
  }

  /**
   * readDollarAmount - this is the main method of this class that is to be called externally
   */
  readDollarAmount() {
    // Does everything, removes $, checks trillions, billions, millions... and so on
    if (this.dollarNumberValue == 0) {
      return "Zero" + this.readFractionsOfDollar(this.fractionOfDollar);
    } else {
      // Read starting with the trillion dollar level, very rarely is money counted past trillions of dollars
      var dollarWordText = this.readTrillionDollars(this.dollarNumberValue);
      var fractionsOfDollarText = this.readFractionsOfDollar(this.fractionOfDollar);
      var entireMoneyString = dollarWordText + fractionsOfDollarText;

      // Capitalize first letter of entireMoneyString and return
      return entireMoneyString.charAt(0).toUpperCase() + entireMoneyString.slice(1);
    }
  }

  /**
   * readTrillionDollars
   *
   * @param  {integer} dollarValueToRead a dollar value
   * @return {string}      return result for this
   */
  readTrillionDollars(dollarValueToRead){
    if (dollarValueToRead >= 1000000000000){
      return this.readTrillionDollars(Math.floor(dollarValueToRead/1000000000000)) + " trillion " + this.readBillionDollars(dollarValueToRead%1000000000000);
    }
    else {
      return this.readBillionDollars(dollarValueToRead);
    }
  }

  /**
   * readBillionDollars
   *
   * @param  {integer} dollarValueToRead a dollar value
   * @return {string}      return result for this
   */
  readBillionDollars(dollarValueToRead){
    if (dollarValueToRead >= 1000000000){
      return this.readBillionDollars(Math.floor(dollarValueToRead/1000000000)) + " billion " + this.readMillionDollars(dollarValueToRead%1000000000);
    }
    else {
      return this.readMillionDollars(dollarValueToRead);
    }
  }

  /**
   * readMillionDollars
   *
   * @param  {integer} dollarValueToRead a dollar value
   * @return {string}      return result for this
   */
  readMillionDollars(dollarValueToRead){
    if (dollarValueToRead >= 1000000){
      return this.readMillionDollars(Math.floor(dollarValueToRead/1000000)) + " million " + this.readThousandDollars(dollarValueToRead%1000000);
    }
    else {
      return this.readThousandDollars(dollarValueToRead);
    }
  }

  /**
   * readThousandDollars
   *
   * @param  {integer} dollarValueToRead a dollar value
   * @return {string}      return result for this
   */
  readThousandDollars(dollarValueToRead) {
    if (dollarValueToRead >= 1000) {
      return this.readHundredDollars(Math.floor(dollarValueToRead/1000))+ " thousand " + this.readHundredDollars(dollarValueToRead%1000);
    }
    else {
      return this.readHundredDollars(dollarValueToRead);
    }
  }

  /**
   * readHundredDollars
   *
   * @param  {integer} dollarValueToRead a dollar value
   * @return {string}      return result for this
   */
  readHundredDollars(dollarValueToRead) {
    if (dollarValueToRead > 99) {
      return this.zeroThroughNineWords[Math.floor(dollarValueToRead/100)] + " hundred " + this.readTensOfDollars(dollarValueToRead%100);
    }
    else {
      return this.readTensOfDollars(dollarValueToRead);
    }
  }

  /**
   * readTensOfDollars
   *
   * @param  {integer} dollarValueToRead a dollar value
   * @return {string}      return result for this
   */
  readTensOfDollars(dollarValueToRead) {
    if (dollarValueToRead < 10) {
      return this.zeroThroughNineWords[dollarValueToRead];
    } else if (dollarValueToRead >= 10 && dollarValueToRead < 20) {
      return this.teenWords[dollarValueToRead - 10];
    } else {
      return this.multiplesOfTenWords[Math.floor(dollarValueToRead/10)] + " " + this.zeroThroughNineWords[dollarValueToRead%10];
    }
  }

  /**
   * readFractionsOfDollar
   *
   * @param  {integer} fractionsToRead a fraction of dollar value
   * @return {string}      return result for this
   */
  readFractionsOfDollar(fractionsToRead) {
    var fractionText = " and " + String(fractionsToRead) + "/100 dollars";
    return fractionText;
  }

}

module.exports = DollarAmountReader;
