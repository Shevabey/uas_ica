import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./User.js";
import Product from "./Product.js";
import Customer from "./Customer.js";

const { DataTypes } = Sequelize;

const Transaction = db.define(
  "Transaction",
  {
    id_transaksi: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    history_transaksi: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    jenis_transaksi: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: [["lunas", "cicilan"]],
      },
    },
    id_staf: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id_staf",
      },
    },
    id_produk: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id_produk",
      },
    },
    id_pelanggan: {
      type: DataTypes.INTEGER,
      references: {
        model: Customer,
        key: "id_pelanggan",
      },
    },
  },
  {
    freezeTableName: true,
  }
);

User.hasMany(Transaction, { foreignKey: "id_staf" });
Transaction.belongsTo(User, { foreignKey: "id_staf" });

Product.hasMany(Transaction, { foreignKey: "id_produk" });
Transaction.belongsTo(Product, { foreignKey: "id_produk" });

Customer.hasMany(Transaction, { foreignKey: "id_pelanggan" });
Transaction.belongsTo(Customer, { foreignKey: "id_pelanggan" });

export default Transaction;
