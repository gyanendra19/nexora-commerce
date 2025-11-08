import express from "express";
import { addProduct, getAllProduct } from "../controllers/productController.js";

const route = express.Router();

route.route("/").get(getAllProduct);
route.route("/add").post(addProduct);

export default route;
