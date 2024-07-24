import Product from "../models/product.js";
import { Op } from "sequelize";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search for products by name
export const searchProduct = async (req, res) => {
  const { query } = req.query;
  try {
    const products = await Product.findAll({
      where: {
        nama_produk: {
          [Op.like]: `%${query}%`,
        },
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  const { id_produk } = req.params;
  try {
    const product = await Product.findByPk(id_produk);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new product
export const addProduct = async (req, res) => {
  const { nama_produk, stok, harga, lokasi } = req.body;
  try {
    const newProduct = await Product.create({
      nama_produk,
      stok,
      harga,
      lokasi,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  const { id_produk } = req.params;
  const { nama_produk, stok, harga, lokasi } = req.body;
  try {
    const product = await Product.findByPk(id_produk);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.nama_produk = nama_produk;
    product.stok = stok;
    product.harga = harga;
    product.lokasi = lokasi;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  const { id_produk } = req.params;
  try {
    const product = await Product.findByPk(id_produk);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.destroy();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
