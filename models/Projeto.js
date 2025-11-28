const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Projeto = sequelize.define("Projeto", {
  titulo: DataTypes.STRING,
  descricao: DataTypes.TEXT,
  link: DataTypes.STRING,
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
  tableName: "projetos",
});

module.exports = Projeto;
