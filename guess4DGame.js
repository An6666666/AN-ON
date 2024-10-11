var readline = require("readline-sync");

//Generate 4 digit randomly
var Ans=[0,1,2,3,4,5,6,7,8,9]; //permutation
for(var i=0;i<4;i++){
  var rand = Math.floor(Math.random()*10);
  //swap i, rand
  var temp= Ans[i];
  Ans[i] = Ans[rand];
  Ans[rand] = temp;
}
var AnsStr = Ans.join('');
let attempts = 0;
let correct = false;

while (!correct) {
    attempts++;
    var G = readline.questionInt("Please enter 4 unique numbers");
    
    // 输入验证
    while (G < 1000 || G >= 10000 || new Set(G.toString()).size !== 4) {
        console.log("Invalid input. Please make sure the input is a 4-digit number and the number is unique");
        G = readline.questionInt("Please enter 4 unique numbers");
    }

    var Gstr = G.toString();
    
    var countA = 0, countB = 0;
    var checkedAns = new Array(4).fill(false);
    var checkedG = new Array(4).fill(false);

    for (var i = 0; i < 4; i++) {
        if (Gstr[i] === AnsStr[i]) {
            countA++;
            checkedAns[i] = true;
            checkedG[i] = true;
        }
    }

    for (var i = 0; i < 4; i++) {
        if (!checkedG[i]) {
            for (var j = 0; j < 4; j++) {
                if (!checkedAns[j] && Gstr[i] === AnsStr[j]) {
                    countB++;
                    checkedAns[j] = true; 
                    break; 
                }
            }
        }
    }

    console.log(`${countA}A ${countB}B`);

    if (countA === 4) {
        correct = true;
        console.log(`恭喜你！你在${attempts}次嘗試中猜到了數字 ${AnsStr}。`);
    }
}
