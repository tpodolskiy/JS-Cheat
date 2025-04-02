//! Common Regex Operations & Utilities for SDET Interviews

//! Built-in RegExp Methods & Properties Quick Reference
/*
 * RegExp Creation
 * new RegExp(pattern, flags) - Dynamic: new RegExp('hello', 'gi')
 * /pattern/flags            - Literal: /hello/gi
 * 
 * Flags
 * g - Global search         - Match all occurrences
 * i - Case-insensitive     - Ignore case
 * m - Multiline           - ^ and $ match line starts/ends
 * s - Dot all            - . matches newlines
 * u - Unicode            - Enable Unicode features
 * y - Sticky             - Match from lastIndex only
 * 
 * Methods
 * test(str)     - Check if matches: /test/.test('testing')     // true
 * exec(str)     - Find match with details: /t(e)(st)/.exec('test') // ['test', 'e', 'st']
 * match(regex)  - String method: 'test'.match(/t/g)           // ['t', 't']
 * search(regex) - Find position: 'test'.search(/s/)           // 2
 * replace(regex)- Replace matches: 'test'.replace(/t/g, 'b')  // 'besb'
 * split(regex)  - Split string: 'a,b;c'.split(/[,;]/)        // ['a', 'b', 'c']
 * 
 * Properties
 * lastIndex    - Position after last match (with g flag)
 * source       - Pattern text
 * flags        - Active flags
 * 
 * Common Patterns
 * \\d         - Digit: [0-9]
 * \\w         - Word char: [A-Za-z0-9_]
 * \\s         - Whitespace
 * [abc]       - Character class
 * [^abc]      - Negated class
 * a|b         - Alternation
 * ?           - Optional (0 or 1)
 * *           - Zero or more
 * +           - One or more
 * {n}         - Exactly n
 * {n,}        - n or more
 * {n,m}       - Between n and m
 * 
 * Example:
 * const regex = /(\w+)@(\w+)\.(\w+)/;
 * const email = 'test@example.com';
 * const match = email.match(regex);  // ['test@example.com', 'test', 'example', 'com']
 * email.replace(regex, '$1 at $2 dot $3');  // 'test at example dot com'
 */

//! Common Regex Patterns & Utilities for SDET Interviews

//! 1. Common Validation Patterns
const patterns = {
  //! Email validation
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  
  //! URL validation
  url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
  
  //! Phone number (US format)
  phone: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
  
  //! Password strength (min 8 chars, 1 upper, 1 lower, 1 number)
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  
  //! Date (YYYY-MM-DD)
  date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
  
  //! Time (HH:MM:SS)
  time: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
  
  //! IPv4 address
  ipv4: /^(\d{1,3}\.){3}\d{1,3}$/
};

//! 2. Regex Validation Functions
const validate = {
  //! Test if string matches pattern
  test: (str, pattern) => pattern.test(str),
  
  //! Get all matches in string
  getMatches: (str, pattern) => {
    const matches = [];
    let match;
    while ((match = pattern.exec(str)) !== null) {
      matches.push(match[0]);
    }
    return matches;
  },
  
  //! Count matches in string
  countMatches: (str, pattern) => 
    (str.match(new RegExp(pattern, 'g')) || []).length
};

//! 3. String Manipulation with Regex
const manipulate = {
  //! Replace all occurrences
  replaceAll: (str, find, replace) => 
    str.replace(new RegExp(find, 'g'), replace),
  
  //! Remove all whitespace
  removeWhitespace: str => 
    str.replace(/\s+/g, ''),
  
  //! Extract numbers from string
  extractNumbers: str => 
    str.match(/\d+/g) || [],
  
  //! Sanitize string (remove special chars)
  sanitize: str => 
    str.replace(/[^a-zA-Z0-9]/g, '')
};

//! 4. Common Test Data Patterns
const testPatterns = {
  //! Credit card number
  creditCard: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})$/,
  
  //! Social security number
  ssn: /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/,
  
  //! ZIP code
  zipCode: /^\d{5}(-\d{4})?$/,
  
  //! HTML tag
  htmlTag: /<[^>]*>/g
};

//! 5. Regex Test Helper
class RegexTester {
  constructor(pattern) {
    this.pattern = pattern;
  }

  test(str) {
    return {
      isMatch: this.pattern.test(str),
      matches: str.match(this.pattern) || [],
      groups: str.match(this.pattern)?.groups || {}
    };
  }

  replace(str, replacement) {
    return str.replace(this.pattern, replacement);
  }

  split(str) {
    return str.split(this.pattern);
  }
}

//! Export for testing
module.exports = {
  patterns,
  validate,
  manipulate,
  testPatterns,
  RegexTester
}; 