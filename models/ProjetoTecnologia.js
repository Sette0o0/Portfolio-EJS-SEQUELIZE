const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ProjetoTecnologia = sequelize.define("ProjetoTecnologia", {
  projeto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tecnologia_id: {
    type: DataTypes.INTEGER,
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
  tableName: "projeto_tecnologia",
  timestamps: true,
});

module.exports = ProjetoTecnologia;
