import { Router } from "express";
import { list, getOne, create, update, remove } from "../controllers/products.controller.js";

const productsRouter = Router();

productsRouter.get("/", list);
productsRouter.get("/:id", getOne);
productsRouter.post("/", create);
productsRouter.put("/:id", update);
productsRouter.delete("/:id", remove);

export default productsRouter;