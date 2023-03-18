const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(`mongodb://${process.env.DATABASE_PASSWORD}:${process.env.DATABASE_USERNAME}@${process.env.DATABASE_HOSTNAME}:${process.env.DATABASE_PORT}/appointments`,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;
const Appointments = new Schema({
  id: {
    type: Number,
    required: true
  },
  patient: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  clinician: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  postcode: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Patients', Appointments);