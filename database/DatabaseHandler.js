const dotenv = require('dotenv');
const {Sequelize, Op, Model, DataTypes} = require('sequelize');
const {initModels} = require("./init-models");
const {nhs_number_validator, valid_postcode} = require('../utils/SharedFunctions.js');
const Patient = require('../objects/Patient.js');
const patients = require("../examples/example_patients.json");
const Appointment = require("../objects/Appointment");
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

  async gen_example_data() {
    const patients = require('../examples/example_patients.json');
    const appointments = require('../examples/example_appointments.json');
    for (let i = 0; i < patients.length; i++) {
      console.log("Adding patient: " + patients[i].nhs_number, ", name:", patients[i].name);
      const patient = new Patient(
        patients[i].nhs_number,
        patients[i].name,
        patients[i].date_of_birth,
        patients[i].postcode,
      );
      await this.create_patient(patient)
    }

    for (let i = 0; i < appointments.length; i++) {
      console.log("Adding appointment: " + patients[i].nhs_number, ", name:", patients[i].name);
      const appointment = new Appointment(
        appointments[i].id,
        appointments[i].patient,
        appointments[i].status,
        appointments[i].time,
        appointments[i].duration,
        appointments[i].clinician,
        appointments[i].department,
        appointments[i].postcode,
      );
      await this.create_appointment(appointment)
    }
  }

  create_connection() {
    return new Sequelize(process.env.DATABASE_DATABASE, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
      host: process.env.DATABASE_HOSTNAME,
      port: process.env.DATABASE_PORT,
      dialect: "mysql", /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */

      logging: console.log,
    });
  }

  async check_connection() {
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
    patient_object.name = patient_object.name.replaceAll([",", "\"", "'"], "");
    return this.patients.create(patient_object);
  }

  async create_appointment(appointment_object) {
    return this.appointments.create(appointment_object);
  }

  // on false one of the updated fields is incorrect
  async update_patient(patient_id, req_body) {
    const patient = await this.patients.findByPk(patient_id);

    for (let key in req_body) {
      if (key === "name") {
        patient.name = req_body.name;
      } else if (key === "date_of_birth") {
        patient.date_of_birth = req_body.date_of_birth;
      } else if (key === "postcode") {
        if (valid_postcode(req_body.postcode)) {
          patient.postcode = req_body.postcode;
          patient.save();
        } else {
          return false
        }
      }
    }
    return true;
  }


  // appointment object will have the following properties:
  // id, status, time, duration, clinician, department, postcode, patient
  async update_appointment(appointment_id, appointment_object) {
    const appointment = await this.appointments.findByPk(appointment_id);
    for (let key in appointment_object) {
      if (key === "status" && ![undefined, null].includes(appointment_object.status)) {
        appointment.status = appointment_object.status;
      } else if (key === "time" && ![undefined, null].includes(appointment_object.time)) {
        appointment.time = appointment_object.time;
      } else if (key === "duration" && ![undefined, null].includes(appointment_object.duration)) {
        appointment.duration = appointment_object.duration;
      } else if (key === "clinician" && ![undefined, null].includes(appointment_object.clinician)) {
        appointment.clinician = appointment_object.clinician;
      } else if (key === "department" && ![undefined, null].includes(appointment_object.department)) {
        appointment.department = appointment_object.department;
      } else if (key === "postcode" && ![undefined, null].includes(appointment_object.postcode)) {
        if (valid_postcode(appointment_object.postcode)) {
          appointment.postcode = appointment_object.postcode;
          appointment.save();
        } else {
          return false
        }
      }
      appointment.save();
    }
  }

  // nhs number input
  async delete_patient_by_nhs_number(patient_id) {
    const patient = await this.patients.findByPk(patient_id);
    this.patients.destroy({where: {nhs_number: patient.nhs_number}});
  }

  // uuid4
  async delete_appointment_by_id(appointment_id) {
    const appointment = await this.appointments.findByPk(appointment_id);
    this.appointments.destroy({where: {id: appointment.id}});
  }

  async get_all_patients() {
    return this.patients.findAll({
      raw: true,
      nest: true
    });
  }

  async get_all_appointments() {
    return this.appointments.findAll({
      raw: true,
      nest: true
    });
  }

  async get_patient_by_nhs_number(nhs_number) {
    return this.patients.findOne({where: {nhs_number: nhs_number}});
  }

  // uuid4 input
  async get_appointment_by_id(id) {
    return this.appointments.findByPk(id);
  }

  async get_appointment_by_appointment_id(appointment_id) {
    return this.appointments.findOne({where: {id: appointment_id}});
  }

  async get_appointment_by_patient_id(patient_id) {
    return this.appointments.findOne({where: {patient: patient_id}});
  }

}

module.exports = DatabaseHandler;