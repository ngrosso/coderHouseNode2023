import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import { list, getOne, create, update, remove } from "../controllers/products.controller.js";

const productsRouter = Router();

productsRouter.get("/",auth, list);
productsRouter.get("/:id",auth, getOne);
productsRouter.post("/",auth, create);
productsRouter.put("/:id",auth, update);
productsRouter.delete("/:id",auth, remove);

export default productsRouter;