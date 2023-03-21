const dotenv = require('dotenv');
const express = require('express')

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

  app.use("/patients", new PatientsRoute(db).get_router())
  app.use("/appointments", new AppointmentsRoute(db).get_router())

  console.log("count: " + await db.patients.count())
  if (await db.patients.count() < 1) {
    await db.gen_example_data();
  }

  app.listen(process.env.HTTP_Port, process.env.HTTP_LISTEN, () => {
    console.log(`Server listening on port ${process.env.HTTP_Port}`)
  })
}

// no need to use the promise returned from main
main();
