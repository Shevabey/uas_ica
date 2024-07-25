import Customer from "../models/customer.js";

// Get all customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get customer by ID
export const getCustomerById = async (req, res) => {
  const { id_pelanggan } = req.params;
  try {
    const customer = await Customer.findByPk(id_pelanggan);
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new customer
export const addCustomer = async (req, res) => {
  const { nama_pelanggan, histori_transaksi, kekurangan_pembayaran } = req.body;
  try {
    const newCustomer = await Customer.create({
      nama_pelanggan,
      histori_transaksi,
      kekurangan_pembayaran,
    });
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update customer
export const updateCustomer = async (req, res) => {
  const { id_pelanggan } = req.params;
  const { nama_pelanggan, histori_transaksi, kekurangan_pembayaran } = req.body;
  try {
    const customer = await Customer.findByPk(id_pelanggan);
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });

    customer.nama_pelanggan = nama_pelanggan;
    customer.histori_transaksi = histori_transaksi;
    customer.kekurangan_pembayaran = kekurangan_pembayaran;

    await customer.save();
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete customer
export const deleteCustomer = async (req, res) => {
  const { id_pelanggan } = req.params;
  try {
    const customer = await Customer.findByPk(id_pelanggan);
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });

    await customer.destroy();
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
