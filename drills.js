const LinkedList = require('./LL');

// Question 3 Implementing quicksort

// Write a function qSort that sorts a dataset using the quicksort algorithm.

// The dataset to sort is: 89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5.

let NUM = '89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5'.split(
  ' '
);
NUM = NUM.map((num) => parseInt(num));

function qSort(arr, start = 0, end = arr.length) {
  if (start >= end) {
    return arr;
  }
  const middle = partition(arr, start, end);
  arr = qSort(arr, start, middle);
  arr = qSort(arr, middle + 1, end);
  return arr;
}

function partition(arr, start, end) {
  const pivot = arr[end - 1];
  let j = start;
  for (let i = start; i < end - 1; i++) {
    if (arr[i] <= pivot) {
      swap(arr, i, j);
      j++;
    }
  }
  swap(arr, end - 1, j);
  return j;
}

function swap(arr, i, j) {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

// console.log(qSort(NUM));

// Question 4 Implementing merge sort

// Write a function mSort that sorts the dataset above using the merge sort algorithm.

let NUMZ = '89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5'.split(
  ' '
);
NUMZ = NUMZ.map((num) => parseInt(num));

function mSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const middle = Math.floor(arr.length / 2);
  let left = arr.slice(0, middle);
  let right = arr.slice(middle, arr.length);

  left = mSort(left);
  right = mSort(right);
  return merge(left, right, arr);
}

function merge(left, right, arr) {
  let leftIndex = 0;
  let rightIndex = 0;
  let resultIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      arr[resultIndex++] = left[leftIndex++];
    } else {
      arr[resultIndex++] = right[rightIndex++];
    }
  }
  for (let i = leftIndex; i < left.length; i++) {
    arr[resultIndex++] = left[i];
  }
  for (let i = rightIndex; i < right.length; i++) {
    arr[resultIndex++] = right[i];
  }
  return arr;
}
//   console.log(mSort(NUM))

// Question 5 Sorting a linked list using merge sort

// Given a Linked List, sort the linked list using merge sort. You will need your linked list class from previous lesson to create the list and use all of its supplemental functions to solve this problem.

function linkListMSort(list) {
  let currNode = list.head;
  if (currNode.next === null) {
    return list;
  }

  let length = 1;
  while (currNode.next !== null) {
    length++;
    currNode = currNode.next;
  }

  const midIndex = Math.floor(length / 2);

  let leftList = splitList(list, 0, midIndex);
  let rightList = splitList(list, midIndex, length);

  leftList = linkListMSort(leftList);
  rightList = linkListMSort(rightList);

  return mergeLists(leftList, rightList);
}

function splitList(list, startIndex, endIndex) {
  let currNode = list.head;
  if (currNode === null) return;
  const returnList = new LinkedList();
  let i = 0;
  while (currNode !== null) {
    if (i >= startIndex && i < endIndex) {
      returnList.insertLast(currNode.value);
    }
    i++;
    currNode = currNode.next;
  }
  return returnList;
}

function mergeLists(leftList, rightList) {
  const mergeList = new LinkedList();
  let currLeft = leftList.head;
  let currRight = rightList.head;

  while (currLeft && currRight) {
    if (currLeft.value <= currRight.value) {
      mergeList.insertLast(currLeft.value);
      currLeft = currLeft.next;
    } else {
      mergeList.insertLast(currRight.value);
      currRight = currRight.next;
    }
  }

  while (currLeft) {
    mergeList.insertLast(currLeft.value);
    currLeft = currLeft.next;
  }

  while (currRight) {
    mergeList.insertLast(currRight.value);
    currRight = currRight.next;
  }
  return mergeList;
}

// Question 6 Bucket sort

// Write an O(n) algorithm to sort an array of integers, where you know in advance what the lowest and highest values are. You can't use arr.splice(), shift() or unshift() for this exercise.

const bucketArr = [44, 85, 1, 11, 17, 37, 64, 5, 88, 19, 6, 52];
const bSort = (max, min, arr) => {
  const range = max - min;
  let buckets = [];
  for (let i = 0; i <= range; i++) {
    buckets.push([]);
  }
  for (let j = 0; j < bucketArr.length; j++) {
    buckets[arr[j] - 1].push(arr[j]);
  }
  return buckets.reduce((acc, val) => acc.concat(val), []);
};
// console.log(bSort(88, 1, bucketArr));

// Question 7 Sort in place

// Write an algorithm to shuffle an array into a random order in place (i.e., without creating a new array).

const arrayShufla = (arr) => {
  for (let i=0; i< arr.length; i++) {
    const randomIndex = Math.floor(Math.random() * arr.length)
    swap(arr, i, randomIndex)
  }
  return arr
}
console.log(arrayShufla(bucketArr))

// Question 8 Sorting books

// Write an algorithm to shuffle an array into a random order in place (i.e., without creating a new array).
