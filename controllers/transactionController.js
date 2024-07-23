import Transaction from "../models/Transaction.js";
import Product from "../models/product.js";
import Customer from "../models/customer.js";

export const createTransaction = async (req, res) => {
  const { id_produk, id_pelanggan, jenis_transaksi, history_transaksi } =
    req.body;

  try {
    const transaction = await Transaction.create({
      id_produk,
      id_pelanggan,
      jenis_transaksi,
      history_transaksi,
      id_staf: req.user.id_staf,
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
