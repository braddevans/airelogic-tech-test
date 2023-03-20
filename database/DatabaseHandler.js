const dotenv = require('dotenv');
const {Sequelize, Op, Model, DataTypes} = require('sequelize');
const {initModels} = require("./init-models");
dotenv.config();

class DatabaseHandler {
  constructor() {
    this.sequelize = this.create_connection();
    // init the database, create table where doesn't exist
    const {appointments, auth_users, patients} = initModels(this.sequelize);

    this.appointments = appointments;
    this.auth_users = auth_users;
    this.patients = patients;
  }

  async sync_database() {
    this.auth_users.sync({force: false})
    this.patients.sync({force: false})
    this.appointments.sync({force: false})
  }

  create_connection() {
    return new Sequelize(process.env.DATABASE_DATABASE, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
      host: process.env.DATABASE_HOSTNAME,
      port: process.env.DATABASE_PORT,
      dialect: "mysql",

      logging: (...msg) => console.log(msg),
    });
  }

  async get_connection() {
    try {
      await this.sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  get_patient_model() {
    return this.patients;
  }

  get_appointment_model() {
    return this.appointments;
  }

  get_authuser_model() {
    return this.auth_users;
  }

}

module.exports = DatabaseHandler;