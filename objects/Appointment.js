const {nhs_number_validator, valid_postcode} = require('../utils/SharedFunctions.js');
const { v4: uuidv4 } = require('uuid');

class Appointment {

  constructor(id, patient, status, time, duration, clinician, department, postcode) {
    this.id = id;
    this.patient = patient;
    this.status = status;
    this.time = time;
    this.duration = duration;
    this.clinician = clinician;
    this.department = department;
    this.postcode = postcode;

    if (this.id === null) {
      this.id = this.generate_id();
    }

    this.update_status();
  }

  generate_id() {
    return String(uuidv4());
  }

  get_postcode() {
    return this.postcode;
  }

  update_status() {
    const date = Date.parse(this.time)
    if (["attended", "cancelled"].includes(this.status)) {
      return false;
    } else {
      if (date < Date.now()) {
        this.status = "missed";
        return false;
      } else if (date > Date.now()) {
        this.status = "pending";
        return true;
      }
    }
  }

  to_json() {
    return {
      id: this.id,
      patient: this.patient,
      status: this.status,
      time: this.time,
      duration: this.duration,
      clinician: this.clinician,
      department: this.department,
      postcode: this.postcode
    }
  }

  tests() {
    return {
      "postcode_valid": valid_postcode(this.postcode)
    }
  }
}

module.exports = Appointment;