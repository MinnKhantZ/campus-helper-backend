import { config } from "dotenv";
import { Sequelize } from "sequelize";

config();

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT;

export const db_host = process.env.DB_HOST;
export const db_user = process.env.DB_USER;
export const db_password = process.env.DB_PASSWORD;
export const db_database = process.env.DB_DATABASE;
export const db_port = process.env.DB_PORT;

export const db_development_host = process.env.DB_DEV_HOST;
export const db_development_user = process.env.DB_DEV_USER;
export const db_development_password = process.env.DB_DEV_PASSWORD;
export const db_development_database = process.env.DB_DEV_DATABASE;
export const db_development_port = process.env.DB_DEV_PORT;

const dbConfig = {
  development: {
    host: db_development_host,
    username: db_development_user,
    password: db_development_password,
    database: db_development_database,
    port: db_development_port,
  },
  production: {
    host: db_host,
    username: db_user,
    password: db_password,
    database: db_database,
    port: db_port,
  },
};

const DB =
  NODE_ENV === "production" ? dbConfig.production : dbConfig.development;

const sequelize = new Sequelize({
  dialect: "postgres",
  host: DB.host,
  username: DB.username,
  password: DB.password,
  database: DB.database,
  port: DB.port,
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default sequelize;
