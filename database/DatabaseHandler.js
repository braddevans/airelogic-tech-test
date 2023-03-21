const dotenv = require('dotenv');
const {Sequelize, Op, Model, DataTypes} = require('sequelize');
const {initModels} = require("./init-models");
dotenv.config();

class DatabaseHandler {
  constructor() {
    this.sequelize = this.create_connection();
    // init the database, create table where doesn't exist
    const {appointments, patients} = initModels(this.sequelize);

    this.appointments = appointments;
    this.patients = patients;
  }

  async sync_database() {
    this.patients.sync({force: false})
    this.appointments.sync({force: false})
  }

  create_connection() {
    return new Sequelize(process.env.DATABASE_DATABASE, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
      host: process.env.DATABASE_HOSTNAME,
      port: process.env.DATABASE_PORT,
      dialect: "mysql",

      logging: console.log,
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

  // model getters
  get_patient_model() {
    return this.patients;
  }

  get_appointment_model() {
    return this.appointments;
  }

  // ================
  // CRUD functions
  // ================

  async create_patient(patient_object) {
    return this.patients.create(patient_object);
  }

  async create_appointment(appointment_object) {

  }

  async update_patient(patient_id, patient_object) {

  }


  // appointment object will have the following properties:
  // id, status, time, duration, clinician, department, postcode, patient
  async update_appointment(appointment_id, appointment_object) {

  }

  // nhs number input
  async delete_patient_by_id(patient_id) {

  }

  // uuid4
  async delete_appointment_by_id(appointment_id) {

  }

  async get_all_patients() {

  }

  async get_all_appointments() {

  }

  async get_patient_by_id(id) {

  }

  async get_appointment_by_id(id) {

  }

  async get_patient_by_nhs_number(nhs_number) {

  }

  async get_appointment_by_appointment_id(appointment_id) {

  }

  async get_appointment_by_patient_id(patient_id) {

  }

}

module.exports = DatabaseHandler;