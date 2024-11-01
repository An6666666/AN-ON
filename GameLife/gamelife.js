const Live = 1; // 定義活細胞的值
const Dead = 0; // 定義死細胞的值

class Life {
    constructor(_row, _col) {
        this.row = _row; // 行數
        this.col = _col; // 列數
        this.grid = []; // 用於存儲細胞狀態的二維陣列
        
        // 初始化二維陣列為死細胞
        for (var _row = 0; _row < this.row; _row++) {
            this.grid.push([]); // 建立每一行
            for (var _col = 0; _col < this.col; _col++) {
                this.grid[_row].push(Dead); // 將所有細胞初始化為死細胞
            }
        }
    }
    
    // 初始化細胞狀態，可以隨機或設置特定的初始狀態
    initialize = function(random) {
        if (random == true) { // 如果需要隨機初始化
            for (var _row = 0; _row < this.row; _row++) {
                for (var _col = 0; _col < this.col; _col++) {
                    this.grid[_row][_col] = (Math.random() < 0.1) ? Live : Dead; // 10%機率為活細胞
                }
            }
        } else { // 否則設置特定的活細胞
            this.grid[1][1] = Live;
            this.grid[1][2] = this.grid[1][3] = this.grid[1][4] = Live; 
        }
    }

    // 更新細胞狀態根據生命遊戲的規則
    update = function() {
        var nextGrid = JSON.parse(JSON.stringify(this.grid)); // 深拷貝當前的格子狀態
        var neighbor; // 用於存儲鄰居數量

        // 遍歷所有細胞，計算其鄰居數量並更新狀態
        for (let _row = 0; _row < this.row; _row++) {
            for (let _col = 0; _col < this.col; _col++) {
                neighbor = this.neighborCount(_row, _col); // 計算鄰居數量
                
                // 根據遊戲規則更新細胞狀態
                if (this.getStatusAt(_row, _col) == Live && (neighbor <= 1 || neighbor >= 4)) {
                    nextGrid[_row][_col] = Dead; // 活細胞周圍少於2個或多於3個鄰居則死亡
                }
                if (this.getStatusAt(_row, _col) == Dead && neighbor == 3) {
                    nextGrid[_row][_col] = Live; // 死細胞周圍有恰好3個鄰居則變為活細胞
                }
            }
        }

        this.grid = null; // 清空當前格子
        this.grid = nextGrid; // 更新為下一輪的格子狀態
    }

    // 計算指定位置的鄰居數量
    neighborCount = function(row, col) {
        var count = 0; // 初始化鄰居計數
        // 加上所有8個方向的鄰居細胞狀態
        count += this.getStatusAt(row - 1, col - 1);
        count += this.getStatusAt(row - 1, col);
        count += this.getStatusAt(row - 1, col + 1);
        count += this.getStatusAt(row, col - 1);
        count += this.getStatusAt(row, col + 1);
        count += this.getStatusAt(row + 1, col - 1);
        count += this.getStatusAt(row + 1, col);
        count += this.getStatusAt(row + 1, col + 1);      
        return count; // 返回鄰居數量
    }

    // 獲取指定位置的細胞狀態
    getStatusAt = function(row, col) {
        // 如果位置超出邊界，返回死細胞狀態
        if (row < 0 || col < 0 || row >= this.row || col >= this.col) {
            return Dead;
        } else {
            return this.grid[row][col]; // 返回當前細胞的狀態
        }
    }

    // 繪製當前的格子狀態
    draw = function(_canvas) {
        var canvas = document.getElementById(_canvas).getContext("2d"); // 獲取畫布的上下文
        this.size = Math.min(canvas.canvas.height / this.row, canvas.canvas.width / this.col); // 計算每個細胞的大小
        
        // 遍歷格子並繪製
        for (var _row = 0; _row < this.row; _row++) {
            for (var _col = 0; _col < this.col; _col++) {
                // 根據細胞狀態選擇顏色
                if (this.grid[_row][_col] == Live) {
                    canvas.fillStyle = "#ff0000"; // 活細胞為紅色
                } else {
                    canvas.fillStyle = "#ffffff"; // 死細胞為白色
                }
                // 繪製細胞的矩形
                canvas.fillRect(_col * this.size, _row * this.size, this.size, this.size);
                canvas.strokeRect(_col * this.size, _row * this.size, this.size, this.size); // 繪製邊框
            }
        }
    }

    // 繪製單個細胞
    drawPoint = function(_canvas, _row, _col) {
        var canvas = document.getElementById(_canvas).getContext("2d");
        // 繪製該細胞的顏色
        if (this.grid[_row][_col] == Live) {
            canvas.fillStyle = "#ff0000";
        } else {
            canvas.fillStyle = "#ffffff";
        }
        canvas.fillRect(_col * this.size, _row * this.size, this.size, this.size); // 繪製細胞
        canvas.strokeRect(_col * this.size, _row * this.size, this.size, this.size); // 繪製邊框
    }
}

// 更新遊戲狀態的函數
function tonext() {
    myGame.update(); // 更新細胞狀態
    myGame.draw("map"); // 繪製新的狀態到畫布
}

// 處理滑鼠點擊事件
function mouseClick(event) {
    var _row = Math.floor(event.offsetY / myGame.size); // 計算點擊位置的行
    var _col = Math.floor(event.offsetX / myGame.size); // 計算點擊位置的列
    // 切換細胞狀態
    myGame.grid[_row][_col] = Number(!myGame.getStatusAt(_row, _col)); 
    myGame.drawPoint("map", _row, _col); // 繪製單個細胞
}

// 隨機初始化細胞狀態
function random() {
    myGame.initialize(true); // 隨機初始化
    myGame.draw("map"); // 繪製初始狀態
}

var myTime; // 用於存儲計時器

// 開始運行遊戲的函數
function run() {
    var step = document.getElementById("step").value; // 獲取時間間隔
    myTime = setInterval(tonext, Number(step)); // 每隔一定時間更新一次
}

// 停止運行的函數
function stop() {
    clearInterval(myTime); // 清除計時器
}

// 創建生命遊戲實例
var myGame = new Life(100, 100);
myGame.initialize(); // 初始化遊戲狀態
myGame.draw("map"); // 繪製初始狀態

var runnng = setTimeout(tonext, 1000); // 延遲1秒後開始第一步更新
