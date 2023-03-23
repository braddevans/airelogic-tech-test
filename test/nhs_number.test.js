const assert = require('assert');


const {nhs_number_validator} = require('../utils/SharedFunctions.js');
const {describe, it} = require("test");

// This test passes because it does not throw an exception.
describe('NHS Number Test #1', function () {
  const nhs_number = '0162509243';
  it('check valid nhs number', async function () {
    assert.equal(await nhs_number_validator(nhs_number), true);
  });
});