import { Router } from "express";
import { ProductController } from "../controllers/products.controller.js";

const routerProducts = Router();
const productController = new ProductController();

routerProducts.get("/", productController.getProducts);
routerProducts.get("/:pid", productController.getProductById);
routerProducts.post("/", productController.addProduct);
routerProducts.put("/:pid", productController.updateProduct);
routerProducts.delete("/:pid", productController.deleteProduct);

export default routerProducts