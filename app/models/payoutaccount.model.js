module.exports = (sequelize, Sequelize) => {
  const PayoutAccount = sequelize.define("payoutaccount", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bank_account_id: {
      type: Sequelize.STRING
    },
    bene_account_number: {
      type: Sequelize.STRING
    },
    ifsc_code: {
      type: Sequelize.STRING
    },
    recepient_name: {
      type: Sequelize.STRING
    },
    email_id: {
      type: Sequelize.STRING
    },
    mobile_number: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    remark: {
      type: Sequelize.STRING
    },
    userid: {
      type: Sequelize.INTEGER
    },
    bank: {
      type: Sequelize.STRING
    }
  },
    {
      // Optional: You can define additional options for the model here
      timestamps: true, // This will add createdAt and updatedAt fields
    });




  return PayoutAccount;
};