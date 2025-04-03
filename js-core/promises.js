//! Common Promise & Async Operations for SDET Interviews

//! Built-in Promise Methods Quick Reference
/*
 * Creation
 * new Promise((resolve, reject) => {}) - Create new Promise
 * Promise.resolve(value)              - Create resolved Promise
 * Promise.reject(error)               - Create rejected Promise
 * 
 * Chaining
 * then(onFulfilled, onRejected)       - Handle resolved/rejected: promise.then(val => {}, err => {})
 * catch(onRejected)                   - Handle rejection: promise.catch(err => {})
 * finally(onFinally)                  - Run regardless: promise.finally(() => {})
 * 
 * Composition
 * Promise.all(iterable)               - Wait for all promises: Promise.all([p1, p2])
 * Promise.allSettled(iterable)        - Wait for all settled: Promise.allSettled([p1, p2])
 * Promise.race(iterable)              - First to resolve/reject: Promise.race([p1, p2])
 * Promise.any(iterable)               - First to resolve: Promise.any([p1, p2])
 * 
 * Example:
 * const fetchData = () => new Promise((resolve, reject) => {
 *   setTimeout(() => resolve('Data fetched'), 1000);
 * });
 * 
 * fetchData()
 *   .then(data => console.log(data))
 *   .catch(err => console.error(err));
 * 
 * // With async/await
 * async function getData() {
 *   try {
 *     const data = await fetchData();
 *     console.log(data);
 *   } catch (err) {
 *     console.error(err);
 *   }
 * }
 */

//! 1. Common Promise Patterns
const promisePatterns = {
  // Sequential Promise execution
  sequential: async (promiseFns) => {
    const results = [];
    for (const fn of promiseFns) {
      results.push(await fn());
    }
    return results;
  },
  
  // Retry Promise with backoff
  retry: async (promiseFn, maxRetries = 3, delay = 1000) => {
    let lastError;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await promiseFn();
      } catch (error) {
        lastError = error;
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
    
    throw lastError;
  },
  
  // Execute with timeout
  withTimeout: (promiseFn, ms) => {
    return Promise.race([
      promiseFn(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Operation timed out')), ms)
      )
    ]);
  }
};

//! 2. Async Iterator Helpers
const asyncIterators = {
  // Map for async iterables
  map: async function* (asyncIterable, mapFn) {
    for await (const item of asyncIterable) {
      yield mapFn(item);
    }
  },
  
  // Filter for async iterables
  filter: async function* (asyncIterable, filterFn) {
    for await (const item of asyncIterable) {
      if (await filterFn(item)) {
        yield item;
      }
    }
  },
  
  // Reduce for async iterables
  reduce: async (asyncIterable, reducerFn, initialValue) => {
    let accumulator = initialValue;
    for await (const item of asyncIterable) {
      accumulator = await reducerFn(accumulator, item);
    }
    return accumulator;
  }
};

//! 3. Mock & Test Utilities for Promises
const testUtils = {
  // Create a controllable promise
  deferred: () => {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  },
  
  // Create a mock for response
  mockResponse: (data, delay = 0) => {
    return new Promise(resolve => 
      setTimeout(() => resolve(data), delay)
    );
  },
  
  // Create a mock for error
  mockError: (message, delay = 0) => {
    return new Promise((_, reject) => 
      setTimeout(() => reject(new Error(message)), delay)
    );
  }
};

//! 4. Common Promise Transformations
const promiseUtils = {
  // Convert callback to promise
  promisify: (fn) => {
    return (...args) => {
      return new Promise((resolve, reject) => {
        fn(...args, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    };
  },
  
  // Throttle promise function
  throttle: (promiseFn, limit) => {
    const queue = [];
    let activeCount = 0;
    
    const executeNext = () => {
      if (queue.length === 0 || activeCount >= limit) return;
      
      const { promiseFn, args, resolve, reject } = queue.shift();
      activeCount++;
      
      promiseFn(...args)
        .then(result => {
          resolve(result);
          activeCount--;
          executeNext();
        })
        .catch(err => {
          reject(err);
          activeCount--;
          executeNext();
        });
    };
    
    return (...args) => {
      return new Promise((resolve, reject) => {
        queue.push({ promiseFn, args, resolve, reject });
        executeNext();
      });
    };
  }
};

//! 5. Common Async Patterns in Testing
const testPatterns = {
  // Wait for condition to be true
  waitForCondition: async (condition, timeout = 5000, interval = 100) => {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      if (await condition()) return true;
      await new Promise(r => setTimeout(r, interval));
    }
    throw new Error('Condition not met within timeout');
  },
  
  // Poll until result matches expected
  pollUntilMatch: async (promiseFn, expectedValue, timeout = 5000, interval = 100) => {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      const result = await promiseFn();
      if (result === expectedValue) return result;
      await new Promise(r => setTimeout(r, interval));
    }
    throw new Error('Expected value not received within timeout');
  }
};

//! Export for testing
module.exports = {
  promisePatterns,
  asyncIterators,
  testUtils,
  promiseUtils,
  testPatterns
}; 