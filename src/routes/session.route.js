import { Router } from 'express';
import { forgetPassword, login, logout, signup } from "../controllers/session.controller.js";

const sessionRouter = Router();

sessionRouter.post('/login', login);
sessionRouter.post('/logout', logout);
sessionRouter.post('/signup', signup);
sessionRouter.post('/forgot-password', forgetPassword);

export default sessionRouter;
