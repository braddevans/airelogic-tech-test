const test = require('test');
const assert = require('assert');

const Patient = require('../objects/Patient.js');

// data used in tests
// /database/example_data/example_patients.json

test("validate patient with nhs_number: 0021403597", async (t) => {
  const patient_object = new Patient('0699052556', "Bob Kat", "2022-12-12", "M3 1GT")
  //console.log("patient: ", patient_object.to_json());
  assert.equal(patient_object.postcode_valid(), true);
  assert.equal(patient_object.nhs_number_valid(), true);
})

test("validate patient with nhs_number: 0738835919 and non EBCDIC name", async (t) => {
  const patient_object = new Patient('0738835919', "आरव डार", "1920-07-17", "BS1M 9US")
  //console.log("patient: ", patient_object.to_json());
  assert.equal(patient_object.postcode_valid(), true);
  assert.equal(patient_object.nhs_number_valid(), true);
})