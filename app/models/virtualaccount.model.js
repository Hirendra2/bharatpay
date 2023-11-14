module.exports = (sequelize, Sequelize) => {
  const VirtualAccount = sequelize.define("virtualaccount", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    virtual_account_id: {
      type: Sequelize.STRING
    },
    virtual_account_number: {
      type: Sequelize.STRING
    },
    virtual_ifsc: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    email_id: {
      type: Sequelize.STRING
    },
    mobile_number: {
      type: Sequelize.STRING
    },
    account_number: {
      type: Sequelize.STRING
    },
    account_ifsc: {
      type: Sequelize.STRING
    },
    created_at: {
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

  return VirtualAccount;
};