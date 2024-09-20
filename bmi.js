function BMI() {
var a = Number(document.getElementById("a").value);
var b = Number(document.getElementById("b").value);
var bmi=a/((b/100)**2);
document.getElementById("bmi").innerHTML = bmi;
console.log("Hello"+bmi);
}