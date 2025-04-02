//! Common String Operations & Utilities for SDET Interviews

//! Built-in String Methods Quick Reference
/*
 * Length & Access
 * length            - Get string length: str.length
 * charAt(pos)       - Get char at position: str.charAt(0) or str[0]
 * charCodeAt(pos)   - Get char code: str.charCodeAt(0)
 * 
 * Searching
 * indexOf(str)      - Find first occurrence: "hello".indexOf('l')     // 2
 * lastIndexOf(str)  - Find last occurrence: "hello".lastIndexOf('l')  // 3
 * includes(str)     - Check if contains: "hello".includes('lo')       // true
 * startsWith(str)   - Check start: "hello".startsWith('he')          // true
 * endsWith(str)     - Check end: "hello".endsWith('lo')              // true
 * 
 * Transforming
 * toLowerCase()     - Convert to lowercase: "Hello".toLowerCase()      // "hello"
 * toUpperCase()     - Convert to uppercase: "hello".toUpperCase()      // "HELLO"
 * trim()           - Remove whitespace: " hello ".trim()              // "hello"
 * replace(a, b)    - Replace first match: "hello".replace('l', 'w')   // "hewlo"
 * replaceAll(a, b) - Replace all matches: "hello".replaceAll('l', 'w')// "hewwo"
 * 
 * Extracting
 * slice(start, end) - Extract substring: "hello".slice(1, 4)          // "ell"
 * substring(s, e)   - Extract substring: "hello".substring(1, 4)      // "ell"
 * split(separator)  - Split to array: "h-e-l-l-o".split('-')         // ["h","e","l","l","o"]
 * 
 * Example:
 * const str = "Hello, World!";
 * str.toLowerCase();                    // "hello, world!"
 * str.includes("World");               // true
 * str.split(", ");                     // ["Hello", "World!"]
 * str.replace("World", "JavaScript");  // "Hello, JavaScript!"
 */

//! 1. String Reversal
const reverseSimple = str => str.split('').reverse().join('');

const reverseManual = str => {
  let result = '';
  for (let i = str.length - 1; i >= 0; i--) result += str[i];
  return result;
};

//! 2. Palindrome Check
const isPalindrome = str => {
  str = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return str === str.split('').reverse().join('');
};

//! 3. Anagram Check
const areAnagrams = (str1, str2) => {
  const normalize = str => str.toLowerCase().replace(/[^a-z0-9]/g, '').split('').sort().join('');
  return normalize(str1) === normalize(str2);
};

//! 4. String Pattern Matching
const countOccurrences = (str, pattern) => 
  (str.match(new RegExp(pattern, 'g')) || []).length;

const findIndices = (str, pattern) => {
  const indices = [];
  let pos = str.indexOf(pattern);
  while (pos !== -1) {
    indices.push(pos);
    pos = str.indexOf(pattern, pos + 1);
  }
  return indices;
};

//! 5. String Compression
const compress = str => {
  if (!str) return '';
  let count = 1, result = '', char = str[0];
  for (let i = 1; i <= str.length; i++) {
    if (str[i] === char) count++;
    else {
      result += char + (count > 1 ? count : '');
      char = str[i];
      count = 1;
    }
  }
  return result.length < str.length ? result : str;
};

//! 6. Longest Common Substring
const longestCommonSubstring = (str1, str2) => {
  const dp = Array(str1.length + 1).fill().map(() => Array(str2.length + 1).fill(0));
  let maxLength = 0, endPos = 0;
  
  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      if (str1[i-1] === str2[j-1]) {
        dp[i][j] = dp[i-1][j-1] + 1;
        if (dp[i][j] > maxLength) {
          maxLength = dp[i][j];
          endPos = i;
        }
      }
    }
  }
  return str1.slice(endPos - maxLength, endPos);
};

//! Export for testing
module.exports = {
  reverseSimple,
  reverseManual,
  isPalindrome,
  areAnagrams,
  countOccurrences,
  findIndices,
  compress,
  longestCommonSubstring
};

