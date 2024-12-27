// 合併兩個已經排序好的數組
function merge(left, right) {
    let result = [];
    let i = 0;
    let j = 0;

    // 合併過程
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    // 處理剩餘元素
    return result.concat(left.slice(i), right.slice(j));
}

// Merge Sort 函數
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr; // 如果數組長度小於等於 1，返回數組本身
    }

    // 分解步驟：將數組分成左右兩半
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));  // 左半部分
    const right = mergeSort(arr.slice(mid));   // 右半部分

    // 合併步驟：將已排序的左右部分合併
    return merge(left, right);
}

// 測試 Merge Sort
const arr = [38, 27, 43, 3, 9, 82, 10];
console.log(mergeSort(arr));  // 輸出排序後的數組

