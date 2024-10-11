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
do{
  var G=readline.questionInt("Please input 4 digits? ");
}while(G<1000 || G>=10000);
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
                    checkedAns[j] = true; // 标记这个数字为已检查
                    break; // 退出内层循环
                }
            }
        }
    }

    console.log(`${countA}A ${countB}B`);

    // 检查猜测是否正确
    if (countA === 4) {
        correct = true;
        console.log(`恭喜你！你在${attempts}次尝试中猜到了数字 ${AnsStr}。`);
    }
