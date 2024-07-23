import Product from "../models/product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
