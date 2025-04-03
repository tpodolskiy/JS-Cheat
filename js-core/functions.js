//! Common Function Patterns & Concepts for SDET Interviews

//! Function Types & Declarations Quick Reference
/*
 * Function Declaration:
 * function name(params) { body }
 * - Hoisted, can be called before declaration
 * 
 * Function Expression:
 * const name = function(params) { body };
 * - Not hoisted, must be defined before calling
 * 
 * Arrow Function:
 * const name = (params) => { body }; or const name = param => expression;
 * - No 'this' binding, no arguments object, no prototype, can't be used as constructor
 * 
 * Method:
 * const obj = { name(params) { body } };
 * - Shorthand syntax for object methods
 * 
 * IIFE (Immediately Invoked Function Expression):
 * (function() { body })();
 * - Executes immediately, creates closure scope
 * 
 * Generator Function:
 * function* name() { yield value; }
 * - Returns Generator object, can be iterated with yield
 * 
 * Async Function:
 * async function name() { await promise; }
 * - Returns Promise, can use await inside
 */

//! 1. Function Scope & Closure
// Closure example - function with private state
const createCounter = (initialValue = 0) => {
  let count = initialValue;
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count,
    reset: () => { count = initialValue; return count; }
  };
};

// Module pattern - encapsulation with IIFE
const calculator = (() => {
  // Private variables
  const privateValue = 10;
  
  // Private functions
  const square = x => x * x;
  
  // Public API
  return {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,
    // Using private function
    squareSum: (a, b) => square(a + b)
  };
})();

//! 2. Function Currying & Partial Application
// Currying - transform function with multiple args to sequence of functions
const curry = (fn) => {
  const arity = fn.length;
  
  return function curried(...args) {
    if (args.length >= arity) {
      return fn.apply(this, args);
    }
    
    return function(...moreArgs) {
      return curried.apply(this, [...args, ...moreArgs]);
    };
  };
};

// Partial application - pre-fill arguments
const partial = (fn, ...presetArgs) => {
  return function(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
};

//! 3. Function Composition & Piping
// Compose - execute functions right to left
const compose = (...fns) => 
  fns.reduce((f, g) => (...args) => f(g(...args)));

// Pipe - execute functions left to right
const pipe = (...fns) => 
  fns.reduce((f, g) => (...args) => g(f(...args)));

//! 4. This Keyword & Binding
const thisBindingExample = {
  // Different ways to handle 'this'
  methods: {
    // 1. Method context
    regularMethod() {
      return this; // 'this' is the object when called as method
    },
    
    // 2. Arrow function retains parent context
    arrowMethod: () => this, // 'this' is from enclosing lexical context
    
    // 3. Explicit binding with bind/call/apply
    withBindCallApply() {
      const standalone = function() { return this; };
      
      // Call with this as first arg, remaining args as list
      const withCall = standalone.call({name: 'call context'});
      
      // Apply with this as first arg, args as array
      const withApply = standalone.apply({name: 'apply context'}, []);
      
      // Bind returns new function with fixed this
      const withBind = standalone.bind({name: 'bind context'})();
      
      return { withCall, withApply, withBind };
    }
  }
};

//! 5. Memoization 
const memoize = (fn) => {
  const cache = new Map();
  
  return (...args) => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

//! 6. Higher-Order Functions
const higherOrderFunctions = {
  // Function that takes function as argument
  map: (arr, fn) => arr.map(fn),
  
  // Function that returns a function
  debounce: (fn, delay) => {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), delay);
    };
  },
  
  // Function that both takes and returns a function
  compose: (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x),
  
  // Function wrapper
  withLogging: (fn) => {
    return function(...args) {
      console.log(`Calling with args: ${args}`);
      const result = fn.apply(this, args);
      console.log(`Result: ${result}`);
      return result;
    };
  }
};

//! Export for testing
module.exports = {
  createCounter,
  calculator,
  curry,
  partial,
  compose,
  pipe,
  thisBindingExample,
  memoize,
  higherOrderFunctions
}; 