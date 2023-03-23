const expect = require('chai').expect;
const assert = require('assert');

const Patient = require('../objects/Patient.js');
const {valid_postcode, nhs_number_validator} = require("../utils/SharedFunctions");
const {describe, it} = require("test");

// data used in tests
// /database/example_data/example_patients.json


describe('validate patient', function () {
  const nhs_number = '0699052556';
  const patient_object = new Patient(nhs_number, "Bob Kat", "2022-12-12", "M3 1GT")
  it('check valid postcode', async function () {
    //console.log("patient: ", patient_object.to_json());
    expect(await valid_postcode(patient_object.postcode)).to.be.true;
  });

  it('check valid nhs number', async function () {
    //console.log("patient: ", patient_object.to_json());
    expect(await nhs_number_validator(patient_object.nhs_number)).to.be.true;
  })
});



describe('validate non EBCDIC patient name', function () {
  const nhs_number = '0738835919';
  const non_ebcdic_patient_name = "आरव डार";
  const patient_object = new Patient(nhs_number, non_ebcdic_patient_name, "1920-07-17", "BS1M 9US")
  it('check valid postcode', async function () {
    //console.log("patient: ", patient_object.to_json());
    expect(await valid_postcode(patient_object.postcode)).to.be.true;
  });

  it('check valid nhs number', async function () {
    //console.log("patient: ", patient_object.to_json());
    expect(await nhs_number_validator(patient_object.nhs_number)).to.be.true;
  })

  it("validate name eq", async function () {
    expect(patient_object.name === non_ebcdic_patient_name).to.be.true;
  })
});