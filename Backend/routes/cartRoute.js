import express from "express";
import {
  addToCart,
  deleteAllCart,
  deleteCart,
  getCart,
} from "../controllers/cartController.js";

const route = express.Router();

route.route("/addToCart").post(addToCart);
route.route("/getCart").get(getCart);
route.route("/deleteCart").delete(deleteAllCart);
route.route("/:cartId").delete(deleteCart);

export default route;
