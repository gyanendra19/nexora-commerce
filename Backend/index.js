import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import userRoute from "./routes/userRoute.js";
import User from "./models/userModel.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to Database");
});

app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/user", userRoute);
app.post("/api/checkout", async (req, res) => {
  try {
    const userData = await User.find();
    const user = userData[0];
    const { cartItems } = req.body;
    const total = cartItems.reduce(
      (sum, i) => sum + Number(i.price) * Number(i.quantity),
      0
    );

    res.json({
      receiptId: "RCPT" + Math.floor(Math.random() * 10000),
      user,
      total,
      cartItems,
      timestamp: new Date(),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});
