// KONFIGURASI DATABASE DENGAN MYSQL

import { Sequelize } from "sequelize";

import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    dialectOptions: {
      connectTimeout: 60000, // Timeout 60 detik
    },
  }
);

export default db;
