import { Router } from "express";
import { create, list, findOne, insertProduct, updateCart,updateProduct, removeCart, removeProduct } from "../controllers/carts.controller.js";

const cartRouter = Router();

cartRouter.post("/", create);
cartRouter.get("/", list); // FIXME:Solo para pruebas internas y pruebas del tutor
cartRouter.get("/:cid", findOne);
cartRouter.post("/:cid/product/:pid", insertProduct);
cartRouter.put("/:cid", updateCart);
cartRouter.put("/:cid/product/:pid", updateProduct);
cartRouter.delete("/:cid", removeCart);
cartRouter.delete("/:cid/product/:pid", removeProduct);

export default cartRouter