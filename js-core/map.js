//! Common Map Operations & Utilities for SDET Interviews

//! Built-in Map Methods Quick Reference
/*
 * new Map()           - Create new Map: new Map([['key', 'value']])
 * set(key, value)     - Add/update entry: myMap.set('key', 'value')
 * get(key)           - Get value: myMap.get('key')
 * delete(key)        - Remove entry: myMap.delete('key')
 * has(key)           - Check if key exists: myMap.has('key')
 * clear()            - Remove all entries: myMap.clear()
 * size               - Get size: myMap.size
 * keys()             - Get keys iterator: [...myMap.keys()]
 * values()           - Get values iterator: [...myMap.values()]
 * entries()          - Get entries: [...myMap.entries()]
 * forEach()          - Iterate: myMap.forEach((value, key) => console.log(key, value))
 * 
 * Example:
 * const myMap = new Map();
 * myMap.set('name', 'John');           // Map(1) {"name" => "John"}
 * myMap.get('name');                   // "John"
 * myMap.has('name');                   // true
 * myMap.delete('name');                // true
 * 
 * //! WeakMap - Special Map for object keys only
 * const weakMap = new WeakMap();       // Only objects as keys
 * const obj = {};
 * weakMap.set(obj, 'data');           // Keys are weakly referenced
 */

//! 1. Map Transformations
const objectToMap = obj => new Map(Object.entries(obj));

const mapToObject = map => Object.fromEntries(map);

const arrayToMap = arr => new Map(arr.map((val, i) => [i, val]));

const mergeMaps = (map1, map2) => new Map([...map1, ...map2]);

//! 2. Map Operations
const filterMap = (map, predicate) => 
  new Map([...map].filter(([k, v]) => predicate(k, v)));

const mapValues = (map, transform) => 
  new Map([...map].map(([k, v]) => [k, transform(v)]));

const groupBy = (arr, keyFn) => 
  arr.reduce((map, item) => {
    const key = keyFn(item);
    return map.set(key, [...(map.get(key) || []), item]);
  }, new Map());

//! 3. Cache Implementation (using Map)
function Cache(maxSize = 100) {
  this.cache = new Map();
  this.maxSize = maxSize;

  this.set = function(key, value, ttl = 60000) { //! TTL in ms, default 1 minute
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, {
      value,
      expiry: Date.now() + ttl
    });
  };

  this.get = function(key) {
    const data = this.cache.get(key);
    if (!data) return null;
    
    if (Date.now() > data.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return data.value;
  };

  this.clear = function() {
    this.cache.clear();
  };
}

//! 4. WeakMap Example (for memory-efficient object mapping)
function ObjectTracker() {
  this.tracker = new WeakMap();

  this.track = function(obj, metadata) {
    this.tracker.set(obj, {
      created: Date.now(),
      ...metadata
    });
  };

  this.getInfo = function(obj) {
    return this.tracker.get(obj);
  };
}

//! Export for testing
module.exports = {
  objectToMap,
  mapToObject,
  arrayToMap,
  mergeMaps,
  filterMap,
  mapValues,
  groupBy,
  Cache,
  ObjectTracker
}; 