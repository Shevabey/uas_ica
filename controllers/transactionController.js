import Transaction from "../models/transaction.js";
import Product from "../models/product.js";
import Customer from "../models/customer.js";

// Create a new transaction
export const createTransaction = async (req, res) => {
  const {
    id_produk,
    id_pelanggan,
    jenis_transaksi,
    history_transaksi,
    jumlah_beli,
  } = req.body;

  try {
    // Find the product
    const product = await Product.findByPk(id_produk);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Check if there's enough stock
    if (product.stok < jumlah_beli) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    // Create the transaction
    const transaction = await Transaction.create({
      id_produk,
      id_pelanggan,
      jenis_transaksi,
      history_transaksi,
      jumlah_beli,
      id_staf: req.user.id_staf,
    });

    // Update product stock
    product.stok -= jumlah_beli;
    await product.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
