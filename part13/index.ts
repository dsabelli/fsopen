require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.Postgres_URI);

const main = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    sequelize.close();
  } catch (err) {
    console.error("Unable to connect to the database", err);
  }
};
main();
