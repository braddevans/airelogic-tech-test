const Router = require('express').Router;
const router = new Router();
const SharedFunctions = require("../utils/SharedFunctions");
const Patient = require("../objects/Patient");
const {STRING} = require("sequelize");

class patientsRoute {
  constructor(DatabaseHandler) {
    this.DatabaseHandler = DatabaseHandler;
    this.router = router;
    this.SharedFunctions = SharedFunctions;

    this.router.get('/all', (req, res) => {
      this.DatabaseHandler.get_all_patients()
        .then((patients) => {
          res.status(200).json(patients);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })

    this.router.get('/:id', (req, res) => {
      this.DatabaseHandler.get_patient_by_nhs_number(String(req.params.id))
        .then((patients) => {
          res.status(200).json(patients);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })

    this.router.get('/:id/api_tests', (req, res) => {
      this.DatabaseHandler.get_patient_by_nhs_number(String(req.params.id))
        .then((patient) => {
          const patient_obj = new Patient(
            patient.nhs_number,
            patient.name,
            patient.date_of_birth,
            patient.postcode,
          );

          res.status(200).json(patient_obj.tests());
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })

    this.router.post('/:id/update', (req, res) => {
      this.DatabaseHandler.get_patient_by_nhs_number(String(req.params.id))
        .then(async (patient) => {
          await this.DatabaseHandler.update_patient(patient.id, req.body)
          res.status(200).json(patient);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })

    this.router.post('/:id/delete', (req, res) => {
      this.DatabaseHandler.get_patient_by_nhs_number(String(req.params.id))
        .then(async (patient) => {
          await this.DatabaseHandler.delete_patient_by_nhs_number(patient.id)
          res.status(200).json(patient);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })
  }

  get_router() {
    return this.router;
  }
}

module.exports = patientsRoute;