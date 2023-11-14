module.exports = {
    HOST: "db-mysql-blr1-53805-do-user-14655086-0.b.db.ondigitalocean.com",
    USER: "doadmin",
    PASSWORD: "AVNS_IyS3LDFUOD7aRe8XpEG",
    DB: "bharatpay",
    PORT:"25060",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };