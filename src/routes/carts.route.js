import { Router } from "express";
import { list, getOne, create, insertProduct, removeProduct, removeCart } from "../controllers/carts.controller.js";

const cartRouter = Router();

cartRouter.post("/", create);
cartRouter.get("/:cid", getOne);
cartRouter.get("/", list); // FIXME:Solo para pruebas internas y pruebas del tutor
cartRouter.post("/:cid/product/:pid", insertProduct);
cartRouter.delete("/:cid/product/:pid", removeProduct);
cartRouter.delete("/:cid", removeCart);

export default cartRouter