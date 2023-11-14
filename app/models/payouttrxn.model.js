module.exports = (sequelize, Sequelize) => {
    const PayoutTransaction = sequelize.define("payouttrxns", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        order_id: {
            type: Sequelize.STRING
        },
        bank_account_id: {
            type: Sequelize.STRING
        },
        txn_type: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        purpose: {
            type: Sequelize.STRING
        },
        bank_remark: {
            type: Sequelize.STRING
        },
        ref_id: {
            type: Sequelize.STRING
        },
        userid: {
            type: Sequelize.INTEGER
        },
        bank: {
            type: Sequelize.STRING
        },
        created_at: {
            type: Sequelize.STRING
        }
        
    },
        {
            // Optional: You can define additional options for the model here
            timestamps: true, // This will add createdAt and updatedAt fields
        });

    return PayoutTransaction;
};