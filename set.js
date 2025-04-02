//! Common Set Operations & Utilities for SDET Interviews

//! Built-in Set Methods Quick Reference
/*
 * new Set()          - Create new Set: new Set([1, 2, 3])
 * add(value)         - Add value: mySet.add(4)
 * delete(value)      - Remove value: mySet.delete(4)
 * has(value)         - Check if exists: mySet.has(4)
 * clear()            - Remove all elements: mySet.clear()
 * size               - Get size: mySet.size
 * values()/keys()    - Get iterator: [...mySet.values()]
 * entries()          - Get [value,value] pairs: mySet.entries()
 * forEach()          - Iterate: mySet.forEach(value => console.log(value))
 * 
 * Example:
 * const mySet = new Set([1, 2, 3]);
 * mySet.add(4);                    // Set(4) {1, 2, 3, 4}
 * mySet.has(4);                    // true
 * mySet.delete(4);                 // true
 * [...mySet];                      // [1, 2, 3]
 */

//! 1. Set Operations
const union = (setA, setB) => new Set([...setA, ...setB]);

const intersection = (setA, setB) => 
  new Set([...setA].filter(x => setB.has(x)));

const difference = (setA, setB) => 
  new Set([...setA].filter(x => !setB.has(x)));

const symmetricDifference = (setA, setB) => 
  new Set([...setA].filter(x => !setB.has(x))
          .concat([...setB].filter(x => !setA.has(x))));

//! 2. Set Utilities
const isSubset = (setA, setB) => 
  [...setA].every(elem => setB.has(elem));

const uniqueArray = arr => [...new Set(arr)];

const findDuplicates = arr => 
  [...new Set(arr.filter((item, index) => arr.indexOf(item) !== index))];

//! 3. Custom Set Implementation (for interview demonstration)
function CustomSet(items = []) {
  this.items = [...new Set(items)];

  this.add = function(item) {
    if (!this.has(item)) this.items.push(item);
    return this;
  };

  this.delete = function(item) {
    const index = this.items.indexOf(item);
    if (index > -1) this.items.splice(index, 1);
    return this;
  };

  this.has = function(item) {
    return this.items.includes(item);
  };

  this.size = function() {
    return this.items.length;
  };

  this.clear = function() {
    this.items = [];
  };

  this.values = function() {
    return [...this.items];
  };
}

//! Export for testing
module.exports = {
  union,
  intersection,
  difference,
  symmetricDifference,
  isSubset,
  uniqueArray,
  findDuplicates,
  CustomSet
}; 