
const Live = 1;
const Dead = 0;
var canvas = document.getElementById("map").getContext("2d");
class Life {
    constructor(_row, _col) {
        this.row = _row;
        this.col = _col;
        this.grid = Array.from({ length: this.row }, () => Array(this.col).fill(Dead));
    }

    initialize() {
        this.grid[1][1] = Live;
        this.grid[1][2] = this.grid[1][3] = this.grid[1][4] = Live; 
    }

    update() {
        let nextGrid = JSON.parse(JSON.stringify(this.grid));
        for (let _row = 0; _row < this.row; _row++) {
            for (let _col = 0; _col < this.col; _col++) {
                const neighbor = this.neighborCount(_row, _col);
                const status = this.getStatusAt(_row, _col);
                
                if (status === Live && (neighbor < 2 || neighbor > 3)) {
                    nextGrid[_row][_col] = Dead;
                }
                if (status === Dead && neighbor === 3) {
                    nextGrid[_row][_col] = Live;
                }
            }
        }
        this.grid = nextGrid;
    }

    neighborCount(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue; // skip the cell itself
                count += this.getStatusAt(row + i, col + j);
            }
        }
        return count;
    }

    getStatusAt(row, col) {
        if (row < 0 || col < 0 || row >= this.row || col >= this.col) {
            return Dead;
        } else {
            return this.grid[row][col];
        }
    }

    draw() {
        console.clear(); // 清除控制台
        for (let row of this.grid) {
            console.log(row.map(cell => (cell === Live ? '█' : ' ')).join(''));
        }
    }
}

// 創建生命遊戲實例
const myGame = new Life(10, 10);
myGame.initialize();

// 主迴圈，每秒更新並繪製
setInterval(() => {
    myGame.update();
    myGame.draw();
}, 1000); // 每秒更新一次