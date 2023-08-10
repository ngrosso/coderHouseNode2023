import { Router } from 'express';
import auth from '../middlewares/auth.middleware.js';
import { changePassword, login, logout, signup, current, forgotPassword, changeForgotPassword, forgotPasswordView } from '../../presentation/controllers/session.controller.js';

const sessionRouter = Router();

sessionRouter.post('/login', login);
sessionRouter.post('/logout',auth, logout);
sessionRouter.get('/current', auth, current);
sessionRouter.post('/signup', signup);
sessionRouter.post('/change-password', auth, changePassword);
sessionRouter.post('/forgot-password', forgotPassword); 
sessionRouter.get('/reset-password', forgotPasswordView);
sessionRouter.post('/reset-password', changeForgotPassword);


export default sessionRouter;