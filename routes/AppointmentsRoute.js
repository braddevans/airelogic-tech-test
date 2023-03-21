const SharedFunctions = require("../utils/SharedFunctions");
const express = require("express");
const router = express.Router();

class AppointmentsRoute {
  constructor(DatabaseHandler) {
    this.DatabaseHandler = DatabaseHandler;
    this.router = router;
    this.SharedFunctions = SharedFunctions;

    this.router.get('/', (req, res) => {
      return res.status(200).json({
        message: 'to be implemented'
      })
    })
  }

  get_router() {
    return this.router;
  }
}

module.exports = AppointmentsRoute;