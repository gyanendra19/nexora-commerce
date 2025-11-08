import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
});

const Cart = mongoose.model("cart", cartSchema);

export default Cart;
