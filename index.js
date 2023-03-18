const dotenv = require('dotenv');
const express = require('express')

dotenv.config();

const AuthUser = require('./database/schema/AuthUser');
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

// setup routes
app.use("/patients", require("./routes/PatientsRoute"))
app.use("/auth/login", require("./routes/auth/LoginRoute"))

// not to be used in production
app.use("/auth/register", require("./routes/auth/SignupRoute"))

if (AuthUser.findOne({username: "default_admin"}).countDocuments() > 0) {
  console.log("default admin exists skipping creation")
  console.log("can be disabled by setting [is_active] to false on the auth_users collection")
} else {
  AuthUser.create({
    username: "default_admin",
    password: "supersecureadminpassword6125379352173518273!)",
    is_active: true
  }).then(() => console.log("default admin created"))
}


app.listen(process.env.HTTP_Port, process.env.HTTP_LISTEN, () => {
  console.log(`Server listening on port ${process.env.HTTP_Port}`)
})