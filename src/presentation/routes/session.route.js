import { Router } from 'express';
import auth from "../middlewares/auth.middleware.js";
import { forgetPassword, login, logout, signup } from "../../presentation/controllers/session.controller.js";

const sessionRouter = Router();

sessionRouter.post('/login', login);
sessionRouter.post('/logout',auth, logout);
//TODO: Agregar current?
sessionRouter.post('/signup', signup);
sessionRouter.post('/forgot-password', forgetPassword);

export default sessionRouter;
