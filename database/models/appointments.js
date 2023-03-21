const Sequelize = require('sequelize');
const {DataTypes} = Sequelize;

module.exports = function(sequelize) {
  return sequelize.define('appointments', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    duration: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    clinician: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    department: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    postcode: {
      type: DataTypes.STRING(9),
      allowNull: false
    },
    patient: {
      type: DataTypes.STRING(99),
      allowNull: false,
      references: {
        model: 'patients',
        key: 'nhs_number'
      }
    }
  }, {
    sequelize,
    tableName: 'appointments',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "patient",
        using: "BTREE",
        fields: [
          { name: "patient" },
        ]
      },
    ]
  });
};
