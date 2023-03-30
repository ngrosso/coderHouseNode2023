import { Router } from "express";
import { CartController } from "../controllers/carts.controller.js";

const cartRouter = Router();
const cartController = new CartController();

cartRouter.post("/", cartController.addCart);
cartRouter.get("/:cid", cartController.getCartById);
cartRouter.get("/", cartController.getCarts); // FIXME:Solo para pruebas internas y pruebas del tutor
cartRouter.post("/:cid/product/:pid", cartController.addProductToCart);

export default cartRouter