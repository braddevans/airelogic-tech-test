'use strict';
const SharedFunctions = {};
const dotenv = require('dotenv');
dotenv.config();

SharedFunctions.nhs_multipliers = {'1': 10, '2': 9, '3': 8, '4': 7, '5': 6, '6': 5, '7': 4, '8': 3, '9': 2,}

// a
SharedFunctions.nhs_number_validator = (nhs_number) => {
  const number = String(nhs_number);
  if (SharedFunctions.is_valid_nhs_number(number)) {
    let current_number = 0;
    let current_sum = 0;
    let current_multiplier = 0;
    let checkNumber = parseInt(number.charAt(9))
    let remainder = 0;
    let total = 0;

    for (let i = 0; i <= 8; i++) {
      current_number = parseInt(number.charAt(i));
      current_multiplier = parseInt(SharedFunctions.nhs_multipliers[i + 1]);
      current_sum = current_sum + (current_number * current_multiplier);
    }

    remainder = current_sum % 11;
    total = 11 - remainder;
    SharedFunctions.log_debug("nhs_number_validator: nhs_number: " + number + ", current_sum: " + current_sum + ", checkNumber: " + checkNumber + ", remainder: " + remainder + ", total: " + total);

    switch (total) {
      case 11:
        total = 0;
        break;
      case 10:
        return false;
    }
    return total === checkNumber;
  } else {
    return false;
  }
}

SharedFunctions.is_valid_nhs_number = (nhs_number) => {
  console.log("is_valid_nhs_number: nhs_number: " + nhs_number + ", length: " + nhs_number.length);
  return nhs_number.length === 10;
}

SharedFunctions.valid_postcode = (postcode) => {
  // https://stackoverflow.com/questions/13969461/javascript-uk-postcode-validation
  // post from 11 years ago
  postcode = postcode.replace(/\s/g, "");

  // updated from a comment in 2016
  const regex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]{0,1} ?[0-9][A-Z]{2}$/i;

  return regex.test(postcode);
}

SharedFunctions.log_debug = (...args) => {
  if (process.env.DEBUG) {
    console.log(...args);
  }
}

module.exports = SharedFunctions;