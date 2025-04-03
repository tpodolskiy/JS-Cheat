// Common Object Operations & Utilities for SDET Interviews

//! Built-in Object Methods Quick Reference
/*
 * Object Creation & Properties
 * Object.create(proto)    - Create with prototype: Object.create(proto)
 * Object.assign(target,sources) - Copy props: Object.assign({}, obj1, obj2)
 * Object.defineProperty() - Define prop: Object.defineProperty(obj,'key',{value:5})
 * Object.freeze()         - Make immutable: Object.freeze(obj)
 * Object.seal()          - Prevent add/delete: Object.seal(obj)
 * 
 * Property Inspection
 * Object.keys()          - Get keys: Object.keys(obj)           // ['a', 'b']
 * Object.values()        - Get values: Object.values(obj)       // [1, 2]
 * Object.entries()       - Get pairs: Object.entries(obj)       // [['a',1],['b',2]]
 * Object.hasOwn(obj,prop)- Check own prop: Object.hasOwn(obj,'key')
 * obj.hasOwnProperty()   - Check own prop: obj.hasOwnProperty('key')
 * 
 * Property Descriptors
 * Object.getOwnPropertyDescriptor() - Get prop info
 * Object.getOwnPropertyNames()      - Get all prop names
 * Object.getPrototypeOf()          - Get prototype
 * 
 * Object Operations
 * {...obj}              - Shallow clone: const copy = {...obj}
 * Object.is(val1,val2)  - Strict equality: Object.is(NaN,NaN) // true
 * delete obj.prop       - Delete property: delete user.age
 * 'prop' in obj         - Check existence: 'name' in user
 * 
 * Example:
 * const user = { name: 'John', age: 30 };
 * Object.entries(user).forEach(([key, value]) => console.log(`${key}: ${value}`));
 * const frozen = Object.freeze({ x: 1 }); // Cannot modify
 * const merged = Object.assign({}, obj1, obj2); // Merge objects
 * 
 * Common Testing Patterns:
 * 1. Deep equality checks
 * 2. Schema validation
 * 3. Property existence verification
 * 4. Immutability testing
 * 5. Prototype chain validation
 */

// Common Object Methods & Algorithms for SDET Interviews

// 1. Deep Clone - Handle nested objects and arrays
const deepClone = obj => {
  if (obj === null || typeof obj !== 'object') return obj;
  const copy = Array.isArray(obj) ? [] : {};
  Object.keys(obj).forEach(key => copy[key] = deepClone(obj[key]));
  return copy;
};

// 2. Deep Compare - Compare nested objects/arrays
const deepEqual = (obj1, obj2) => {
  if (obj1 === obj2) return true;
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;
  const keys1 = Object.keys(obj1), keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;
  return keys1.every(key => deepEqual(obj1[key], obj2[key]));
};

// 3. Object Transformation - Common in API testing
const transformObject = {
  // Flatten nested object
  flatten: (obj, prefix = '') => {
    return Object.keys(obj).reduce((acc, key) => {
      const pre = prefix.length ? prefix + '.' : '';
      if (typeof obj[key] === 'object' && obj[key] !== null) 
        Object.assign(acc, transformObject.flatten(obj[key], pre + key));
      else
        acc[pre + key] = obj[key];
      return acc;
    }, {});
  },
  // Pick specific keys
  pick: (obj, keys) => 
    keys.reduce((acc, key) => (key in obj && (acc[key] = obj[key]), acc), {})
};

// 4. Object Validation - Schema validation pattern
const validateObject = (obj, schema) => {
  return Object.keys(schema).every(key => {
    if (!obj.hasOwnProperty(key)) return false;
    return typeof obj[key] === schema[key];
  });
};

// 5. Merge Objects - Deep merge with conflict resolution
const deepMerge = (target, source) => {
  Object.keys(source).forEach(key => {
    if (source[key] instanceof Object && key in target) 
      Object.assign(source[key], deepMerge(target[key], source[key]));
  });
  return Object.assign({}, target, source);
};

// 6. Object Diff - Useful for comparing API responses
const objectDiff = (obj1, obj2) => {
  const diff = {};
  Object.keys({...obj1, ...obj2}).forEach(key => {
    if (obj1[key] !== obj2[key]) diff[key] = {
      old: obj1[key],
      new: obj2[key]
    };
  });
  return diff;
};

// Export for testing
module.exports = {
  deepClone,
  deepEqual,
  transformObject,
  validateObject,
  deepMerge,
  objectDiff
};
