//! Common Array Operations & Utilities for SDET Interviews

//! Built-in Array Methods Quick Reference
/*
 * Adding/Removing Elements
 * push(items)       - Add to end: arr.push(4, 5)           // returns new length
 * pop()            - Remove from end: arr.pop()            // returns removed item
 * unshift(items)   - Add to start: arr.unshift(1, 2)      // returns new length
 * shift()          - Remove from start: arr.shift()        // returns removed item
 * splice(pos,n,items) - Add/remove at pos: arr.splice(2,1,'new') // returns removed
 * 
 * Finding Elements
 * indexOf(item)    - Find first index: arr.indexOf(5)      // returns index or -1
 * lastIndexOf(item)- Find last index: arr.lastIndexOf(5)   // returns index or -1
 * includes(item)   - Check if exists: arr.includes(5)      // returns boolean
 * find(fn)         - Find first match: arr.find(x => x > 3)// returns item or undefined
 * findIndex(fn)    - Find first index: arr.findIndex(x => x > 3)// returns index or -1
 * 
 * Transforming Arrays
 * map(fn)          - Transform all: arr.map(x => x * 2)    // returns new array
 * filter(fn)       - Keep matching: arr.filter(x => x > 3) // returns new array
 * reduce(fn,init)  - Reduce to value: arr.reduce((a,b) => a + b, 0)
 * sort(fn)         - Sort in place: arr.sort((a,b) => a - b)
 * reverse()        - Reverse in place: arr.reverse()
 * 
 * Creating Arrays
 * slice(start,end) - Extract section: arr.slice(1,4)      // returns new array
 * concat(arrays)   - Join arrays: arr1.concat(arr2,arr3)  // returns new array
 * flat(depth)      - Flatten nested: arr.flat(2)          // returns new array
 * Array.from(obj)  - From iterable: Array.from('hello')   // returns new array
 * Array(n).fill(x) - Create filled: new Array(3).fill(0)  // returns new array
 * 
 * Example:
 * const arr = [1, 2, 3, 4, 5];
 * arr.filter(x => x % 2 === 0)         // [2, 4]
 * arr.map(x => x * 2)                  // [2, 4, 6, 8, 10]
 * arr.reduce((sum, x) => sum + x, 0)   // 15
 */


//! 1. Array Flattening - Convert nested arrays to single level
const flatten = arr => arr.reduce((flat, item) => 
  flat.concat(Array.isArray(item) ? flatten(item) : item), []);

//! 2. Remove Duplicates
const removeDupesSet = arr => [...new Set(arr)];

const removeDupesFilter = arr => 
  arr.filter((item, index) => arr.indexOf(item) === index);

//! 3. Array Sorting
const sortNumeric = arr => arr.sort((a, b) => a - b);

const sortByProperty = (arr, prop) => 
  arr.sort((a, b) => a[prop] > b[prop] ? 1 : -1);

//! 4. Finding pairs that sum to target (Two Sum)
const findPairWithSum = (arr, target) => {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(arr[i], i);
  }
  return [];
};

//! 5. Binary Search - O(log n) complexity
const binarySearch = (arr, target) => {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
};

//! 6. Array Intersection
const findIntersection = (arr1, arr2) => 
  arr1.filter(item => arr2.includes(item));

//! 7. Chunk Array
const chunkArray = (arr, size) => 
  Array.from({ length: Math.ceil(arr.length / size) }, 
    (_, i) => arr.slice(i * size, i * size + size));

//! Export for testing
module.exports = {
  flatten,
  removeDupesSet,
  removeDupesFilter,
  sortNumeric,
  sortByProperty,
  findPairWithSum,
  binarySearch,
  findIntersection,
  chunkArray
}; 