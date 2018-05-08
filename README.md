# DollarAmountReader

This is a class designed to take a dollar amount in the format of $2523.04 and turn it into something readable as text such as "Two thousand five hundred twenty three and 04/100 dollars".


# Files

If you look at the files, the class is in the DollarAmountReader.js file.

The Runner.js file is just a sample of usage without any error handling or try/catch.

The TestScript.js has a number of test cases for valid and invalid input to make sure that the class is behaving as expected.

## Running the code

If you just want to run the code without modification you should be able to use the command "node TestScript.js" from the main directory to see all of the test cases present in the test script.

If you would like to use the test your own input to the class you can use the command "node Runner.js" and modify the dollar amount passed into the DollarAmountReader class. This class does throw errors for invalid input, so you should in production usage you should attempt to catch errors thrown by the class. You can see a limited sample of this in the TestScript.js file.
