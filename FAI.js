var readline = require("readline-sync");
var n = readline.questionInt("Please input an intger ?");
var r=[];

function FAI(n) {
    if (n <= 1) {
        return 1;
    }

    let a = 1, b = 1; // 初始化前兩個數字
    for (let i = 2; i <= n; i++) {
        let temp = a + b; // 計算當前的數字
        r.push(temp);
        a = b; // 更新a
        b = temp; // 更新b
    }

    return b; // 回傳第n個數字
}


console.log(FAI(n));