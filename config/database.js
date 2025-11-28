const { Sequelize } = require("sequelize");
//                              crie esse banco            altere para a sua senha
const sequelize = new Sequelize("portfolio_sette", "root", "rafa", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  define: {
    timestamps: true,
  }
});

module.exports = sequelize;
