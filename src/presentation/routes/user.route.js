import { Router } from 'express';
import auth from '../middlewares/auth.middleware.js';
import admin from '../middlewares/admin.middleware.js';
import { list, deleteOne, getOne, save, update } from '../../presentation/controllers/user.controller.js';

const usersRouter = Router();

usersRouter.get('/', auth, admin, list);
usersRouter.get('/:id', auth, admin, getOne);
usersRouter.post('/', auth, admin, save);
usersRouter.put('/:id', auth, admin, update);
usersRouter.delete('/:id', auth, admin, deleteOne);

export default usersRouter;
