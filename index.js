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
  const LoginRoute = require("./routes/auth/LoginRoute")
  const PatientsRoute = require("./routes/PatientsRoute");
  const AppointmentsRoute = require("./routes/AppointmentsRoute");
  const bcrypt = require("bcrypt");

  let isAuthorized = function (req, res, next) {
    if (![null, undefined].includes(req.headers.cookie)) {
      db.get_authuser_model().findOne({where: {authorised_jwt_token: req.headers.cookie}}).then(user => {
        if (user !== null) {
          return next();
        }
      })
    } else {
      res.json({message: "Unauthorized"});
    }
  }

  app.use("/patients", isAuthorized, new PatientsRoute(db).get_router())
  app.use("/appointments", isAuthorized, new AppointmentsRoute(db).get_router())

  // does not use the AuthMiddleware.isAuthorized middleware
  // as it would stop the client form authorising to get a token
  app.use("/auth/login", new LoginRoute(db).get_router())

  // stuff I shouldn't do in the main class
  const exists = JSON.parse(JSON.stringify(await db.sequelize.query("SELECT COUNT(*) FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'auth_user'")))[0][0];
  console.log("select tablename if exists?: " + JSON.stringify(exists["COUNT(*)"]));
  if (await db.sequelize.query("SELECT COUNT(*) FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'auth_user'")[0] === 0) {
    await db.get_authuser_model().findOne({where: {username: "admin"}}).then(user => {
      if (user !== null) {
        console.log("admin user found skipping creation of default admin user")
      } else {
        console.log("creating admin user")
        console.log("==============================================================")
        const adminpassword = crypto.randomBytes(25).toString("hex")
        console.log("username: " + "admin")
        console.log("password: " + adminpassword)
        console.log("send a post request to /auth/login with username: admin and password: " + adminpassword)
        console.log(`{"username": "admin", "password": "${adminpassword}"}`)
        console.log(`example command: curl -X POST http://${process.env.HTTP_LISTEN}:${process.env.HTTP_PORT}}/auth/login -H 'Content-Type: application/json' -d '{"username": "admin", "password": "${adminpassword}"}'`)
        console.log("==============================================================")
        db.get_authuser_model().create({
          username: "admin",
          password: bcrypt.hashSync(adminpassword, 10),
          authorised_jwt_token: null
        })
      }
    })
  }

// not to be used in production
//app.use("/auth/register", require("./routes/auth/SignupRoute"))


  app.listen(process.env.HTTP_Port, process.env.HTTP_LISTEN, () => {
    console.log(`Server listening on port ${process.env.HTTP_Port}`)
  })
}

main();
