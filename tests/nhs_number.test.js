const test = require('test');
const assert = require('assert');


const {nhs_number_validator} = require('../utils/SharedFunctions.js');

// This test passes because it does not throw an exception.
test("validate 0021403597", async (t) => {
  console.log("is_valid: " + await nhs_number_validator('0021403597'));
  assert.equal(await nhs_number_validator('0021403597'), true);
})

test("validate 1953262716", async (t) => {
  console.log("is_valid: " + await nhs_number_validator('1953262716'));
  assert.equal(await nhs_number_validator('1953262716'), true);
})

test("validate 1373645350", async (t) => {
  console.log("is_valid: " + await nhs_number_validator('1373645350'));
  assert.equal(await nhs_number_validator('1373645350'), true);
})

test("validate 0240288238", async (t) => {
  console.log("is_valid: " + await nhs_number_validator('0240288238'));
  assert.equal(await nhs_number_validator('0240288238'), true);
})

test("validate 0699052556", async (t) => {
  console.log("is_valid: " + await nhs_number_validator('0699052556'));
  assert.equal(await nhs_number_validator('0699052556'), true);
})

test("validate 0544469364", async (t) => {
  console.log("is_valid: " + await nhs_number_validator('0544469364'));
  assert.equal(await nhs_number_validator('0544469364'), true);
})