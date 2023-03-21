const Sequelize = require('sequelize');
const {DataTypes} = Sequelize;

module.exports = function(sequelize) {
  return sequelize.define('patients', {
    nhs_number: {
      type: DataTypes.STRING(99),
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING(99),
      allowNull: false
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    postcode: {
      type: DataTypes.STRING(16),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'patients',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nhs_number" },
        ]
      },
    ]
  });
};
