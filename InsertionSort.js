function insertionSort(arr) {
    // 從第二個元素開始，逐個將元素插入到已經排好序的部分
    for (let i = 1; i < arr.length; i++) {
        let current = arr[i];  // 當前元素
        let j = i - 1;  // 從當前元素的前一個位置開始

        // 將大於 current 的元素向右移動，直到找到插入位置
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];  // 向右移動元素
            j--;  // 繼續向前比較
        }

        // 插入 current 到正確的位置
        arr[j + 1] = current;
    }

    return arr;  // 返回排序後的數組
}

// 範例使用
let arr = [12, 11, 13, 5, 6];
console.log("排序前:", arr);
let sortedArr = insertionSort(arr);
console.log("排序後:", sortedArr);
