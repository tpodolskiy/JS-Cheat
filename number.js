//! Common Number Operations & Utilities for SDET Interviews

//! Built-in Number Methods Quick Reference
/*
 * Number Properties
 * Number.MAX_VALUE      - Largest number: 1.79E+308
 * Number.MIN_VALUE      - Smallest number: 5E-324
 * Number.POSITIVE_INFINITY  - Infinity
 * Number.NEGATIVE_INFINITY  - -Infinity
 * Number.NaN            - Not a Number
 * 
 * Parsing & Conversion
 * parseInt(str, base)   - String to integer: parseInt("123", 10)      // 123
 * parseFloat(str)       - String to float: parseFloat("123.45")       // 123.45
 * Number(value)         - Convert to number: Number("123")            // 123
 * .toString(base)       - Number to string: (123).toString()          // "123"
 * 
 * Math Object Methods
 * Math.round()         - Round to nearest: Math.round(123.45)        // 123
 * Math.floor()         - Round down: Math.floor(123.45)              // 123
 * Math.ceil()          - Round up: Math.ceil(123.45)                 // 124
 * Math.abs()           - Absolute value: Math.abs(-123)              // 123
 * Math.min(...nums)    - Find minimum: Math.min(1, 2, 3)            // 1
 * Math.max(...nums)    - Find maximum: Math.max(1, 2, 3)            // 3
 * Math.random()        - Random [0,1): Math.random()                 // 0.123...
 * 
 * Example:
 * const num = 123.456;
 * num.toFixed(2);                    // "123.46"
 * num.toPrecision(4);                // "123.5"
 * Math.floor(Math.random() * 10);    // 0-9
 */

//! 1. Number Validation
const isInteger = num => Number.isInteger(num);

const isFloat = num => Number(num) === num && num % 1 !== 0;

const isNumeric = str => !isNaN(parseFloat(str)) && isFinite(str);

const inRange = (num, min, max) => num >= min && num <= max;

//! 2. Number Formatting
const round = (num, decimals = 2) => 
  Number(Math.round(num + 'e' + decimals) + 'e-' + decimals);

const toCurrency = (num, currency = 'USD', locale = 'en-US') => 
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(num);

const withSeparators = (num, locale = 'en-US') => 
  new Intl.NumberFormat(locale).format(num);

//! 3. Mathematical Operations
const gcd = (a, b) => {
  while (b) [a, b] = [b, a % b];
  return Math.abs(a);
};

const lcm = (a, b) => Math.abs(a * b) / gcd(a, b);

const random = (min, max) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

const isPrime = num => {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
};

//! 4. Binary Operations
const toBinary = num => num.toString(2);

const fromBinary = bin => parseInt(bin, 2);

const countSetBits = num => {
  let count = 0;
  while (num) {
    count += num & 1;
    num >>= 1;
  }
  return count;
};

const isPowerOfTwo = num => num > 0 && (num & (num - 1)) === 0;

//! 5. Statistics Operations
const mean = arr => arr.reduce((sum, val) => sum + val, 0) / arr.length;

const median = arr => {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? 
    sorted[mid] : 
    (sorted[mid - 1] + sorted[mid]) / 2;
};

const stdDev = arr => {
  const meanVal = mean(arr);
  const variance = arr.reduce((sum, val) => 
    sum + Math.pow(val - meanVal, 2), 0) / arr.length;
  return Math.sqrt(variance);
};

//! Export for testing
module.exports = {
  isInteger,
  isFloat,
  isNumeric,
  inRange,
  round,
  toCurrency,
  withSeparators,
  gcd,
  lcm,
  random,
  isPrime,
  toBinary,
  fromBinary,
  countSetBits,
  isPowerOfTwo,
  mean,
  median,
  stdDev
}; 