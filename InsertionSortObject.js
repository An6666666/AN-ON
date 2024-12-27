class Sorter {
    constructor(arr) {
        this.arr = arr;  // 保存數組
    }

    // 插入排序方法
    insertionSort() {
        for (let i = 1; i < this.arr.length; i++) {
            let current = this.arr[i];  // 當前元素
            let j = i - 1;

            // 將大於 current 的元素向右移動，直到找到插入位置
            while (j >= 0 && this.arr[j] > current) {
                this.arr[j + 1] = this.arr[j];
                j--;
            }

            // 插入 current 到正確的位置
            this.arr[j + 1] = current;
        }
    }

    // 顯示排序後的數組
    getSortedArray() {
        return this.arr;
    }
}

// 使用物件導向的方式創建排序物件並排序
let sorter = new Sorter([12, 11, 13, 5, 6]);
sorter.insertionSort();
console.log("排序後的數組:", sorter.getSortedArray());
