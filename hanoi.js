function iterativeHanoi(n, p1, p2, p3) {
       let totalMoves = Math.pow(2, n) - 1;  // 計算總移動次數
       let stack = [];
   
       // 儲存初始狀態
       stack.push({n: n, from: p1, to: p3, aux: p2, step: 1});
   
       for (let i = 0; stack.length > 0; i++) {  // 使用for迴圈進行疊代
           let current = stack.pop();
   
           if (current.n === 1) {
               console.log(current.n + "套環從 " + current.from + " 移到 " + current.to);
           } else {
               // 如果是第一步，處理子問題
               if (current.step === 1) {
                   stack.push({n: current.n - 1, from: current.aux, to: current.to, aux: current.from, step: 1}); // 第一次遞迴
                   stack.push({n: current.n, from: current.from, to: current.to, aux: current.aux, step: 2}); // 移動目前的盤子
               }
               // 如果是第二步，處理移動盤子的步驟
               else if (current.step === 2) {
                   console.log(current.n + "套環從 " + current.from + " 移到 " + current.to);
                   stack.push({n: current.n - 1, from: current.from, to: current.aux, aux: current.to, step: 1}); // 第二次遞迴
               }
           }
       }
   }
   
   // 呼叫函數
   iterativeHanoi(3, "P1", "P2", "P3");
   
   