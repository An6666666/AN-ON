var readline = require("readline-sync");

var a = readline. question("Please input ur weight(KG)?");
var b = 160;
var bmi=a/((b/100)**2);
console.log("Hello"+bmi);
