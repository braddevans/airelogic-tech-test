const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(`mongodb://${process.env.DATABASE_PASSWORD}:${process.env.DATABASE_USERNAME}@${process.env.DATABASE_HOSTNAME}:${process.env.DATABASE_PORT}/auth_users`,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;
const Patients = new Schema({
  name: {
    type: String,
    required: true
  },
  date_of_birth: {
    type: String,
    required: true
  },
  postcode: {
    type: String,
    required: true
  },
  nhs_number: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Patients', Patients);