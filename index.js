const dotenv = require('dotenv');
const express = require('express')
const crypto = require("crypto");


dotenv.config();
main = async () => {
  // SharedFunctions currently unused in this class
  const SharedFunctions = require("./utils/SharedFunctions");
  const DatabaseHandler = require("./database/DatabaseHandler");

  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  app.use(express.static('public'))

  // Database handler
  const db = await new DatabaseHandler();
  await db.sync_database();

  // setup routes
  const PatientsRoute = require("./routes/PatientsRoute");
  const AppointmentsRoute = require("./routes/AppointmentsRoute");

  app.use("/patients", isAuthorized, new PatientsRoute(db).get_router())
  app.use("/appointments", isAuthorized, new AppointmentsRoute(db).get_router())

  // does not use the AuthMiddleware.isAuthorized middleware
  // as it would stop the client form authorising to get a token
  app.use("/auth/login", new LoginRoute(db).get_router())

// not to be used in production
//app.use("/auth/register", require("./routes/auth/SignupRoute"))


  app.listen(process.env.HTTP_Port, process.env.HTTP_LISTEN, () => {
    console.log(`Server listening on port ${process.env.HTTP_Port}`)
  })
}

main();
