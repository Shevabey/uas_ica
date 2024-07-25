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

// Get all transactions
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: [Product, Customer],
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get transaction by ID
export const getTransactionById = async (req, res) => {
  const { id_transaksi } = req.params;
  try {
    const transaction = await Transaction.findByPk(id_transaksi, {
      include: [Product, Customer],
    });
    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a transaction
export const updateTransaction = async (req, res) => {
  const { id_transaksi } = req.params;
  const {
    id_produk,
    id_pelanggan,
    jenis_transaksi,
    history_transaksi,
    jumlah_beli,
  } = req.body;

  try {
    const transaction = await Transaction.findByPk(id_transaksi);
    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });

    // Find the product
    const product = await Product.findByPk(id_produk);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Check if there's enough stock
    if (product.stok + transaction.jumlah_beli < jumlah_beli) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    // Update product stock
    product.stok += transaction.jumlah_beli; // Revert previous stock reduction
    product.stok -= jumlah_beli; // Apply new stock reduction
    await product.save();

    // Update the transaction
    transaction.id_produk = id_produk;
    transaction.id_pelanggan = id_pelanggan;
    transaction.jenis_transaksi = jenis_transaksi;
    transaction.history_transaksi = history_transaksi;
    transaction.jumlah_beli = jumlah_beli;
    transaction.id_staf = req.user.id_staf;

    await transaction.save();

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a transaction
export const deleteTransaction = async (req, res) => {
  const { id_transaksi } = req.params;

  try {
    const transaction = await Transaction.findByPk(id_transaksi);
    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });

    // Find the product
    const product = await Product.findByPk(transaction.id_produk);
    if (product) {
      // Revert the stock
      product.stok += transaction.jumlah_beli;
      await product.save();
    }

    await transaction.destroy();
    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
