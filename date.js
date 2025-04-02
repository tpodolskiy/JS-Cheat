// Common Date Operations & Utilities for SDET Interviews

// Built-in Date Methods & Properties Quick Reference
/*
 * Date Creation
 * new Date()           - Current date/time
 * new Date(timestamp)  - From milliseconds: new Date(1234567890000)
 * new Date(dateString) - From string: new Date('2024-03-21')
 * new Date(y, m, d)    - From components: new Date(2024, 2, 21)
 * 
 * Getting Components (returns number)
 * getFullYear()     - Year: 2024
 * getMonth()        - Month: 0-11 (Jan=0)
 * getDate()         - Day of month: 1-31
 * getDay()          - Day of week: 0-6 (Sun=0)
 * getHours()        - Hours: 0-23
 * getMinutes()      - Minutes: 0-59
 * getSeconds()      - Seconds: 0-59
 * getMilliseconds() - Milliseconds: 0-999
 * getTime()         - Milliseconds since 1970
 * 
 * Setting Components (returns new timestamp)
 * setFullYear(y)    - Set year
 * setMonth(m)       - Set month
 * setDate(d)        - Set day
 * setHours(h)       - Set hours
 * setMinutes(m)     - Set minutes
 * setSeconds(s)     - Set seconds
 * setMilliseconds(ms)- Set milliseconds
 * setTime(timestamp)- Set from milliseconds
 * 
 * Formatting
 * toString()        - "Thu Mar 21 2024 12:00:00"
 * toDateString()    - "Thu Mar 21 2024"
 * toTimeString()    - "12:00:00 GMT+0000"
 * toISOString()     - "2024-03-21T12:00:00.000Z"
 * toUTCString()     - "Thu, 21 Mar 2024 12:00:00 GMT"
 * toLocaleString()  - Locale-specific format
 * 
 * Static Methods
 * Date.now()        - Current timestamp
 * Date.parse()      - Parse date string
 * Date.UTC()        - Get UTC timestamp
 * 
 * Example:
 * const now = new Date();
 * now.getFullYear();                    // 2024
 * now.setDate(now.getDate() + 1);       // Add one day
 * now.toLocaleDateString('en-US');      // "3/21/2024"
 * Date.now() - now.getTime();           // Milliseconds elapsed
 */

// 1. Date Formatting
const dateFormat = {
  // Format date to string
  format: (date, locale = 'en-US', options = {}) => 
    new Intl.DateTimeFormat(locale, options).format(date),
  
  // Format with custom pattern
  pattern: (date, pattern) => {
    const map = {
      MM: String(date.getMonth() + 1).padStart(2, '0'),
      dd: String(date.getDate()).padStart(2, '0'),
      yyyy: date.getFullYear(),
      HH: String(date.getHours()).padStart(2, '0'),
      mm: String(date.getMinutes()).padStart(2, '0'),
      ss: String(date.getSeconds()).padStart(2, '0')
    };
    return pattern.replace(/MM|dd|yyyy|HH|mm|ss/g, matched => map[matched]);
  },
  
  // ISO string without timezone
  toISOLocal: date => {
    const offset = date.getTimezoneOffset();
    const z = n => ('0' + n).slice(-2);
    return date.getFullYear() + '-' 
      + z(date.getMonth() + 1) + '-' 
      + z(date.getDate()) + 'T' 
      + z(date.getHours()) + ':' 
      + z(date.getMinutes()) + ':' 
      + z(date.getSeconds());
  }
};

// 2. Date Manipulation
const dateManip = {
  // Add days to date
  addDays: (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },
  
  // Add months to date
  addMonths: (date, months) => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  },
  
  // Start of day
  startOfDay: date => {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
  },
  
  // End of day
  endOfDay: date => {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
  }
};

// 3. Date Comparison
const dateCompare = {
  // Check if dates are same day
  isSameDay: (date1, date2) => 
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate(),
  
  // Get difference in days
  diffInDays: (date1, date2) => 
    Math.round((date2 - date1) / (1000 * 60 * 60 * 24)),
  
  // Check if date is between
  isBetween: (date, start, end) => 
    date >= start && date <= end,
  
  // Check if date is weekend
  isWeekend: date => {
    const day = date.getDay();
    return day === 0 || day === 6;
  }
};

// 4. Date Validation
const dateValidation = {
  // Check if valid date
  isValid: date => 
    date instanceof Date && !isNaN(date),
  
  // Check if leap year
  isLeapYear: year => 
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0,
  
  // Parse date with validation
  parseDate: str => {
    const date = new Date(str);
    return dateValidation.isValid(date) ? date : null;
  }
};

// 5. Date Mock for Testing
class DateMock {
  constructor(fixedDate = new Date()) {
    this.fixedDate = fixedDate;
  }

  now() {
    return this.fixedDate.getTime();
  }

  setFixedDate(date) {
    this.fixedDate = date;
  }

  addDays(days) {
    this.fixedDate = dateManip.addDays(this.fixedDate, days);
  }

  restore() {
    this.fixedDate = new Date();
  }
}

// Export for testing
module.exports = {
  dateFormat,
  dateManip,
  dateCompare,
  dateValidation,
  DateMock
}; 