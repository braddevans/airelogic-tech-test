const {nhs_number_validator, valid_postcode} = require('../utils/SharedFunctions.js');

class Patient {

  constructor(nhs_number, name, date_of_birth, postcode) {
    this.nhs_number = nhs_number;
    this.name = name;
    this.date_of_birth = date_of_birth;
    this.postcode = postcode;
    this.horrifics = ["mr","mrs","miss","ms","dr","admiral","ambassador","baron","baroness","brigadier","brother","canon","capt","chief","cllr","col","commander","consul","consul general","count","countess","cpl","dame","deputy","drs","duchess","duke","earl","father","general","gräfin","judge","justice","lady","llc","lord","madam","madame","major","marchioness","marquis","minister","prince","princess","professor","prof","sheriff","sir","viscount"]
  }

  get_nhs_number() {
    return this.nhs_number;
  }

  get_full_name() {
    return this.name;
  }

  get_first_name() {
    if (this.horrifics.includes(this.name.split(" ")[0].toLocaleLowerCase())) {
      return this.name.split(" ")[1];
    } else {
      return this.name.split(" ")[0];
    }
  }

  get_last_name() {
    return this.name.split(" ")[this.name.split(" ").length - 1];
  }

  get_date_of_birth() {
    return this.date_of_birth;
  }

  get_postcode() {
    return this.postcode;
  }

  nhs_number_valid() {
    return nhs_number_validator(this.nhs_number);
  }

  postcode_valid() {
    return valid_postcode(this.postcode);
  }

  to_json() {
    return {
      "nhs_number": this.nhs_number,
      "nhs_number_valid": this.nhs_number_valid(),
      "full_name": this.name,
      "first_name": this.get_first_name(),
      "last_name": this.get_last_name(),
      "date_of_birth": this.date_of_birth,
      "postcode": this.postcode,
      "postcode_valid": this.postcode_valid()
    }
  }

  tests() {
    return {
      "first_name": this.get_first_name(),
      "last_name": this.get_last_name(),
      "nhs_number_valid": this.nhs_number_valid(),
      "postcode_valid": this.postcode_valid()
    }
  }
}

module.exports = Patient;