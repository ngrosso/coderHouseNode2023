import { Router } from "express";
import ViewsController from "../controllers/views.controller.js";


const viewsRouter = Router();
const viewsController = new ViewsController();

viewsRouter.get("/", viewsController.home);
viewsRouter.get("/realtimeproducts", viewsController.realtimeProducts);

export default viewsRouter
