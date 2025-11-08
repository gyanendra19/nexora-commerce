import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, name, price, quantity } = req.body;

    if (!productId || !quantity || !name) {
      return res
        .status(400)
        .json({ message: "Product Id and quantity is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cartItem = await Cart.create({
      productId,
      name,
      price,
      quantity,
    });

    if (cartItem) {
      return res.status(201).json({ status: "success", cartItem });
    } else {
      return res
        .status(400)
        .json({ message: "Failed to add item to the cart" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const cart = await Cart.find({ cartId });
    if (!cart) {
      return res.status(404).json({ message: "No cart Item Found" });
    }

    return res.status(200).json({
      status: "success",
      cart,
      total: cart.reduce(
        (sum, i) => sum + Number(i.price) * Number(i.quantity),
        0
      ),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    await Cart.deleteOne({ _id: cartId });

    return res
      .status(200)
      .json({ status: "success", message: "Cart Item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAllCart = async (req, res) => {
  try {
    await Cart.deleteMany({});

    return res
      .status(200)
      .json({ status: "success", message: "All Cart Items deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
