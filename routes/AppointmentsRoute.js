const SharedFunctions = require("../utils/SharedFunctions");
const express = require("express");
const Appointment = require("../objects/Appointment");
const router = express.Router();

class AppointmentsRoute {
  constructor(DatabaseHandler) {
    this.DatabaseHandler = DatabaseHandler;
    this.router = router;
    this.SharedFunctions = SharedFunctions;

    this.router.get('/all', (req, res) => {
      this.DatabaseHandler.get_all_appointments()
        .then((appointments) => {
          res.status(200).json(appointments);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })

    this.router.get('/:id', (req, res) => {
      this.DatabaseHandler.get_appointment_by_id(String(req.params.id))
        .then((appointment) => {
          const appointment_obj = new Appointment(
            appointment.id,
            appointment.patient,
            appointment.status,
            appointment.time,
            appointment.duration,
            appointment.clinician,
            appointment.department,
            appointment.postcode,
          );
          res.status(200).json(appointment_obj.to_json());
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })

    this.router.get('/:id/api_tests', (req, res) => {
      this.DatabaseHandler.get_appointment_by_id(String(req.params.id))
        .then((appointment) => {
          const appointment_obj = new Appointment(
            appointment.id,
            appointment.patient,
            appointment.status,
            appointment.time,
            appointment.duration,
            appointment.clinician,
            appointment.department,
            appointment.postcode,
          );
          res.status(200).json(appointment_obj.tests());
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })

    // usage:
    // POST: { "clinician": "Ainsley Harriot" }
    // or any field in this list: ["clinician", "department", "status", "time", "patient", "postcode"]
    this.router.post('/:id/update', (req, res) => {
      this.DatabaseHandler.get_appointment_by_id(String(req.params.id))
        .then(async (old_appointment) => {
          await this.DatabaseHandler.update_appointment(old_appointment.id, req.body);
          res.status(200).json({message: "Appointment updated"});
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })

    // usage:
    // POST: empty body
    this.router.post('/:id/delete', (req, res) => {
      this.DatabaseHandler.get_appointment_by_id(String(req.params.id))
        .then(async (appointment) => {
          await this.DatabaseHandler.delete_appointment_by_id(appointment.id)
          res.status(200).json({
            "message": "appointment deleted",
            "appointment": appointment
          });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })

    // usage:
    // POST: {"patient": "1234567891", "status": "pending", "time": "2022-01-01T00:00:00.000Z", "duration": "1h", "clinician": "bob bobington", "department": "psychology", "postcode": "LS13 1AA"}
    this.router.post('/new', (req, res) => {
      if (req.body.patient == null || req.body.status == null || req.body.time == null || req.body.duration == null || req.body.clinician == null || req.body.department == null || req.body.postcode == null) {
        res.status(400).json({
          "error": "Bad Request",
          "message": "All fields are required",
          "status": 400,
          "fields": {
            "patient": "nhs_number",
            "status": "status",
            "time": "datetime",
            "duration": "string",
            "clinician": "clinician name",
            "department": "department",
            "postcode": "valid uk postcode",
          }
        });
      }


      this.DatabaseHandler.create_appointment(req.body)
        .then((appointment) => {
          res.status(200).json(appointment);
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

module.exports = AppointmentsRoute;