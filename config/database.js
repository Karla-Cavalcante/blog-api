import { Sequelize } from "sequelize";

const sequelize = new Sequelize("blogdb", "postgres", "pato1937", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

export default sequelize;
