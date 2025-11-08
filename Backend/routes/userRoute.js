import express from "express";
import User from "../models/userModel.js";

const route = express.Router();

route.route("/").post(async (req, res) => {
  try {
    const { email, password } = req.body;

    const newUser = await User.create({
      email,
      password,
    });

    if (newUser) {
      return res.status(201).json({ status: "success", newUser });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default route;
