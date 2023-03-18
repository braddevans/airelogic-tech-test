'use strict';

const SharedFunctions = {};

SharedFunctions.nhs_multipliers = {
  '1': 10,
  '2': 9,
  '3': 8,
  '4': 7,
  '5': 6,
  '6': 5,
  '7': 4,
  '8': 3,
  '9': 2,
}

// a
SharedFunctions.nhs_number_validator = (nhs_number) => {
  if (SharedFunctions.is_valid_nhs_number(nhs_number)) {
    let current_number = 0;
    let current_sum = 0;
    let current_multiplier = 0;
    let checkNumber = parseInt(nhs_number.charAt(9))
    let remainder = 0;
    let total = 0;

    for (let i = 0; i <= 8; i++) {
      current_number = parseInt(nhs_number.charAt(i));
      current_multiplier = parseInt(SharedFunctions.nhs_multipliers[i + 1]);
      current_sum = current_sum + (current_number * current_multiplier);
    }

    remainder = current_sum % 11;
    total = 11 - remainder;
    SharedFunctions.log_debug("nhs_number_validator: nhs_number: " + nhs_number + ", current_sum: " + current_sum + ", checkNumber: " + checkNumber + ", remainder: " + remainder + ", total: " + total);

    switch (total) {
      case 11:
        total = 0;
        break;
      case 10:
        return false;
    }
    return total === checkNumber;
  }
}

SharedFunctions.is_valid_nhs_number = (nhs_number) => {
  console.log("is_valid_nhs_number: nhs_number: " + nhs_number + ", length: " + nhs_number.length);
  return nhs_number.length === 10;
}

SharedFunctions.log_debug = (...args) => {
    console.log(...args);
}

module.exports = SharedFunctions;