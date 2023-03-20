const Router = require('express').Router;
const router = new Router();
const SharedFunctions = require("../utils/SharedFunctions");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class patientsRoute {
  constructor(DatabaseHandler) {
    this.DatabaseHandler = DatabaseHandler;
    this.router = router;
    this.SharedFunctions = SharedFunctions;

    this.router.get('/', (req, res) => {

    })
  }

  get_router() {
    return this.router;
  }
}

module.exports = patientsRoute;