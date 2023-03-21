const _appointments = require("./models/appointments");
const _patients = require("./models/patients");

function initModels(sequelize) {
  const appointments = _appointments(sequelize);
  const patients = _patients(sequelize);

  appointments.belongsTo(patients, { as: "patient_patient", foreignKey: "patient"});
  patients.hasMany(appointments, { as: "appointments", foreignKey: "patient"});

  return {
    appointments,
    patients,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
