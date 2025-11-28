const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Disciplina = sequelize.define("Disciplina", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
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

module.exports = Disciplina;
