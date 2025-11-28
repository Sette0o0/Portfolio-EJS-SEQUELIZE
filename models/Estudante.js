const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Estudante = sequelize.define("Estudante", {
  nome: DataTypes.STRING,
  curso: DataTypes.STRING,
  instituicao: DataTypes.STRING,
  anoIngresso: DataTypes.INTEGER,
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

module.exports = Estudante;
