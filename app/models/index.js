const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port:dbConfig.PORT,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.virtualaccount = require("./virtualaccount.model.js")(sequelize, Sequelize);
db.payoutaccount = require("./payoutaccount.model.js")(sequelize, Sequelize);
db.payouttrxn = require("./payouttrxn.model.js")(sequelize, Sequelize);
db.registration = require("./registration.model.js")(sequelize, Sequelize);
db.payintrxn = require("./payintrxn.model.js")(sequelize, Sequelize);

module.exports = db;