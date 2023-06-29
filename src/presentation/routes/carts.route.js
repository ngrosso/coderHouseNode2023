import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import { create, list, findOne, insertProduct, updateCart,updateProduct, removeCart, removeProduct, purchaseCart } from "../../presentation/controllers/carts.controller.js";

const cartRouter = Router();

cartRouter.post("/",auth, create);
cartRouter.get("/", auth, list); // FIXME:Solo para pruebas internas y pruebas del tutor
cartRouter.get("/:cid",auth, findOne);
cartRouter.post("/:cid/product/:pid", auth, insertProduct);
cartRouter.put("/:cid",auth, updateCart);
cartRouter.put("/:cid/product/:pid", auth, updateProduct);
cartRouter.delete("/:cid", auth, removeCart);
cartRouter.delete("/:cid/product/:pid", auth, removeProduct);

cartRouter.post("/:cid/purchase",auth,purchaseCart)

export default cartRouter