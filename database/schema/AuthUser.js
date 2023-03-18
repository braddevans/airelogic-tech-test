const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(`mongodb://${process.env.DATABASE_PASSWORD}:${process.env.DATABASE_USERNAME}@${process.env.DATABASE_HOSTNAME}:${process.env.DATABASE_PORT}/auth_users`,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;

// todo: switch to internal oauth passport strategy
const AuthUser = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  // make bcrypt
  password: {
    type: String,
    required: true
  },

  // will be changed on every login
  // on login will set cookie with auth
  authorised_jwt_token: {
    type: String,
    required: true,
    unique: true
  }
});
module.exports = mongoose.model('AuthUser', AuthUser);