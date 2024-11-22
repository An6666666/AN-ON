// 迷宮結構：1 牆壁，0 通道
var MAZE = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];  // 起點(1,1)，終點(8,10)

// 定義點 (Point) 類別
class Point {
    constructor(_row, _col) {
        this.row = _row;
        this.col = _col;
    }

    isEnd() {
        return this.row === end.row && this.col === end.col;
    }
}

// 定義起點和終點
var start = new Point(1, 1);
var end = new Point(8, 10);

// 創建堆疊和當前步驟
var Stack = [];
var step = start;

// 繪製迷宮的函數
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const rows = MAZE.length;
const cols = MAZE[0].length;
const cellSize = 30; // 每格的大小

// 初始化迷宮顯示
function displayMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除畫布
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (MAZE[i][j] === 1) {
                ctx.fillStyle = '#000'; // 牆壁顏色
            } else if (MAZE[i][j] === 2) {
                ctx.fillStyle = '#FFFF00'; // 訪問過的路徑顏色
            } else {
                ctx.fillStyle = '#FFFFFF'; // 空格顏色
            }

            ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize); // 繪製每格

            // 標記起點和終點
            if (i === start.row && j === start.col) {
                ctx.fillStyle = '#FF0000'; // 起點顏色
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
            }
            if (i === end.row && j === end.col) {
                ctx.fillStyle = '#0000FF'; // 終點顏色
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
            }
        }
    }
}

// 開始解迷宮的過程
function go() {
    Stack.push(step);
    MAZE[step.row][step.col] = 2;  // 標記為訪問過
    displayMaze();  // 顯示迷宮

    // 深度優先搜索（DFS）解迷宮
    while (!step.isEnd()) {
        let moved = false;
        // 嘗試上、下、左、右移動
        if (step.row > 0 && MAZE[step.row - 1][step.col] === 0) {  // 上
            step = new Point(step.row - 1, step.col);
            MAZE[step.row][step.col] = 2;
            Stack.push(step);
            moved = true;
        } else if (step.row < rows - 1 && MAZE[step.row + 1][step.col] === 0) {  // 下
            step = new Point(step.row + 1, step.col);
            MAZE[step.row][step.col] = 2;
            Stack.push(step);
            moved = true;
        } else if (step.col > 0 && MAZE[step.row][step.col - 1] === 0) {  // 左
            step = new Point(step.row, step.col - 1);
            MAZE[step.row][step.col] = 2;
            Stack.push(step);
            moved = true;
        } else if (step.col < cols - 1 && MAZE[step.row][step.col + 1] === 0) {  // 右
            step = new Point(step.row, step.col + 1);
            MAZE[step.row][step.col] = 2;
            Stack.push(step);
            moved = true;
        }

        // 如果沒有移動，則退回上一個步驟
        if (!moved) {
            Stack.pop();
            if (Stack.length === 0) {
                alert("無法解決迷宮！");
                return;
            }
            step = Stack[Stack.length - 1];
        }

        displayMaze();  // 顯示更新後的迷宮
    }

    alert("迷宮已解決！");
    displayMaze();  // 顯示最終解決的迷宮
}

// 初始化迷宮
displayMaze();





     