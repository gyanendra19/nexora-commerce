import Product from "../models/productModel.js";

export const addProduct = async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Products array is required" });
    }

    const addedProducts = await Product.insertMany(products);

    res.status(201).json({
      status: "success",
      count: addedProducts.length,
      products: addedProducts,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products) {
      return res.status(404).json({ message: "No product found" });
    }

    res.status(200).json({
      status: "success",
      count: products.length,
      products,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
