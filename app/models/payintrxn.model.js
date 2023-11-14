module.exports = (sequelize, Sequelize) => {
    const PayInTransaction = sequelize.define("payintrxns", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        type: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.STRING
        },
        bank_ref_id: {
            type: Sequelize.STRING
        },
        payment_mode: {
            type: Sequelize.STRING
        },
        virtual_accounts_id: {
            type: Sequelize.INTEGER
        },
        created_at: {
            type: Sequelize.STRING
        }
        
    },
        {
            // Optional: You can define additional options for the model here
            timestamps: true, // This will add createdAt and updatedAt fields
        });

    return PayInTransaction;
};