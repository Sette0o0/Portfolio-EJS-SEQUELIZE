const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Contato = sequelize.define("Contato", {
  email: DataTypes.STRING,
  telefone: DataTypes.STRING,
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  timestamps: true,
});

module.exports = Contato;
