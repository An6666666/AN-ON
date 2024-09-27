var readline = require("readline-sync");

var a = readline. questionInt("Please input ur weight(KG)?");
var b = readline. questionInt("Please input ur hight(CM)?");
var bmi=a/((b/100)**2);
if (bmi < 18.5){
    greeting="過輕";
}
else if(18.5 <= bmi && bmi < 24){
    greeting="健康";
}
else if(24 <= bmi && bmi < 27){
    greeting="過重";
}
else {
    greeting="肥胖";
}
console.log(greeting+bmi);
