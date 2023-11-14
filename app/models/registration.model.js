module.exports = (sequelize, Sequelize) => {
    const Registration = sequelize.define("registration", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      contact: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    },
      {
        // Optional: You can define additional options for the model here
        timestamps: true, // This will add createdAt and updatedAt fields
      });
    return Registration;
  };